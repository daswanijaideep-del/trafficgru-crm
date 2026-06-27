const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        leadNumber: {
            type: String,
            unique: true
        },

        formId: {
            type: String,
            required: true,
            default: "contact_form"
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        countryCode: {
            type: String,
            default: "+91"
        },

        phone: {
            type: String,
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        pageUrl: {
            type: String,
            default: ""
        },

        pageTitle: {
            type: String,
            default: ""
        },

        referrer: {
            type: String,
            default: ""
        },

        utmSource: {
            type: String,
            default: ""
        },

        utmMedium: {
            type: String,
            default: ""
        },

        utmCampaign: {
            type: String,
            default: ""
        },

        utmTerm: {
            type: String,
            default: ""
        },

        utmContent: {
            type: String,
            default: ""
        },

        source: {
            type: String,
            default: "Website"
        },

        status: {
            type: String,
            enum: [
                "New",
                "Contacted",
                "Meeting Scheduled",
                "Proposal Sent",
                "Won",
                "Lost"
            ],
            default: "New"
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Normal",
                "High"
            ],
            default: "Normal"
        },
        notes: {
    type: String,
    default: ""
},
isArchived: {
    type: Boolean,
    default: false
}

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lead", leadSchema);