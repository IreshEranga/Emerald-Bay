const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
  loginCustomerAffairsManager: async (req, res) => {
   
    const  email = req.body.email;
    const  password =req.body.password;
    try {
        const Users = await User.find({email: email, password: password});
        if (Users.length === 1) {
            res.status(200).json({ Users });
        } else {
            console.log("No User found");
            res.status(404).json({ error: "No User found" });
        }
    } catch (error) {
        console.error("Login error", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
},
};

module.exports = userController;
