const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const pokemonTypeSchema = Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlenght: 20,
  },
  image: {
    type: String,
    minlength: 3,
    maxlenght: 250,
  },
});

const PokemonType = mongoose.model("Type", pokemonTypeSchema);

function validateType(type) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    image: Joi.string().min(3).max(255),
  });
  return schema.validate(type);
}

exports.PokemonType = PokemonType;
exports.validate = validateType;
