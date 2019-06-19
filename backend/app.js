const express = require('express');
const path = require('path');
const app = express();

app.use('/node_modules', express.static(path.join(__dirname + '/../node_modules')));
app.use('/frontend', express.static(path.join(__dirname + '/../frontend')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/../frontend/index.html'));
});
app.get('/search', (req, res, next) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
