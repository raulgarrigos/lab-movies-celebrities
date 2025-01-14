const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// GET "/celebrities/create" => Renderizar un formulario para crear las celebrities

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST "/celebrities/create" => Crear la celebrity en la BD con el formulario y redireccionar

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

// GET "/celebrities" => Renderizar la lista de celebridades creadas

router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    console.log(allCelebrities);
    res.render("celebrities/celebrities.hbs", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
