CREATE DATABASE IF NOT EXISTS FossilFacil;

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

SELECT * FROM FossilFacil.usuario;
SELECT * FROM FossilFacil.resultadoQuiz;
SELECT * FROM FossilFacil.respostasUsuario;

SELECT rq.acertos, 10 AS totalPerguntas FROM resultadoQuiz rq JOIN usuario u ON u.id = rq.fkUsuario WHERE u.nome = ${idUsuario} ORDER BY rq.id DESC LIMIT 1;

SELECT u.nome, r.acertos FROM resultadoQuiz r JOIN usuario u ON r.fkUsuario = u.id ORDER BY r.acertos DESC LIMIT 10;