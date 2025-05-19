const express = require('express');
const cors = require("cors")
const authRoutes = require("./routes/auth/authRoutes")
const dashboard = require("./routes/dashboard")
const projects = require("./routes/project/projects")
const MongoConnection = require("../Backend/config/ConnectMongo");

const app = express();
app.use(cors())
app.use(express.json());

MongoConnection();


app.use("/auth",authRoutes)
app.use("/dashboard",dashboard)
app.use("/project",projects)

app.get('/', (req, res) => {
    res.send('Task Tracker API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});