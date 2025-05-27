var database = require('../database/config');

function verificarSeJaRespondeu(idUsuario) {
    const query = `SELECT COUNT(*) AS total FROM resultadoQuiz WHERE fkUsuario = ${idUsuario};`;
    return database.executar(query);
}


function salvarResultadoCompleto(idUsuario, acertos, respostas) {
    const inserirResultadoQuery = `
        INSERT INTO resultadoQuiz (fkUsuario, acertos)
        VALUES (${idUsuario}, ${acertos});
    `;

    console.log("Inserindo resultado no banco...");

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
        })
        .catch(err => {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error("Você já respondeu o quiz, redirecionando para a dashboard");
            } else {
                throw err;
            }
        });
}

module.exports = {
    salvarResultadoCompleto,
    verificarSeJaRespondeu
};

// var database = require('../database/config');

// function salvarResultadoCompleto(idUsuario, acertos, respostas) {
//     const inserirResultadoQuery = `
//         INSERT INTO resultadoQuiz (fkUsuario, acertos)
//         VALUES (${idUsuario}, ${acertos});
//     `;

//     console.log("Inserindo resultado no banco...");

//     // Primeiro salva a tentativa na Resultado
//    return database.executar(inserirResultadoQuery)
//     .then(resultado => {
//         const idResultadoQuiz = resultado.insertId;

//         const respostasInserts = respostas.map(resp => {
//             return `
//                 INSERT INTO respostasUsuario (fkResultadoQuiz, perguntaIndex, respostaDada, isCorreta)
//                 VALUES (${idResultadoQuiz}, ${resp.perguntaIndex}, '${resp.respostaDada}', ${resp.isCorreta});
//             `;
//         });

//         const promessas = respostasInserts.map(instrucao => database.executar(instrucao));
//         return Promise.all(promessas);
//     });
 
// }

// module.exports = {
//     salvarResultadoCompleto
// };
