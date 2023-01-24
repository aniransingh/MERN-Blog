const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const cryptoJs = require("crypto-js");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
        },
        name: String,
        encrypt_password: String,
        salt: String,
        email: String,
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("password").set(function (plainPassword) {
    this.salt = uuid();
    this.encrypt_password = this.securePassword(plainPassword);
});

userSchema.methods = {
    securePassword: function (plainPassword) {
        return cryptoJs.SHA256(plainPassword, this.salt).toString();
    },
    authenticate: function (password) {
        return this.encrypt_password === this.securePassword(password);
    },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
