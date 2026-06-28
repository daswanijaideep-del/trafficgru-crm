const Lead = require("../models/Lead");

const getAllLeads = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const search = req.query.search || "";

        const status = req.query.status || "";

        const sort = req.query.sort || "latest";

        const query = {

    isArchived: false

};

if (search) {

    query.$or = [

        { leadNumber: { $regex: search, $options: "i" } },

        { name: { $regex: search, $options: "i" } },

        { company: { $regex: search, $options: "i" } },

        { email: { $regex: search, $options: "i" } },

        { phone: { $regex: search, $options: "i" } }

    ];

}

if (status) {

    query.status = status;

}

        const totalRecords = await Lead.countDocuments(query);

        const totalPages = Math.ceil(totalRecords / limit);

        const leads = await Lead.find(query)

            .sort(
                sort === "oldest"
                    ? { createdAt: 1 }
                    : { createdAt: -1 }
            )

            .skip((page - 1) * limit)

            .limit(limit);

        return res.status(200).json({


            success: true,
             message: "Leads fetched successfully",

            data: {

                leads,

                pagination: {

                    page,

                    limit,

                    totalPages,

                    totalRecords

                }

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

const getLeadById = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,

                message: "Lead not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: lead

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

const updateLead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!lead) {

            return res.status(404).json({

                success: false,

                message: "Lead not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Lead updated successfully",

            data: lead

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
const archiveLead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndUpdate(

            req.params.id,

            {
                isArchived: true
            },

            {
                new: true
            }

        );

        if (!lead) {

            return res.status(404).json({

                success: false,

                message: "Lead not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Lead archived successfully",

            data: lead

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

const restoreLead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndUpdate(

            req.params.id,

            {
                isArchived: false
            },

            {
                new: true
            }

        );

        if (!lead) {

            return res.status(404).json({

                success: false,

                message: "Lead not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Lead restored successfully",

            data: lead

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

const getArchivedLeads = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const query = {
            isArchived: true
        };

        if (search) {

            query.$or = [

                { leadNumber: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }

            ];

        }

        const totalRecords = await Lead.countDocuments(query);

        const totalPages = Math.ceil(totalRecords / limit);

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.json({

            success: true,

            message: "Archived leads fetched successfully",

            data: {

                leads,

                pagination: {

                    page,
                    limit,
                    totalPages,
                    totalRecords

                }

            }

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
module.exports = {

    getAllLeads,
    getLeadById,
    updateLead,
    archiveLead,
    restoreLead,
    getArchivedLeads

};