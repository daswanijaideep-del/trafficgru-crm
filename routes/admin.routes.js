const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
    getAllLeads, getLeadById, updateLead,archiveLead, restoreLead, getArchivedLeads
} = require("../controllers/admin.controller");

router.get("/leads", authenticate, getAllLeads);
router.get(
    "/leads/archived",
    authenticate,
    getArchivedLeads
);
router.get("/leads/:id", authenticate, getLeadById);
router.patch("/leads/:id", authenticate, updateLead);


router.patch(
    "/leads/:id/archive",
    authenticate,
    archiveLead
);
router.patch(
    "/leads/:id/restore",
    authenticate,
    restoreLead
);


module.exports = router;