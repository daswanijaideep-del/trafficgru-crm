const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboardData();

        return res.status(200).json({

            success: true,

            message: "Dashboard data fetched successfully",

            data

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};