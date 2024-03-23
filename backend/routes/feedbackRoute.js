// feedbackRoutes.js

const express = require("express");

const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.route("/add").post(feedbackController.addFeedback);
router.route("/update").post(feedbackController.updateFeedback);
router.route("/delete/:feedbackId").delete(feedbackController.deleteFeedback);
router.route("/get-all").get(feedbackController.getFeedbacks);

module.exports = router; // Export the router
