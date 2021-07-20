const mongoose            = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: Boolean,
    token: String
}, {
    timestamps: true,
    collection: 'Users'
});

module.exports = mongoose.model('User', UserSchema);