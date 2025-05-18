const express = require('express');

const MongoConnection = require("../Backend/config/ConnectMongo");

const app = express();

app.use(express.json());

MongoConnection();

const registerUser = require("./routes/register")

app.use("/register",registerUser)
// Example route
app.get('/', (req, res) => {
    res.send('Task Tracker API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});