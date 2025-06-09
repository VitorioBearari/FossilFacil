var database = require('../database/config');

function buscarDadosUsuario(idUsuario) {
    const query = `
        SELECT rq.acertos, 10 AS totalPerguntas FROM resultadoQuiz rq JOIN usuario u ON u.id = rq.fkUsuario WHERE u.nome = "${idUsuario}" ORDER BY rq.id DESC LIMIT 1;
    `;
    return database.executar(query).then(resultado => {
        if (resultado.length > 0) {
            return {
                acertos: resultado[0].acertos,
                totalPerguntas: resultado[0].totalPerguntas
            };
        } else {
            return {
                acertos: 0,
                totalPerguntas: 10
            };
        }
    });
}

function buscarRanking() {
    // Consulta para pegar ranking dos usuários ordenado por acertos decrescente, limitando a 10 por exemplo
    const query = `
        SELECT u.nome, r.acertos FROM resultadoQuiz r JOIN usuario u ON r.fkUsuario = u.id ORDER BY r.acertos DESC LIMIT 5;
    `;
    return database.executar(query);
}

function buscarRespostas(){
    const query = `
        SELECT COUNT(*) AS totalRespostas FROM resultadoQuiz r INNER JOIN usuario u ON r.fkUsuario = u.id;
    `
    return database.executar(query)
}

function buscarCadastros(){
    const query = `
        SELECT COUNT(*) AS totalCadastros FROM usuario;
    `
    return database.executar(query)
}

module.exports = {
    buscarDadosUsuario,
    buscarRanking,
    buscarCadastros,
    buscarRespostas
};
