var quizModel = require('../models/quizModel');

const gabarito = {
    resp1: "passaro",
    resp2: "asteroide",
    resp3: "mesozoica",
    resp4: "velociraptor",
    resp5: "carnotossauro",
    resp6: "diplodoco",
    resp7: "tiranossauro-rex",
    resp8: "indominus",
    resp9: "mosassauro",
    resp10: "espinossauro"
};

function verificarResultado(req, res) {
    const idUsuario = req.params.idUsuario;

    quizModel.verificarSeJaRespondeu(idUsuario)
        .then(resultado => {
            const jaRespondeu = resultado[0].total > 0;
            res.json({ jaRespondeu });
        })
        .catch(erro => {
            console.error("Erro ao verificar se usuário já respondeu o quiz:", erro);
            res.status(500).json({ erro: "Erro ao verificar resposta do quiz." });
        });
}


function salvarResultado(req, res) {
    const idUsuario = req.body.idUsuarioServer;
    const respostasUsuario = req.body.respostasUsuario;

    if (!idUsuario || !respostasUsuario) {
        return res.status(400).json({ erro: "Dados incompletos!" });
    }

    var acertos = 0;
    const respostasDetalhadas = [];

    // Percorre as 10 perguntas para comparar com o gabarito
    for (let i = 1; i <= 10; i++) {
        const chave = `resp${i}`;
        const respostaDada = respostasUsuario[chave];
        const correta = gabarito[chave];
        const isCorreta = respostaDada === correta;

        if (isCorreta)  acertos++

        respostasDetalhadas.push({
            perguntaIndex: i,
            respostaDada: respostaDada,
            isCorreta: isCorreta
        });
    }
    console.log(acertos);
    // Chama o model para salvar acertos + RESPOSTAperguntaIndexS
    quizModel.salvarResultadoCompleto(idUsuario, acertos, respostasDetalhadas)
    .then(() => {
        res.status(200).json({ acertos: acertos });
    })
    .catch(erro => {
        console.log(erro);

        // Como o model lança um erro com uma mensagem personalizada, verificamos pelo texto
        if (erro.message.includes("Você já respondeu")) {
            res.status(409).json({ mensagem: erro.message }); // 409 = Conflict
        } else {
            res.status(500).json({ erro: "Erro ao salvar respostas." });
        }
    });
}

module.exports = {
    salvarResultado,
    verificarResultado
}
