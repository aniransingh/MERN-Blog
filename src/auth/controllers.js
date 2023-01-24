const User = require("./models");

const register = async (req, res) => {
    const { username, name, password, email } = req.body;

    if (!password || !username || !name || !email)
        return res.status(400).json({
            msg: "username, email, password and name must be provided",
        });

    let user = await User.findOne({ username });

    if (user) return res.status(400).json({ msg: "user already exists" });

    if (password.length < 6)
        return res
            .status(400)
            .json({ msg: "password must be atleast 6 characters long" });

    user = await User.create({ username, name, password, email });

    user.salt = "";
    user.encrypt_password = "";

    return res.status(201).json({ msg: "user registered", user });
};

const login = async (req, res) => {
    return res.status(200).json({ msg: "login successful", data: req.body });
};

const reset = async (req, res) => {
    const {username, newPassword} = req.body;

    const user = await User.findOne({username});
    user.password = newPassword;
    await user.save();

    return res.status(200).json({msg: "password reset succcesful"}) 
}

// const reset = async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password)
//         return res
//             .status(400)
//             .json({ msg: "username and password must be provided" });

//     if (password.length < 6)
//         return res
//             .status(400)
//             .json({ msg: "password must be atleast 6 characters long" });

//     const user = await User.findOne({ username });

//     if (!user) return res.status(404).json({ msg: "user not found" });

//     user.password = password;
//     await user.save();

//     user.salt = "";
//     user.encrypt_password = "";

//     return res.json({ msg: "password reset successful", user });
// };

module.exports = { register, login, reset };
