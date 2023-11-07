const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Vinculamos las rutas al índice
const celebritiesRouter = require("./celebrities.routes");
router.use("/celebrities", celebritiesRouter);

const moviesRouter = require("./movies.routes");
router.use("/movies", moviesRouter);

module.exports = router;
