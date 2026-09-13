const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
require('dotenv').config();
app.use(express.json());
const newsroute = require('./routes/news.route.js');

app.use('/news',newsroute);
// app.get('/info',(req,res) => {
//     console.log('request recieved on backend');
//     return res.status(200).json({
//         message: "backend is on this point"
//     })
// })

module.exports = app;