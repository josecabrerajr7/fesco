
const UserModel             = require("../models/UserModel");
const jwt                   = require('jsonwebtoken');




exports.login_user =  async (req, res, next) => {
    try {
        // check if user exist in the database
        UserModel.find({ email: req.body.email, username: req.body.username }, async (err, docs) => {
            // warn the user that they need to login
                if(docs.length) {
                    // check if user has token and has not expired yet
                    console.log(docs);
                    
                } else {
                    // user needs to create an account
                    res.status(404).json({ success: false, error: "User needs to create an account." });
                }
        });
    } catch(err) {
        res.status(500).json({ success: false, err });
    }
};
