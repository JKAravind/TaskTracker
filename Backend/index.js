const express = require('express');
const cors = require("cors")
const authRoutes = require("./routes/auth/authRoutes")
const MongoConnection = require("../Backend/config/ConnectMongo");

const app = express();
app.use(cors())
app.use(express.json());

MongoConnection();


app.use("/auth",authRoutes)
// Example route
app.get('/', (req, res) => {
    res.send('Task Tracker API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});