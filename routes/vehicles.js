const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models/vehicle');
const { validate } = require('../models/vehicle');

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find().sort('name');
  res.send(vehicles);
});

// Create Vehicle
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let vehicle = new Vehicle({
    name: req.body.name,
    category: req.body.category,
    transmission: req.body.transmission,
    engine: req.body.engine,
    fuelType: req.body.fuelType,
    colorExterior: req.body.colorExterior,
    colorInterior: req.body.colorInterior,
    price: req.body.price,
  });
  vehicle = await vehicle.save();
  res.send(vehicle);
});

// Get a single vehicle
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle)
    res.status(404).send('The vehicle with the given id was not found!');
  res.send(vehicle);
});

// Update
router.put('/:id', auth, async (req, res) => {
  // Validate
  const { error } = validate(req.body);
  // Vehicle validation
  if (error) return res.status(400).send(error.details[0].message);
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!vehicle)
    return res.status(404).send('Vehicle with the given id was not found ');
  res.send(vehicle);
});

// DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
  const vehicle = await Vehicle.findByIdAndRemove(req.params.id);

  if (!vehicle)
    return res
      .status(404)
      .send('The vehicle with the given id could not be deleted');
  res.send(vehicle);
});

module.exports = router;
