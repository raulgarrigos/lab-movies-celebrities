const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET "/movies/create" => Renderizar un formulario para crear las pelóiculas

router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

// POST "movies/create" => Crear la película en la BD con el formulario y redireccionar

router.post("/create", async (req, res, next) => {
  console.log(req.body);

  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
