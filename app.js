const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');

// Format body on request
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/estres', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(8080);
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api', (req, res) => {
  var registro = new Registro({
    timestamp: req.body.time,
    nivel: req.body.nivel
  });
  registro.save(function (err, doc) {
    if (err) res.status(400).end();
    else res.status(200).end();
  });
});
