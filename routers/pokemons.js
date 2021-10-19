const express = require("express");
const router = express.Router();

const { getAllPokeoms } = require("../controller/pokemonController");
const { Pokemon } = require("../models/pokemons");

router.route("/").get(getAllPokeoms);

module.exports = router;
