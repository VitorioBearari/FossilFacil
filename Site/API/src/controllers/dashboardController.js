var dashboardModel = require('../models/dashboardModel');

async function obterDadosDashboard(req, res) {
    const idUsuario = req.params.idUsuario;

    try {
        // Busca os dados do usuário para o gráfico donut (acertos, total perguntas)
        const dadosUsuario = await dashboardModel.buscarDadosUsuario(idUsuario);

        // Busca o ranking geral dos usuários
        const ranking = await dashboardModel.buscarRanking();

        // Você pode adicionar outras consultas para KPIs aqui

        res.json({
            usuario: dadosUsuario,
            ranking: ranking,
            // kpis: {...} // futuramente
        });
    } catch (erro) {
        console.error("Erro ao obter dados da dashboard:", erro);
        res.status(500).json({ erro: "Erro ao obter dados da dashboard." });
    }
}

module.exports = {
    obterDadosDashboard
};
