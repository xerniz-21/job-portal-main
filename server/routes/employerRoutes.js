const router = require("express").Router();
const employerController = require("../src/controllers/employerController");
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");

router.get(
  "/profile",
  verifyToken,
  authorizeRole("employer"),
  employerController.getProfile,
);
router.put(
  "/profile",
  verifyToken,
  authorizeRole("employer"),
  employerController.updateProfile,
);
router.get(
  "/jobs",
  verifyToken,
  authorizeRole("employer"),
  employerController.getMyJobs,
);

module.exports = router;
