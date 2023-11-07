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

// GET "/movies" => Renderizar la lista de películas creadas

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().select({ title: 1 });
    console.log(allMovies);
    res.render("movies/movies.hbs", { allMovies });
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:id"" => Renderizar los detalles de cada película

router.get("/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    console.log("Este es el id: ", req.params.id);
    console.log("Esta es la respuesta: ", oneMovie);

    res.render("movies/movie-details.hbs", { oneMovie });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:id/delete" => Eliminar una película de la BD y redireccionar

router.post("/:id/delete", async (req, res, next) => {
  console.log("Borrando la película; ", req.params.id);
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:id/edit" => Renderizar un formulario para editar las películas
router.get("/:id/edit", async (req, res, next) => {
  try {
    const movieToEdit = await Movie.findById(req.params.id).populate("cast");
    console.log(movieToEdit);
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    console.log(allCelebrities);
    res.render("movies/edit-movie.hbs", {
      movieToEdit,
      allCelebrities,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:id/edit" => Enviar la información del formulario a esta ruta y actualizar la película

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.findByIdAndUpdate(id, {
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
