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

    return res.status(200).json({

        success: true,

        message: "Login successful",

        data: {

            user: {

                username: process.env.ADMIN_USERNAME,

                role: "Administrator"

            },

            token

        }

    });

};

const me = (req, res) => {

    return res.status(200).json({

        success: true,

        message: "User fetched successfully",

        data: req.user

    });

};

module.exports = {
    login,
    me
};
