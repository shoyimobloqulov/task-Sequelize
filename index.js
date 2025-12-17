const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authController = require('./controllers/auth.controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.get('/dashboard', authController.dashboard);

// API
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.listen(3000);
