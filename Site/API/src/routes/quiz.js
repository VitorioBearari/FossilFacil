var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvarResultado", function (req, res) {
    console.log("Entrou na rota /salvarResultado");
    quizController.salvarResultado(req, res);
});

module.exports = router;
