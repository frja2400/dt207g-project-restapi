require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Skapar express-app
const app = express();

app.use(cors());
app.use(express.json());

//Ansluter till MongoDB Atlas
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Ansluten till MongoDB Atlas');
    app.listen(3000, () => console.log('Servern körs på port 3000'));
  })
  .catch((err) => {
    console.error('Fel vid anslutning till MongoDB:', err.message);
  });