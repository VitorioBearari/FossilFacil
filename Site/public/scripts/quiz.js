function finalizarQuiz() {
    // const resp1 = document.querySelector('input[name="resp1"]:checked');
    // const resp2 = document.querySelector('input[name="resp2"]:checked');
    // const resp3 = document.querySelector('input[name="resp3"]:checked');
    // const resp4 = document.querySelector('input[name="resp4"]:checked');
    // const resp5 = document.querySelector('input[name="resp5"]:checked');
    // const resp6 = document.querySelector('input[name="resp6"]:checked');
    // const resp7 = document.querySelector('input[name="resp7"]:checked');
    // const resp8 = document.querySelector('input[name="resp8"]:checked');
    // const resp9 = document.querySelector('input[name="resp9"]:checked');
    // const resp10 = document.querySelector('input[name="resp10"]:checked'); método burro.
    var pontuacao = 0;
    dashboardBtn = document.getElementById("dashboardBtn")
    textoResultado = document.getElementById("texto-resultado")

    const gabarito = [
        "passaro", 
        "asteroide", 
        "mesozoica", 
        "velociraptor", 
        "carnotossauro", 
        "diplodoco", 
        "tiranossauro-rex", 
        "indominus", 
        "mosassauro", 
        "espinossauro"]

    const respostas = []

    for (let i = 1; i <= 10; i++) { // laço pra verificar se tudo foi respondido, se sim, salva na lista
        const resposta = document.querySelector(`input[name="resp${i}"]:checked`); // passa por cada um dos radio

        if (resposta) { // verifica se foi marcado
            respostas.push(resposta.value); // se tiver marcado, manda a resposta pra lista de respostas do usuario
        } else {
            alert("Não respondeu a questão " + i + ".");
            return;
        }

    }
    
    for (let i = 0; i < 10; i++) { // laço pra fazer a comparação de acertos
        if(respostas[i] === gabarito[i]){ // caso as respostas estejam iguais ao gabarito:
            console.log(`Acertou a questão ${i + 1}`)
            pontuacao+=10
        } else {
            console.log(`Errou a questão ${i + 1}`)
        }
    }

    console.log("Respostas:", respostas);
    console.log("Gabarito:", gabarito);
    console.log("Pontuação final:", pontuacao);
    // alert("Você acertou " + pontuacao + " de 10 perguntas!");

    textoResultado.innerHTML = `Sua pontuação final foi: <br> ${pontuacao}/100.`
    document.getElementById("resultados").style.display = "inline-flex";

    resultados.scrollIntoView({ behavior: "smooth" });
}