const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const PokemonSchema = Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlenght: 20,
  },
  pokeImage: {
    type: String,
    minlength: 3,
    maxlenght: 250,
  },
  order: {
    type: Number,
    min: 0,
    default: new Date().getTime(),
  },
  weight: {
    type: Number,
    require: true,
    min: 0,
    max: 1000,
  },
  height: {
    type: Number,
    require: true,
    min: 0,
    max: 1000,
  },
  experience: {
    type: Number,
    require: true,
    min: 0,
    max: 10000,
  },
  attack: [String],
  abilities: [String],
  types: [String],
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

const validatePokemon = (pokemon) => {
  const schemaObj = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    pokeImage: Joi.string().min(3).max(250),
    weight: Joi.number().min(0).max(1000).required(),
    height: Joi.number().min(0).max(1000).required(),
    experience: Joi.number().min(0).max(10000),
    attack: Joi.array().required(),
    abilities: Joi.array().required(),
    types: Joi.array().length(2).required(),
  });

  return schemaObj.validate(pokemon);
};

exports.Pokemon = Pokemon;
exports.validate = validatePokemon;
