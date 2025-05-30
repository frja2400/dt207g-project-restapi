require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

//Skapar express-app
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//Alla anrop som börjar med /api/users ska skickas vidare för hantering i userRoutes.
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Hämta routes och routingregler för MenuItem.
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/api/menu', menuItemRoutes);

//Hämta routes och routingregler för Order.
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/order', orderRoutes);

//För att visa en enkel HTML-sida som förklarar applikationen.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


const port = process.env.PORT || 3000;

//Ansluter till MongoDB Atlas
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Ansluten till MongoDB Atlas');
    app.listen(port, () => console.log(`Servern körs på port ${port}`));
  })
  .catch((err) => {
    console.error('Fel vid anslutning till MongoDB:', err.message);
  });