DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role TINYINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    lastname VARCHAR(255),
    phone VARCHAR(255),
    birthdate VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    gender VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    passport VARCHAR(255),
    avatar VARCHAR(350),
    status TINYINT NOT NULL
);
