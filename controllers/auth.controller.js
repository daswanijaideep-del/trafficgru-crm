const generateToken = require("../utils/generateToken");

const login = (req, res) => {
    const { username, password } = req.body;

    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }

    const token = generateToken();

    res.json({
        success: true,
        token
    });
};

const me = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

module.exports = {
    login,
    me
};