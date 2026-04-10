const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redis = require("../modules/redis");
const { createAccessToken } = require("../../helpers/authHelper");
const { createError } = require("../../helpers/errorHelper");
const Employer = require("../models/Employer");
const Jobseeker = require("../models/Jobseeker");

const register = async (data) => {
  const { fullName, email, password, role } = data;

  if (!fullName || !email || !password || !role) {
    throw createError("All fields are required", 400);
  }

  const existingUser = await User.findOne(
    { email: email.toLowerCase() },
    { _id: 1 },
  );
  if (existingUser) {
    throw createError("User already exists!!", 400);
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password: hashedPass,
    role,
  });

  if (role === "jobseeker") {
    await Jobseeker.create({ userId: user._id });
  } else if (role === "employer") {
    await Employer.create({ userId: user._id });
  }

  return { id: user._id };
};

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne(
    { email: email.toLowerCase(), deletedAt: null },
    { password: 1, role: 1, isProfileComplete: 1 },
  );

  if (!user) throw createError("User not found!!", 404);

  const result = await bcrypt.compare(password, user.password);
  if (!result) throw createError("Incorrect password!!", 401);

  const accessToken = createAccessToken(user.id, user.role);

  return {
    userId: user.id,
    role: user.role,
    isProfileComplete: user.isProfileComplete,
    accessToken,
  };
};

const rotateToken = async (refreshToken) => {
  if (!refreshToken) throw createError("Unauthorised Access!!", 401);

  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        if (err) return reject(createError("Unauthorised", 401));

        const savedToken = await redis.get(payload.userId);
        if (!savedToken) return reject(createError("Session expired!", 401));

        const newAccessToken = createAccessToken(payload.userId, payload.role);
        resolve({ accessToken: newAccessToken });
      },
    );
  });
};

module.exports = {
  register,
  login,
  rotateToken,
};