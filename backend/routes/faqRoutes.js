const express = require('express');
const router = express.Router();

const FAQController = require('../controllers/faqController');

router.route("/get-all").get(FAQController.getFAQs);
router.route("/add").post(FAQController.addFAQs);
router.route("/update/:_id").put(FAQController.updateFAQs);
router.route("/delete/:_id").delete(FAQController.deleteFAQs);

module.exports = router;