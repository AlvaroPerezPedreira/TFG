DROP TABLE IF EXISTS Client;

CREATE TABLE Client (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role TINYINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    birthDate VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    genre TINYINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    passport VARCHAR(255) NOT NULL,
    avatar VARCHAR(350) NOT NULL
);
