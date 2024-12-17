DROP TABLE IF EXISTS Lodge_Feature;
DROP TABLE IF EXISTS Feature;
DROP TABLE IF EXISTS Lodge_Image;
DROP TABLE IF EXISTS Booking;
DROP TABLE IF EXISTS Lodge;
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

CREATE TABLE Lodge (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lodge_email VARCHAR(255) UNIQUE NOT NULL,
    lodge_name VARCHAR(255) NOT NULL,
    lodge_description VARCHAR(255) NOT NULL,
    lodge_address VARCHAR(255) NOT NULL,
    lodge_phone VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    available_rooms INT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    check_in VARCHAR(255) NOT NULL,
    check_out VARCHAR(255) NOT NULL,
    is_closed TINYINT NOT NULL,
    lodge_provider TINYINT NOT NULL,
    is_banned TINYINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Feature (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    feature_nameEN VARCHAR(255) NOT NULL,
    feature_nameES VARCHAR(255) NOT NULL,
    feature_nameFR VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL
);

CREATE TABLE Lodge_Feature (
    lodge_id BIGINT NOT NULL,
    feature_id BIGINT NOT NULL,
    PRIMARY KEY (lodge_id, feature_id),
    FOREIGN KEY (lodge_id) REFERENCES Lodge(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES Feature(id) ON DELETE CASCADE
);

CREATE TABLE Lodge_Image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    lodge_id BIGINT NOT NULL,
    FOREIGN KEY (lodge_id) REFERENCES Lodge(id) ON DELETE CASCADE
);

CREATE TABLE Booking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lodge_id BIGINT,
    check_in VARCHAR(255) NOT NULL,
    check_out VARCHAR(255) NOT NULL,
    arrival_time VARCHAR(255) NOT NULL,
    departure_time VARCHAR(255) NOT NULL,
    booking_date VARCHAR(255) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    lodge_email VARCHAR(255) NOT NULL,
    is_reviewed TINYINT NOT NULL,
    is_cancelled TINYINT NOT NULL,
    is_api TINYINT NOT NULL,
    FOREIGN KEY (lodge_id) REFERENCES Lodge(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);