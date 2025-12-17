const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authController = require('./controllers/auth.controller');
const path = require('path');
const auth = require('./middlewares/login').isAuth;

// Middleware   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Views
app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));

app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.get('/dashboard', auth, authController.dashboard); // ❌ () qo‘shmang

// API
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

// 404
app.use((req, res) => {
  res.status(404).render('errors/404')
})

// 500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('errors/500')
})

// 403
app.use((err, req, res, next) => {
  console.error(err)
  res.status(403).render('errors/403')
})


app.listen(3000, () => console.log('Server http://localhost:3000'));
