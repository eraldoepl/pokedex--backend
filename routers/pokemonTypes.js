const express = require("express");
const router = express.Router();

const { resizeImage, upload } = require("../utilities/multer");

const {
  getAllPokemonTypes,
  pokemonTypeById,
  createPokemonType,
  updatePokemonType,
  deletePokemonType,
} = require("../controller/typeController");

router
  .route("/")
  .get(getAllPokemonTypes)
  .post(upload.single("photoPokemonType"), resizeImage, createPokemonType);

router
  .route("/:id")
  .get(pokemonTypeById)
  .put(updatePokemonType)
  .delete(deletePokemonType);

module.exports = router;
