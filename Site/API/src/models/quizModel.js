var database = require('../database/config');

function salvarResultadoCompleto(idUsuario, acertos, respostas) {
    const inserirResultadoQuery = `
        INSERT INTO resultadoQuiz (fkUsuario, acertos)
        VALUES (${idUsuario}, ${acertos});
    `;

    console.log("Inserindo resultado no banco...");

    // Primeiro salva a tentativa na ResultadoQuiz
    return database.executar(inserirResultadoQuery)
        .then(resultado => {
            // Depois de inserir, precisamos saber o ID que foi gerado
            const resultadoIdQuery = `SELECT LAST_INSERT_ID() as id;`;
            return database.executar(resultadoIdQuery);
        })
        .then(resultadoConsulta => {
            const idResultadoQuiz = resultadoConsulta[0].id;

            // Agora montamos os comandos para salvar as 10 respostas
            const respostasInserts = respostas.map(resp => {
                return `
                    INSERT INTO respostasUsuario (id, perguntaIndex, respostaDada, isCorreta)
                    VALUES (${idResultadoQuiz}, ${resp.perguntaIndex}, '${resp.respostaDada}', ${resp.isCorreta});
                `;
            });

            // Executa todos os inserts (um para cada resposta)
            const promessas = respostasInserts.map(instrucao => database.executar(instrucao));
            return Promise.all(promessas);
        });
}

module.exports = {
    salvarResultadoCompleto
};
