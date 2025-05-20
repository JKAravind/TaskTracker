const express = require('express');
const cors = require("cors")
require('dotenv').config();
const authRoutes = require("./routes/auth/authRoutes")
const dashboard = require("./routes/dashboard")
const projects = require("./routes/project/projects")
const MongoConnection = require("../Backend/config/ConnectMongo");

const express = require('express');
const cors = require('cors');
const app = express();

// CORS config
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONT_END_URI];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors());

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