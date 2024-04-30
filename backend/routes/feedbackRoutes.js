// feedbackRoutes.js

const express = require("express");

const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.route("/add").post(feedbackController.addFeedback);
router.route("/reject").post(feedbackController.rejectFeedback);
router.route("/approv").post(feedbackController.approvFeedback);
router.route("/update").post(feedbackController.updateFeedback);
router.route("/delete/:feedbackId").delete(feedbackController.deleteFeedback);
router.route("/get-all").get(feedbackController.getFeedbacks);
router.route("/count").get(feedbackController.getFeedbackCount);
router.route("/pending").get(feedbackController.getPendingFeedbacks);
router.route("/approved").get(feedbackController.getApprovedFeedbacks);
router.route("/rejected").get(feedbackController.getRejectedFeedbacks);



module.exports = router;
