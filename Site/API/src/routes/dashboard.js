var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Rota para obter dados da dashboard do usuário
router.get("/dados/:idUsuario", function (req, res) {
    dashboardController.obterDadosDashboard(req, res);
});

module.exports = router;
