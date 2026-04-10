const employerService = require("../services/employerService");
const responseHelper = require("../../helpers/responseHelper");

const getProfile = async (req, res) => {
  try {
    const data = await employerService.getProfile(req.user.userId);
    return responseHelper.handleSuccess(res, data);
  } catch (error) {
    return responseHelper.handleError(res, error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await employerService.updateProfile(req.user.userId, req.body);
    return responseHelper.handleSuccess(res, data);
  } catch (error) {
    return responseHelper.handleError(res, error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
