const config = require('config');
const express = require('express');
const vehicles = require('./routes/vehicles');
const home = require('./routes/home');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
//
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
// connection to the database
mongoose
  .connect('mongodb://localhost/vehicles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log('Could not connect to the database!', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', home);
app.use('/api/vehicles', vehicles);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Server // PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
