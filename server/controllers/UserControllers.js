// importing UserModel 
const UserModel             = require("../models/UserModel");
const bcrypt                = require('bcryptjs');

// get all Users
exports.users_get_all = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
}

// creating a new user
exports.post_user = async (req, res, next) => {
    try {
        // if no username, email, and password is type in return 401 error
        if(!req.body.email || !req.body.username || !req.body.password) {
            res.status(401).json({ success: false, error: "Bad User Registration" });
        } else {
            // make sure the user email does not exist in the database
            UserModel.find({ email: req.body.email, username: req.body.username }, async (err, docs) => {
                // warn the user that they need to login
                if(docs.length) {
                    // return the user needs to login
                    res.status(409).json({ success: false, error: "Account already exist."});
                } else {

                    // hash password user type in
                    const generatedHashedPassword = await hashPassword(req.body.password);               
                    
                    // creating the new user model
                    const CreateUserAccount = new UserModel({
                        username: req.body.username,
                        email: req.body.email,
                        password: generatedHashedPassword,
                        isAdmin: req.body.isAdmin,
                        token: null
                    });

                    // saving the new user to the database
                    const UserAddedToDBResponse = await CreateUserAccount.save();

                    // if user saved was success return 200 if not then retun 400 because they was not saved
                    if(UserAddedToDBResponse && UserAddedToDBResponse._id) {
                        res.status(200).json({ success: true, user: UserAddedToDBResponse });
                    } else {
                        res.status(400).json({ success: false, error: "User was not created." });
                    }
                }
            });
        }

    } catch(err) {
        res.status(500).json({ success: false, err });
    }
}

// hash password user
const hashPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(password, salt);
    return hash;
}

