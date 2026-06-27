const Lead = require("../models/Lead");

const getAllLeads = async (req, res) => {
    try {

        const leads = await Lead.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

module.exports = {
    getAllLeads
};