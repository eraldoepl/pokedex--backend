const fs = require("fs/promises");
const { PokemonType, validate } = require("../models/pokemonTypes");

const getAllPokemonTypes = async (req, res) => {
  const types = await PokemonType.find().sort("name");
  res.send(types);
};

const pokemonTypeById = async (req, res) => {
  try {
    const pokemonType = await PokemonType.findById(req.params.id);

    if (!pokemonType)
      return res
        .status(404)
        .send("Pokemon Type with the given ID was not found.");
    res.send(pokemonType);
  } catch (ex) {
    console.log(ex.message);
  }
};

const createPokemonType = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.filename;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const pokemonType = new PokemonType({
      name: req.body.name,
      image: req.body.image,
    });

    await pokemonType.save();
    res.send(pokemonType);
  } catch (ex) {
    console.log(ex.message);
    await fs.unlink(`public/images/types/${req.file.filename}`);
  }
};

const updatePokemonType = async (req, res) => {
  try {
    const pokemonType = await PokemonType.findById(req.params.id);
    if (!pokemonType)
      return res
        .status(404)
        .send("The given Id for Pokemon Type was not found.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.file) {
      req.body.image = req.file.filename;
    } else req.body.image = pokemonType.image;

    pokemonType.name = req.body.name;
    pokemonType.image = req.body.image;

    await pokemonType.save();
    res.send(pokemonType);
  } catch (ex) {
    console.log(ex.message);
  }
};

const deletePokemonType = async (req, res) => {
  try {
    const pokemonType = await PokemonType.findById(req.params.id);
    if (!pokemonType)
      return res
        .status(404)
        .send("Pokemon Type with the given ID was not found.");

    await fs.unlink(`public/images/types/${pokemonType.image}`);
    await PokemonType.deleteOne({ _id: req.params.id });

    res.send(pokemonType);
  } catch (ex) {
    console.log(ex.message);
  }
};

exports.getAllPokemonTypes = getAllPokemonTypes;
exports.pokemonTypeById = pokemonTypeById;
exports.createPokemonType = createPokemonType;
exports.deletePokemonType = deletePokemonType;
exports.updatePokemonType = updatePokemonType;
