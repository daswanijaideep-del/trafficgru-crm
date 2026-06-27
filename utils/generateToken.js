const jwt = require("jsonwebtoken");

const generateToken = () => {
    return jwt.sign(
        {
            username: process.env.ADMIN_USERNAME,
            role: "admin"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

module.exports = generateToken;