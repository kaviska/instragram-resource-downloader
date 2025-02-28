require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configure CORS to allow requests from http://localhost:3000
app.use(cors());
app.options('*', cors()); // enable pre-flight request handling


app.use(bodyParser.json());

const Resource = require('./routes/Resource');
app.use('/api/', Resource);

// Connect to the database
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));