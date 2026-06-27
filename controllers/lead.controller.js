const Lead = require("../models/Lead");

const createLead = async (req, res) => {

    try {
        console.log("========== REQUEST ==========");

        console.log(JSON.stringify(req.body, null, 2));

        const {
            form_id,
            form_data,
            meta
        } = req.body;

        if (
            !form_data ||
            !form_data.name ||
            !form_data.email ||
            !form_data.phone
        ) {

            return res.status(400).json({
                success: false,
                message: "Required fields are missing."
            });

        }

        // Generate Lead Number

        const totalLeads = await Lead.countDocuments();

        const leadNumber =
            `LD-${String(totalLeads + 1).padStart(6, "0")}`;

        const lead = await Lead.create({

            leadNumber,

            formId: form_id,

            name: form_data.name,

            company: form_data.company,

            email: form_data.email,

            countryCode: form_data.country_code,

            phone: form_data.phone,

            message: form_data.message,

            pageUrl: meta.page_url,

            pageTitle: meta.page_title,

            referrer: meta.referrer,

            utmSource: meta.utm_source,

            utmMedium: meta.utm_medium,

            utmCampaign: meta.utm_campaign,

            utmTerm: meta.utm_term,

            utmContent: meta.utm_content

        });

        res.status(201).json({

            success: true,

            message: "Lead saved successfully.",

            data: lead

        });

    }

    catch (error) {
    console.error("===== LEAD CREATION ERROR =====");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
}

};

module.exports = {
    createLead
};