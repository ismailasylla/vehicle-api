const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Creating Vehicle Schema
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

exports.Vehicle = Vehicle;
exports.validate = validateVehicle;
