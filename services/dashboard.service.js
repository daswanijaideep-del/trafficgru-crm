const Lead = require("../models/Lead");

const getDashboardData = async () => {

    const totalLeads = await Lead.countDocuments();

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayLeads = await Lead.countDocuments({
        createdAt: {
            $gte: today
        }
    });

    const newLeads = await Lead.countDocuments({
        status: "New"
    });

    const proposalSent = await Lead.countDocuments({
        status: "Proposal Sent"
    });

    const recentLeads = await Lead
        .find()
        .sort({
            createdAt: -1
        })
        .limit(10);

    return {

        totalLeads,

        todayLeads,

        newLeads,

        proposalSent,

        recentLeads

    };

};

module.exports = {
    getDashboardData
};