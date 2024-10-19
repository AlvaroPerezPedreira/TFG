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