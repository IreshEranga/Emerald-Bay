const { get } = require("mongoose");
const Feedback = require("../models/feedback");

const feedbackController = {

getFeedbacks : async(req,res)=>{

    const feedbacks = await Feedback.find();
    
        if(feedbacks){
            res.status(200).json({
                feedbacks
            });
        }else{
            console.log("Error fetching feedbacks");
            res.status(401);
            throw new error("Error fetching feedbacks");
        }
},

updateFeedback : async(req,res)=>{

    const {update} = req.body;
    console.log(update);

    if(!update){
        res.status(400);
       throw new error("Invalid data passes into backend request!!!");
   }
   
   else{

       const updatedFeedback = await Feedback.findByIdAndUpdate(update._id,update,
       {
           new: true,
       });


       if(updatedFeedback){
           res.status(201).json({
            updatedFeedback
           })

       }else{
       res.status(400);
       throw new error("Feedback not updated !!!");
   }
   }
},

addFeedback : async(req,res)=>{


    const{customerService,delivery,email,message,name,overallExperience,prices,taste}=req.body;

  
  if(!customerService || !email || !delivery || !message || !name){
  

      res.status(400);
      throw new error("Please fill all the fields!!!");
  
  }
  
      const feedback = await Feedback.create({
        customerService,delivery,email,message,name,overallExperience,prices,taste
      });
  
      if(feedback){
          res.status(200).json({feedback});
      }
      else{
        console.log("Add feedback error".red.bold);
          res.status(400);
          throw new error("Failed to add feedback!!!");
      }
  
  },

deleteFeedback : async(req,res)=>{

    const {feedbackId} = req.params;

    const feedbacks = await Feedback.findOneAndDelete({_id:feedbackId})
    
        if(feedbacks){
            res.status(200).json({
                feedbacks
            });
        }else{
            console.log("Error deleting feedback");
            res.status(401);
            throw new error("Error deleting feedback");
        }
},

rejectFeedback : async(req,res)=>{

    const {update} = req.body;
    console.log(update);

    if(!update){
        res.status(400);
       throw new error("Invalid data passes into backend request!!!");
   }
   else{

       const updatedFeedback = await Feedback.findByIdAndUpdate(update._id,update,
       {
           new: true,
       });


       if(updatedFeedback){
           res.status(201).json({
            updatedFeedback
           })

       }else{
       res.status(400);
       throw new error("Feedback not updated !!!");
   }
   }
},

approvFeedback : async(req,res)=>{

    const {update} = req.body;
    console.log(update);

    if(!update){
        res.status(400);
       throw new error("Invalid data passes into backend request!!!");
   }
   else{

       const updatedFeedback = await Feedback.findByIdAndUpdate(update._id,update,
       {
           new: true,
       });


       if(updatedFeedback){
           res.status(201).json({
            updatedFeedback
           })

       }else{
       res.status(400);
       throw new error("Feedback not updated !!!");
   }
   }
},

 getFeedbackCount : async(req,res)=>{
    try {
        const count = await Feedback.countDocuments(); 
        res.json({ count });
      } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Error fetching count' });
      }
},

getPendingFeedbacks : async(req,res)=>{
    try {
        const count = await Feedback.countDocuments({status:"PENDING"}); 
        res.json({ count });
      } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Error fetching count' });
      }
},

getApprovedFeedbacks : async(req,res)=>{
    try {
        const count = await Feedback.countDocuments({status:"APPROVED"}); 
        res.json({ count });
      } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Error fetching count' });
      }
},

getRejectedFeedbacks : async(req,res)=>{
    try {
        const count = await Feedback.countDocuments({status:"REJECTED"}); 
        res.json({ count });
      } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Error fetching count' });
      }
    },

    getApprovedFeedbacksList : async(req,res)=>{
        try {
            const feedbacks = await Feedback.find({status:"APPROVED"}); 
            if(feedbacks){
                res.status(200).json({
                    feedbacks
                });
            }else{
                console.log("Error fetching feedbacks");
                res.status(401);
                throw new error("Error fetching feedbacks");
            }
          } catch (error) {
            console.error('Error fetching count:', error);
            res.status(500).json({ error: 'Error fetching count' });
          }
    }   


}
module.exports = feedbackController;


// export default {getFeedbacks,updateFeedback,addFeedback,deleteFeedback}
