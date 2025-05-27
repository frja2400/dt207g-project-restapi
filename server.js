require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Skapar express-app
const app = express();

app.use(cors());
app.use(express.json());

//Alla anrop som börjar med /api/users ska skickas vidare för hantering i userRoutes.
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Ansluter till MongoDB Atlas
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Ansluten till MongoDB Atlas');
    app.listen(3000, () => console.log('Servern körs på port 3000'));
  })
  .catch((err) => {
    console.error('Fel vid anslutning till MongoDB:', err.message);
  });