const mongoose = require("mongoose");

module.exports = async function () {
  try {
    const DB_URI = process.env.DB_POKEDEX.replace(
      "<password>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully :)");
  } catch (ex) {
    console.log(ex);
  }
};
