var database = require('../database/config');

function salvarResultadoCompleto(idUsuario, acertos, respostas) {
    const inserirResultadoQuery = `
        INSERT INTO resultadoQuiz (fkUsuario, acertos)
        VALUES (${idUsuario}, ${acertos});
    `;

    console.log("Inserindo resultado no banco...");

    // Primeiro salva a tentativa na Resultado
   return database.executar(inserirResultadoQuery)
    .then(resultado => {
        const idResultadoQuiz = resultado.insertId;

        const respostasInserts = respostas.map(resp => {
            return `
                INSERT INTO respostasUsuario (fkResultadoQuiz, perguntaIndex, respostaDada, isCorreta)
                VALUES (${idResultadoQuiz}, ${resp.perguntaIndex}, '${resp.respostaDada}', ${resp.isCorreta});
            `;
        });

        const promessas = respostasInserts.map(instrucao => database.executar(instrucao));
        return Promise.all(promessas);
    });
 
}

module.exports = {
    salvarResultadoCompleto
};
