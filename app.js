const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const connectDB = (url) => {
    mongoose.connect(url);
    console.log(`connected successfully🟩`)
}

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);

app.all('*', (req, res) => {
    res.send('Oops! Invalid request!');
});

const start = async (url) => {
    try {
        connectDB(url)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start(process.env.MONGO_PASS);
