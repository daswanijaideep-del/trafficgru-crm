const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
    getAllLeads
} = require("../controllers/admin.controller");

router.get("/leads", authenticate, getAllLeads);

module.exports = router;