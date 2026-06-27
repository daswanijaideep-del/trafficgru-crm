const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const leadRoutes = require("./routes/lead.routes");
const adminRoutes = require("./routes/admin.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/admin", adminRoutes);

module.exports = app;