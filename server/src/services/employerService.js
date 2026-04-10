const Employer = require("../models/Employer");
const User = require("../models/User");
const { createError } = require("../../helpers/errorHelper");

const Job = require("../models/Job");

const getProfile = async (userId) => {
  const profile = await Employer.findOne({ userId, deletedAt: null });
  if (!profile) throw createError("Profile not found!!", 404);

  return profile;
};

const updateProfile = async (userId, data) => {
  const { companyName, phone } = data;

  const updateData = {};
  if (companyName) updateData.companyName = companyName;
  if (phone) updateData.phone = phone;

  const profile = await Employer.findOneAndUpdate(
    { userId, deletedAt: null },
    updateData,
    { returnDocument: "after" },
  );

  if (!profile) throw createError("Profile not found!!", 404);

  await User.findByIdAndUpdate(userId, { isProfileComplete: true });

  return profile;
};

const getMyJobs = async (userId) => {
  const jobs = await Job.find({ employerId: userId, deletedAt: null }).sort({ createdAt: -1 });
  return jobs;
};

module.exports = {
  getProfile,
  updateProfile,
  getMyJobs,
};