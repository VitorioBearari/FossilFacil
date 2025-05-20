CREATE DATABASE IF NOT EXISTS FossilFacil;

USE FossilFacil;

CREATE TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(200),
    senha VARCHAR(100)
);

CREATE TABLE resultadoQuiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    acertos INT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE respostasUsuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkResultadoQuiz INT,
    perguntaIndex INT,
    respostaDada VARCHAR(100),
    isCorreta BOOLEAN,
    FOREIGN KEY (fkResultadoQuiz) REFERENCES ResultadoQuiz(id)
);
