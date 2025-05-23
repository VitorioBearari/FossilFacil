CREATE DATABASE IF NOT EXISTS FossilFacil;
/*
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

SELECT * FROM resultadoQuiz;
*/
USE FossilFacil ;

CREATE TABLE IF NOT EXISTS FossilFacil.usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(200),
  senha VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS FossilFacil.resultadoQuiz (
  id INT NOT NULL AUTO_INCREMENT,
  fkUsuario INT UNIQUE,
  acertos INT,
  data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (fkUsuario) REFERENCES FossilFacil.usuario (id)
);

CREATE TABLE IF NOT EXISTS FossilFacil.respostasUsuario (
  id INT NOT NULL AUTO_INCREMENT,
  fkResultadoQuiz INT,
  perguntaIndex INT,
  respostaDada VARCHAR(100),
  isCorreta TINYINT(1),
  PRIMARY KEY (id),
  FOREIGN KEY (fkResultadoQuiz) REFERENCES FossilFacil.resultadoQuiz (id)
);	

SELECT * FROM resultadoQuiz;
SELECT * FROM usuario;
SELECT * FROM FossilFacil.respostasUsuario;