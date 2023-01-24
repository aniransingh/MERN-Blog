require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../auth/models");

const isAuthenticated = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ msg: "token required" });

    try {
        const verify = jwt.verify(token, process.env.AUTH_KEY);

        if (verify && verify._id) {
            const user = await User.findById(verify._id);

            if (!user)
                return res.status(401).json({ msg: "unauthorized user" });

            req.body.user_id = user._id;
            next();
        }

        return res.status(401).json({ msg: "token requried" });
    } catch (error) {
        return res.status(401).json({ msg: "invalid token" });
    }
};

module.exports = { isAuthenticated };
