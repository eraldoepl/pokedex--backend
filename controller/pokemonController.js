const { Pokemon, validate } = require("../models/pokemons");

const getAllPokeoms = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort("name");
    res.send(pokemons);
  } catch (ex) {
    console.log(ex.message);
  }
};

const createPokemon = async () => {};

exports.getAllPokeoms = getAllPokeoms;
