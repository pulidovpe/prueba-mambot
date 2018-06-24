// index.js
// Import libs **************
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const { app: { port } } = require('./config/config');
const { mongoose } = require('./config/database');
const usersRoutes = require('./routes/users');
const booksRoutes = require('./routes/books');

// Settings *****************
app.set('views', path.join(__dirname, 'views'));

// Middlewares **************
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes********************
app.use('/api1', booksRoutes);
app.use('/api2', usersRoutes);

// Static files**************
app.use(express.static(path.join(__dirname, 'dist')));

// Launch *******************
app.listen(port, () => {
	console.log(`Server running in http://localhost:${port}`);
});