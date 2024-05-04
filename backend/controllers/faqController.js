const mongoose = require("mongoose");
const FAQ = require("../models/FAQ");

const FAQController = {
    getFAQs: async (req, res) => {
        try {
            const FAQs = await FAQ.find();
            if (FAQs.length > 0) {
                res.status(200).json({ FAQs });
            } else {
                console.log("No FAQs found");
                res.status(404).json({ error: "No FAQs found" });
            }
        } catch (error) {
            console.error("Error fetching FAQs:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addFAQs: async (req, res) => {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: "Please provide both question and answer" });
        }
        try {
            const newFAQ = new FAQ({ question, answer });
            
            await newFAQ.save();
            res.status(201).json({ message: "FAQ added successfully" });
        } catch (error) {
            console.error("Error adding FAQ:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateFAQs: async (req, res) => {
        const { _id } = req.params;
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: "Please provide both question and answer" });
        }
        try {
            const updatedFAQ = await FAQ.findByIdAndUpdate(_id, { question, answer }, { new: true });
            if (updatedFAQ) {
                res.status(200).json({ message: "FAQ updated successfully" });
            } else {
                console.log("FAQ not found");
                res.status(404).json({ error: "FAQ not found" });
            }
        } catch (error) {
            console.error("Error updating FAQ:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteFAQs: async (req, res) => {
        const { _id } = req.params;
        try {
            const deletedFAQ = await FAQ.findByIdAndDelete(_id);
            if (deletedFAQ) {
                res.status(200).json({ message: "FAQ deleted successfully" });
            } else {
                console.log("FAQ not found");
                res.status(404).json({ error: "FAQ not found" });
            }
        } catch (error) {
            console.error("Error deleting FAQ:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
};

module.exports = FAQController;
