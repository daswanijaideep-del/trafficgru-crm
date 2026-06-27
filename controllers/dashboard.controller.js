const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboardData();

        res.json({

            success: true,

            data

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};