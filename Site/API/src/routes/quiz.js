var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/verificarResultado/:idUsuario", function (req, res) {
    quizController.verificarResultado(req, res);
});


router.post("/salvarResultado", function (req, res) {
    console.log("Entrou na rota /salvarResultado");
    quizController.salvarResultado(req, res);
});

module.exports = router;
