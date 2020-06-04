const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Vehicle = mongoose.model(
  'Vehicle',
  new mongoose.Schema({
    name: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    category: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    transmission: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
      lowercase: true,
    },
    engine: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    fuelType: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    colorExterior: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    colorInterior: {
      type: String,
      required: false,
      minlength: 2,
      maxlenght: 15,
    },
    price: {
      type: Number,
      required: false,
      minlength: 10,
      maxlenght: 200,
    },
  })
);

// Vehicles Array
// const vehicles = [];

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find().sort('name');
  res.send(vehicles);
});

// Create Vehicle
router.post('/', auth, async (req, res) => {
  const { error } = validateVehicle(req.body);

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
  const { error } = validateVehicle(req.body);
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
// Validate helper
function validateVehicle(vehicle) {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string(),
    transmission: Joi.string(),
    engine: Joi.number(),
    fuelType: Joi.string().length(5),
    colorExterior: Joi.string().length(15),
    colorInterior: Joi.string().length(15),
    price: Joi.number(),
  };

  return Joi.validate(vehicle, schema);
}

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const vehicle = await Vehicle.findByIdAndRemove(req.params.id);

  if (!vehicle)
    return res
      .status(404)
      .send('The vehicle with the given id could not be deleted');
  res.send(vehicle);
});

module.exports = router;
