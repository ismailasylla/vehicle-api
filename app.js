const express = require('express');
const vehicles = require('./routes/vehicles');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/vehicles', vehicles);
app.use('/', home);

// Server // PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
