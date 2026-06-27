const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboardData();

        return res.status(200).json({

    success: true,

    message: "Dashboard data fetched successfully",

    data: {

        totalLeads,

        todayLeads,

        newLeads,

        proposalSent,

        recentLeads

    }

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
