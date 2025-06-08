var dashboardModel = require('../models/dashboardModel');

async function obterDadosDashboard(req, res) { // vai puxar todos os dados de uma vez
    const idUsuario = req.params.idUsuario;

    try {
        const dadosUsuario = await dashboardModel.buscarDadosUsuario(idUsuario);

        const ranking = await dashboardModel.buscarRanking();

        const totalRespostas = await dashboardModel.buscarRespostas();
        
        const totalCadastos = await dashboardModel.buscarCadastros()

        console.log({ totalRespostas })

        res.json({
            usuario: dadosUsuario,
            ranking: ranking,
            totalRespostas: totalRespostas,
            totalCadastros: totalCadastos
        });
    } catch (erro) {
        console.error("Erro ao obter dados da dashboard:", erro);
        res.status(500).json({ erro: "Erro ao obter dados da dashboard." });
    }
}

1
module.exports = {
    obterDadosDashboard
};
