--Usuarios
INSERT INTO User (email, password, role, username, name, lastname, phone, birthdate, country, gender, address, passport, avatar, status) 
VALUES 
    ('a@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'a', 'aName', 'aLastName', '123456789', '01-01-2000', 'Spain', 'male', 'aAddress', '123456789', 'a@udc.es_apriliars660.jpg', 0),
    ('b@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'b', null, null, null, '01-01-1999', null, 'female', null, null, 'Default_Avatar.png', 0),
    ('admin@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 1, 'b', null, null, null, '01-01-2000', null, 'male', null, null, 'Default_Avatar.png', 0),
    ('banned@udc.es','$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'BannedUser', null, null, null, '01-01-2000', null, 'female', null, null, 'Default_Avatar.png', 1)
;


INSERT INTO Feature (feature_name)
VALUES 
    ('Outdoor pool'),
    ('Indoor pool'),
    ('Heated pool'),
    ('Spa'),
    ('Free parking'),
    ('Free Wi-Fi'),
    ('Fitness center'),
    ('Room service'),
    ('Green areas'),
    ('Complimentary breakfast'),
    ('24-hour reception'),
    ('On-site restaurant'),
    ('Conference rooms'),
    ('Pet-friendly'),
    ('Laundry service'),
    ('Kids plays area'),
    ('Accessible rooms'),
    ('Baggage storage'),
    ('Private beach access'),
    ('Electric vehicle charging stations'),
    ('Multilingual staff'),
    ('Bike rentals'),
    ('Car rental service'),
    ('Tour desk'),
    ('Tennis court'),
    ('Padel court'),
    ('Golf course'),
    ('Gift shop'),
    ('Hair salon'),
    ('Valet parking')
;

INSERT INTO Lodge (lodge_name, lodge_description, lodge_address, lodge_phone, city, country, available_rooms, price_per_night, check_in, check_out, is_closed, lodge_provider, user_id) 
VALUES 
    ('Lodge 1', 'Lodge 1 description', 'Lodge 1 address', '123456789', 'Lodge 1 city', 'Lodge 1 country', 5, 50.00, '14:00', '11:00', 0, 0, 1),
    ('Lodge 2', 'Lodge 2 description', 'Lodge 2 address', '123456789', 'Lodge 2 city', 'Lodge 2 country', 10, 100.00, '14:00', '11:00', 0, 0, 1),
    ('Lodge 3', 'Lodge 3 description', 'Lodge 3 address', '123456789', 'Lodge 3 city', 'Lodge 3 country', 12, 150.00, '14:00', '11:00', 0, 0, 1),
    ('Lodge 4', 'Lodge 4 description', 'Lodge 4 address', '123456789', 'Lodge 4 city', 'Lodge 4 country', 15, 200.00, '14:00', '11:00', 0, 0, 1),
    ('Lodge 5', 'Lodge 5 description', 'Lodge 5 address', '123456789', 'Lodge 5 city', 'Lodge 5 country', 20, 250.00, '14:00', '11:00', 0, 0, 1)
;


INSERT INTO Lodge_Feature (lodge_id, feature_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 5),
    (3, 6),
    (3, 7),
    (3, 8),
    (3, 9),
    (3, 10),
    (3, 11),
    (3, 12),
    (3, 13),
    (4, 1),
    (4, 2),
    (5, 15),
    (5, 17),
    (5, 18)
;


INSERT INTO Lodge_Image (image_url, lodge_id)
VALUES
    ('Hab1.jpg', 1),
    ('Hab2.jpg', 1),
    ('Hab3.jpg', 1),
    ('Hab4.jpg', 1),
    ('Hab1.jpg', 2),
    ('Hab2.jpg', 2),
    ('Hab3.jpg', 2),
    ('Hab1.jpg', 3),
    ('Hab2.jpg', 3),
    ('Hab4.jpg', 4),
    ('Hab1.jpg', 5)
;

