require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const treeRoutes = require('./routes/treeRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', treeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT} to view the Botanical Atelier.`);
});

module.exports = app;
