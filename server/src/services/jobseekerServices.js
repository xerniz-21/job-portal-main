const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");
const { createError } = require("../../helpers/errorHelper");

const getProfile = async (userId) => {
  const profile = await Jobseeker.findOne({ userId, deletedAt: null });
  if (!profile) throw createError("Profile not found!!", 404);

  return profile;
};

const updateProfile = async (userId, data) => {
  const { phone, location, skills } = data;

  const updateData = {};
  if (phone) updateData.phone = phone;
  if (location) updateData.location = location;
  if (skills) updateData.skills = skills;

  const profile = await Jobseeker.findOneAndUpdate(
    { userId, deletedAt: null },
    updateData,
    { returnDocument: "after" },
  );

  if (!profile) throw createError("Profile not found!!", 404);

  await User.findByIdAndUpdate(userId, { isProfileComplete: true });

  return profile;
};

const uploadResume = async (userId, file) => {
  if (!file) throw createError("File not uploaded!!", 400);

  const fileType = file.mimetype.startsWith("image") ? "image" : "pdf";

  const profile = await Jobseeker.findOneAndUpdate(
    { userId, deletedAt: null },
    {
      resume: {
        url: file.path,
        fileType,
      },
    },
    { returnDocument: "after" },
  );

  if (!profile) throw createError("Profile not found!!", 404);

  return profile;
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
};