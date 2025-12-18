const express = require('express');
const app = express();

const apiRouter = require('./routes');
const homeRouter = require('./routes/home');

app.use('/api', apiRouter);
app.use('/', homeRouter);

app.listen(3000, () =>
  console.log('Server running: http://localhost:3000')
);
