const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

// Vehicles Array
const vehicles = [];

// Get all vehicles
router.get('/', (req, res) => {
  res.send(vehicles);
});

// Create Vehicle
router.post('/', (req, res) => {
  const { error } = validateVehicle(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const vehicle = {
    id: vehicles.length + 1,
    name: req.body.name,
    category: req.body.category,
    transmission: req.body.transmission,
    engine: req.body.engine,
    fuelType: req.body.fuelType,
    colorExterior: req.body.colorExterior,
    colorInterior: req.body.colorInterior,
    price: req.body.price,
  };
  vehicles.push(vehicle);
  res.send(vehicle);
});

// Get single vehicle
router.get('/:id', (req, res) => {
  const vehicle = vehicles.find((v) => v.id === parseInt(vehicles.id));
  if (!vehicle)
    res.status(404).send('The vehicle with the given id was not found!');
  res.send(vehicle);
});

// Update
router.put('/:id', (req, res) => {
  const vehicle = vehicles.find((v) => v.id === parseInt(req.params.id));
  if (!vehicle)
    return res.status(404).send('Vehicle with the given id was not found ');

  // Validate
  const { error } = validateVehicle(req.body);
  // Vehicle validation
  if (error) return res.status(400).send(error.details[0].message);

  vehicle.name = req.body.name;
  vehicle.category = req.body.category;
  vehicle.transmission = req.body.transmission;
  vehicle.engine = req.body.engine;
  vehicle.fuelType = req.body.fuelType;
  vehicle.colorExterior = req.body.colorExterior;
  vehicle.colorInterior = req.body.colorInterior;
  vehicle.price = req.body.price;

  res.send(vehicle);
});

// Validate helper
function validateVehicle(vehicle) {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string(),
    transmission: Joi.string().length(10),
    engine: Joi.number(),
    fuelType: Joi.string().length(5),
    colorExterior: Joi.string().length(10),
    colorInterior: Joi.string().length(10),
    price: Joi.number(),
  };

  return Joi.validate(vehicle, schema);
}

// DELETE
router.delete('/:id', (req, res) => {
  const vehicle = vehicles.find((v) => v.id === parseInt(req.params.id));
  if (!vehicle)
    return res
      .status(404)
      .send('The vehicle with the given id could not be deleted');
  const index = vehicles.indexOf(vehicle);
  vehicles.splice(index, 1);
  return res.send(vehicle);
});

module.exports = router;
