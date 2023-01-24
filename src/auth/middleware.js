const User = require("./models");
const jwt = require("jsonwebtoken");

const commonLogin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res
            .status(400)
            .json({ msg: "username and password must be provided" });

    const user = await User.findOne({ username });

    if (!user || !user.authenticate(password))
        return res.status(401).json({ msg: "invalid username or password" });

    let token = jwt.sign({ _id: user._id }, process.env.AUTH_KEY);

    user.salt = "";
    user.encrypt_password = "";

    req.body.token = token;
    req.body.user = user;

    next();
};

module.exports = { commonLogin };
