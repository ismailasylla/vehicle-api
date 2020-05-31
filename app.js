const express = require('express');
const vehicles = require('./routes/vehicles');
const home = require('./routes/home');
const mongoose = require('mongoose');

const app = express();
// connection to the database
mongoose
  .connect('mongodb://localhost/vehicles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log('Could not connect to the database!', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/vehicles', vehicles);
app.use('/', home);

// Server // PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
