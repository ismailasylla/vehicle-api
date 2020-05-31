const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('app', { name: 'My express API-APP', message: 'Welcome' });
});

module.exports = router;
