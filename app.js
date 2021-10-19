const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const pokemonTypes = require("./routers/pokemonTypes");
const pokemons = require("./routers/pokemons");

// development logging
if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));

// Routes
app.use("/pokedex/api/type", pokemonTypes);
app.use("/pokedex/api/pokemons", pokemons);

module.exports = app;
