--Usuarios
INSERT INTO User (email, password, role, username, name, lastname, phone, birthdate, country, gender, address, passport, avatar, status) 
VALUES 
    ('alvaro@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'Alvaro111', 'Alvaro', 'Martinez', '981525252', '01-01-2000', 'Spain', 'male', 'aAddress', '123456789', 'a@udc.es_apriliars660.jpg', 0),
    ('pablo@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'Pablo123', null, null, null, '01-01-1999', null, 'female', null, null, 'Default_Avatar.png', 0),
    ('admin@udc.es', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 1, 'Admin_01', null, null, null, '01-01-2000', null, 'male', null, null, 'Default_Avatar.png', 0),
    ('LodgeOwner@apibooking.com', '$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'BookingOwner', 'Gleen', 'D. Fogel', '912768614', '03-04-1966', 'United States of America', 'male', '1234 Main St, Springfield, IL', '123456789', 'LodgeOwner@apibooking.com_BookingImg.jpg', 0),
    ('adolfoban@udc.es','$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'AdolfoBan', 'Adolfo', 'Rodriguez', null, '01-01-2000', null, 'female', null, null, 'a@udc.es_apriliars660.jpg', 1),
    ('carlosban@udc.es','$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'CarlosBan', 'Carlos', 'Suarez', null, '01-01-2000', null, 'female', null, null, 'b@udc.es_mustang.jpg', 1),
    ('miguelban@udc.es','$2a$10$hmGUL85rQGco4zBJgP6uzeeBSUi5Teq8b7so0cPGujgqrUppWjtBW', 0, 'MiguelBan', 'Miguel', 'Mato', null, '01-01-2000', null, 'female', null, null, 'Default_Avatar.png', 1)
;


INSERT INTO Feature (feature_nameEN, feature_nameES, feature_nameFR, category) 
VALUES
    -- Vehicle
    ('Free parking', 'Aparcamiento gratuito', 'Parking gratuit', 'Vehicle'),
    ('Car hire', 'Alquiler de coches', 'Location de voiture', 'Vehicle'),
    ('Electric vehicle charging station', 'Estación de carga para vehículos eléctricos', 'Station de charge pour véhicules électriques', 'Vehicle'),
    ('Bicycle rental', 'Alquiler de bicicletas', 'Location de vélos', 'Vehicle'),

    -- Food
    ('Restaurant', 'Restaurante', 'Restaurant', 'Food'),
    ('Bar', 'Bar', 'Bar', 'Food'),
    ('Meeting/banquet facilities', 'Instalaciones para reuniones/banquetes', 'Installations pour réunions/banquets', 'Food'),
    ('Continental breakfast', 'Desayuno continental', 'Petit-déjeuner continental', 'Food'),
    ('Coffee house on site', 'Cafetería en el sitio', 'Café sur place', 'Food'),

    -- Sports
    ('Tennis court', 'Pista de tenis', 'Court de tennis', 'Sports'),
    ('Fitness center', 'Gimnasio', 'Centre de fitness', 'Sports'),
    ('Golf course', 'Campo de golf', 'Parcours de golf', 'Sports'),
    ('Skiing', 'Esquí', 'Ski', 'Sports'),
    ('Ski school', 'Escuela de esquí', 'École de ski', 'Sports'),
    ('Games room', 'Sala de juegos', 'Salle de jeux', 'Sports'),
    ('Windsurfing', 'Windsurf', 'Planche à voile', 'Sports'),
    ('Hiking', 'Senderismo', 'Randonnée', 'Sports'),
    ('Bowling', 'Bolos', 'Bowling', 'Sports'),
    ('Diving', 'Buceo', 'Plongée', 'Sports'),
    ('Horse riding', 'Equitación', 'Équitation', 'Sports'),
    ('Mini golf', 'Mini golf', 'Mini-golf', 'Sports'),
    ('Water sport facilities', 'Instalaciones para deportes acuáticos', 'Installations pour sports nautiques', 'Sports'),
    ('Padel court', 'Pista de pádel', 'Terrain de padel', 'Sports'),

    -- Zones
    ('Chapel/shrine', 'Capilla/santuario', 'Chapelle/sanctuaire', 'Zones'),
    ('Casino', 'Casino', 'Casino', 'Zones'),
    ('Private beach area', 'Zona de playa privada', 'Zone de plage privée', 'Zones'),
    ('Nightclub/DJ', 'Discoteca/DJ', 'Discothèque/DJ', 'Entertainment'),
    ('Business center', 'Centro de negocios', "Centre d'affaires", 'Zones'),
    ('Green areas', 'Zonas verdes', 'Espaces verts', 'Zones'),
    ('Non-smoking rooms', 'Habitaciones para no fumadores', 'Chambres non-fumeurs', 'Zones'),
    ('Laundry', 'Lavandería', 'Blanchisserie', 'Zones'),
    ('Family rooms', 'Habitaciones familiares', 'Chambres familiales', 'Zones'),
    ('Karaoke', 'Karaoke', 'Karaoké', 'Zones'),
    ('Bingo', 'Bingo', 'Bingo', 'Zones'),
    ('Conference room', 'Sala de conferencias', 'Salle de conférence', 'Zones'),
    ('Kids play area', 'Área de juegos para niños', 'Aire de jeux pour enfants', 'Zones'),

    -- Relax
    ('Sauna', 'Sauna', 'Sauna', 'Relax'),
    ('Spa and wellness center', 'Centro de spa y bienestar', 'Centre de spa et de bien-être', 'Relax'),
    ('Jacuzzi', 'Jacuzzi', 'Jacuzzi', 'Relax'),
    ('Indoor pool', 'Piscina cubierta', 'Piscine intérieure', 'Relax'),
    ('Outdoor pool', 'Piscina al aire libre', 'Piscine extérieure', 'Relax'),
    ('Heated pool', 'Piscina climatizada', 'Piscine chauffée', 'Relax'),
    ('Kids pool', 'Piscina para niños', 'Piscine pour enfants', 'Relax'),
    ('Hot spring bath', 'Baño de aguas termales', 'Bain de sources chaudes', 'Relax'),
    ('Water park', 'Parque acuático', 'Parc aquatique', 'Relax'),
    ('Steam room', 'Baño de vapor', 'Hammam', 'Relax'),

    -- Accessibility
    ('Facilities for disabled guests', 'Instalaciones para personas con discapacidad', 'Installations pour les personnes handicapées', 'Accessibility'),
    ('Wheelchair accessible', 'Accesible para sillas de ruedas', 'Accessible aux fauteuils roulants', 'Accessibility'),
    ('Visual aids: braille', 'Ayudas visuales: braille', 'Aides visuelles : braille', 'Accessibility'),
    ('Visual aids: tactile signs', 'Ayudas visuales: señales táctiles', 'Aides visuelles : signes tactiles', 'Accessibility'),

    -- Services    
    ('Multilingual staff', 'Personal multilingüe', 'Personnel multilingue', 'Services'),
    ('24-hour front desk', 'Recepción 24 horas', 'Réception 24h/24', 'Services'),
    ('Airport shuttle', 'Traslado al aeropuerto', 'Navette aéroport', 'Services'),
    ('Concierge service', 'Servicio de conserjería', 'Service de conciergerie', 'Services'),
    ('Barber/beauty shop', 'Barbería/salón de belleza', 'Salon de coiffure/esthétique', 'Services'),
    ('Tour desk', 'Mostrador de turismo', 'Bureau des excursions', 'Services'),
    ('Luggage storage', 'Almacenamiento de equipaje', 'Consigne à bagages', 'Services'),
    ('Pets allowed', 'Se admiten mascotas', 'Animaux acceptés', 'Services'),
    ('Free Wi-Fi', 'Wi-Fi gratuito', 'Wi-Fi gratuit', 'Services'),
    ('24-hour security', 'Seguridad las 24 horas', 'Sécurité 24 heures sur 24', 'Services'),

    -- Room        
    ('Room service', 'Servicio de habitaciones', 'Service de chambre', 'Room'),
    ('Terrace', 'Terraza', 'Terrasse', 'Room'),
    ('Soundproof rooms', 'Habitaciones insonorizadas', 'Chambres insonorisées', 'Room');


INSERT INTO Lodge (lodge_email, lodge_name, lodge_description, lodge_address, lodge_phone, city, country, available_rooms, price_per_night, check_in, check_out, is_closed, lodge_provider, is_banned, user_id) 
VALUES 
    ('ParisLodge@example.com', 'Paris Lodge', 'Paris Lodge description', '123 Rue de Rivoli, 75001 Paris', '123456789', 'Paris', 'France', 5, 50.00, '14:00', '11:00', 0, 0, 0, 1),
    ('LALodge@example.com', 'Los Angeles Lodge', 'Los Angeles Lodge description', '456 Sunset Blvd, Los Angeles, CA', '123456789', 'Los Angeles', 'United States of America', 10, 110.00, '14:00', '11:00', 0, 0, 0, 1),
    ('LasVegasLodge@example.com', 'Las Vegas Lodge', 'Las Vegas Lodge description', '789 Las Vegas Blvd, Las Vegas, NV', '123456789', 'Las Vegas', 'United States of America', 10, 120.00, '14:00', '11:00', 0, 0, 0, 1),
    ('ManchesterLodge@example.com', 'Manchester Lodge', 'Manchester Lodge description', '101 Deansgate, Manchester', '123456789', 'Manchester', 'United Kingdom', 12, 180.00, '14:00', '11:00', 0, 0, 0, 1),
    ('NaplesLodge@example.com', 'Naples Lodge', 'Naples Lodge description', '202 Via Toledo, Naples', '123456789', 'Naples', 'Italy', 20, 120.00, '14:00', '11:00', 0, 0, 0, 1),
    ('VeniceLodge@example.com', 'Venice Lodge', 'Venice Lodge description', '303 Piazza San Marco, Venice', '123456789', 'Venice', 'Italy', 20, 280.00, '14:00', '11:00', 0, 0, 0, 1),
    ('MarsellaLodge@example.com', 'Marsella Lodge', 'Marsella Lodge description', '404 Rue de la République, Marseille', '123456789', 'Marsella', 'France', 5, 150.00, '14:00', '11:00', 0, 0, 0, 1),
    ('NYLodge@example.com', 'New York Lodge', 'New York Lodge description', '505 5th Ave, New York, NY', '123456789', 'New York', 'United States of America', 10, 100.00, '14:00', '11:00', 0, 0, 0, 1),
    ('MiamiLodge@example.com', 'Miami Lodge', 'Miami Lodge description', '606 Ocean Dr, Miami Beach, FL', '123456789', 'Miami', 'United States of America', 10, 160.00, '14:00', '11:00', 0, 0, 0, 1),
    ('MadridLodge@example.com', 'Madrid Lodge', 'Madrid Lodge description', '707 Gran Vía, Madrid', '123456789', 'Madrid', 'Spain', 3, 200.00, '14:00', '11:00', 0, 0, 0, 1),
    ('MilanLodge@example.com', 'Milan Lodge', 'Milan Lodge description', '808 Via Montenapoleone, Milan', '123456789', 'Milan', 'Italy', 20, 220.00, '14:00', '11:00', 0, 0, 0, 1),
    ('LyonLodge@example.com', 'Lyon Lodge', 'Lyon Lodge description', '909 Rue de la Liberté, Lyon', '123456789', 'Lyon', 'France', 5, 75.00, '14:00', '11:00', 0, 0, 0, 1),
    ('NizaLodge@example.com', 'Niza Lodge', 'Niza Lodge description', '1010 Promenade des Anglais, Nice', '123456789', 'Niza', 'France', 5, 80.00, '14:00', '11:00', 0, 0, 0, 1),
    ('ChicagoLodge@example.com', 'Chicago Lodge', 'Chicago Lodge description', '1111 W Adams St, Chicago, IL', '123456789', 'Chicago', 'United States of America', 10, 150.00, '14:00', '11:00', 0, 0, 0, 1),
    ('LiverpoolLodge@example.com', 'Liverpool Lodge', 'Liverpool Lodge description', '1212 Albert Dock, Liverpool', '123456789', 'Liverpool', 'United Kingdom', 12, 160.00, '14:00', '11:00', 0, 0, 0, 1),
    ('PisaLodge@example.com', 'Pisa Lodge', 'Pisa Lodge description', '1313 Piazza dei Miracoli, Pisa', '123456789', 'Pisa', 'Italy', 20, 130.00, '14:00', '11:00', 0, 0, 0, 1),
    ('SanFranciscoLodge@example.com', 'San Francisco Lodge', 'San Francisco Lodge description', '1414 Lombard St, San Francisco, CA', '123456789', 'San Francisco', 'United States of America', 10, 100.00, '14:00', '11:00', 0, 0, 0, 1),
    ('LondonLodge@example.com', 'London Lodge', 'London Lodge description', '1515 Buckingham Palace Rd, London', '123456789', 'London', 'United Kingdom', 12, 150.00, '14:00', '11:00', 0, 0, 0, 1),
    ('BarcelonaLodge@example.com', 'Barcelona Lodge', 'Barcelona Lodge description', '1616 Passeig de Gràcia, Barcelona', '123456789', 'Barcelona', 'Spain', 15, 190.00, '14:00', '11:00', 0, 0, 0, 1),
    ('BostonLodge@example.com', 'Boston Lodge', 'Boston Lodge description', '1717 Beacon St, Boston, MA', '123456789', 'Boston', 'United States of America', 10, 125.00, '14:00', '11:00', 0, 0, 0, 1),
    ('RomeLodge@example.com', 'Rome Lodge', 'Rome Lodge description', '1818 Via del Corso, Rome', '123456789', 'Rome', 'Italy', 20, 250.00, '14:00', '11:00', 0, 0, 0, 1),
    ('SeattleLodge@example.com', 'Seattle Lodge', 'Seattle Lodge description', '1919 Pike Pl, Seattle, WA', '123456789', 'Seattle', 'United States of America', 10, 145.00, '14:00', '11:00', 0, 0, 0, 1),
    ('FlorenceLodge@example.com', 'Florence Lodge', 'Florence Lodge description', '2020 Piazza della Signoria, Florence', '123456789', 'Florence', 'Italy', 20, 210.00, '14:00', '11:00', 0, 0, 0, 1),
    ('ValenciaLodge@example.com', 'Valencia Lodge', 'Valencia Lodge description', '2121 Avenida de las Cortes Valencianas, Valencia', '123456789', 'Valencia', 'Spain', 15, 215.00, '14:00', '11:00', 0, 0, 0, 1),
    ('BannedLodge@example.com', 'Banned Lodge', 'Banned Lodge description', 'Banned Lodge Address', '123456789', 'Victoria', 'Spain', 15, 215.00, '14:00', '11:00', 0, 0, 1, 1);


INSERT INTO Booking(user_id, lodge_id, check_in, check_out, arrival_time, departure_time, booking_date, total_price, lodge_email, is_reviewed, is_cancelled, is_api)
VALUES
    (2, 1, '14:00', '11:00', '05-12-2022', '12-12-2022', '01-12-2022', 350, 'ParisLodge@example.com', 0, 0, 0),
    (2, 2, '14:00', '11:00', '05-12-2022', '12-12-2022', '01-12-2022', 770, 'LALodge@example.com', 1, 0, 0),
    (2, 10, '14:00', '11:00', '01-01-2025', '31-12-2025', '01-12-2023', 350, 'MadridLodge@example.com', 0, 0, 0),
    (2, 10, '14:00', '11:00', '01-01-2025', '31-12-2025', '01-12-2023', 350, 'MadridLodge@example.com', 0, 0, 0),
    (2, 10, '14:00', '11:00', '01-01-2025', '31-12-2025', '01-12-2023', 350, 'MadridLodge@example.com', 0, 0, 0),

    (2, 19, '14:00', '11:00', '01-01-2013', '10-01-2013', '01-01-2013', 350, 'BarcelonaLodge@example.com', 1, 0, 0),
    (2, 19, '14:00', '11:00', '01-02-2013', '10-02-2013', '02-01-2013', 350, 'BarcelonaLodge@example.com', 1, 0, 0),
    (2, 19, '14:00', '11:00', '01-03-2013', '10-03-2013', '03-01-2013', 350, 'BarcelonaLodge@example.com', 1, 0, 0),
    (2, 19, '14:00', '11:00', '01-04-2013', '10-04-2013', '04-01-2013', 350, 'BarcelonaLodge@example.com', 1, 0, 0),
    (2, 19, '14:00', '11:00', '01-05-2013', '10-05-2013', '05-01-2013', 350, 'BarcelonaLodge@example.com', 1, 0, 0);

INSERT INTO Review(user_id, booking_id, review_lodge_email, review_date, review_text, rating, is_blocked)
VALUES
    (2, 2, 'LALodge@example.com', '13-12-2022', 'Great place to stay', 5, 0),

    (2, 6, 'BarcelonaLodge@example.com', '11-01-2013', 'Great place to stay', 5, 0),
    (2, 7, 'BarcelonaLodge@example.com', '11-01-2013', 'Not really good', 2, 0),
    (2, 8, 'BarcelonaLodge@example.com', '11-01-2013', 'Mala educación de los empleados', 1, 0),
    (2, 9, 'BarcelonaLodge@example.com', '11-01-2013', 'J´ai adoré mon séjour dans cet hébergement', 5, 0),
    (2, 10, 'BarcelonaLodge@example.com', '11-01-2013', 'Average Barcelona hotel', 3, 0);


INSERT INTO Lodge_Feature (lodge_id, feature_id)
VALUES
    -- Paris Lodge
    (1, 1), (1, 5), (1, 10), (1, 15), (1, 20), (1, 25), (1, 30), (1, 35),
    -- Los Angeles Lodge
    (2, 2), (2, 6), (2, 11), (2, 16), (2, 21), (2, 26), (2, 31), (2, 36),
    -- Las Vegas Lodge
    (3, 3), (3, 7), (3, 12), (3, 17), (3, 22), (3, 27), (3, 32), (3, 37),
    -- Manchester Lodge
    (4, 4), (4, 8), (4, 13), (4, 18), (4, 23), (4, 28), (4, 33), (4, 38),
    -- Naples Lodge
    (5, 5), (5, 9), (5, 14), (5, 19), (5, 24), (5, 29), (5, 34), (5, 39),
    -- Venice Lodge
    (6, 6), (6, 10), (6, 15), (6, 20), (6, 25), (6, 30), (6, 35), (6, 40),
    -- Marsella Lodge
    (7, 1), (7, 3), (7, 5), (7, 7), (7, 9), (7, 11), (7, 13), (7, 15),
    -- New York Lodge
    (8, 2), (8, 4), (8, 6), (8, 8), (8, 10), (8, 12), (8, 14), (8, 16),
    -- Miami Lodge
    (9, 3), (9, 5), (9, 7), (9, 9), (9, 11), (9, 13), (9, 15), (9, 17),
    -- Madrid Lodge
    (10, 1), (10, 4), (10, 7), (10, 10), (10, 13), (10, 16), (10, 19), (10, 22),
    -- Milan Lodge
    (11, 2), (11, 5), (11, 8), (11, 11), (11, 14), (11, 17), (11, 20), (11, 23),
    -- Lyon Lodge
    (12, 1), (12, 3), (12, 5), (12, 8), (12, 11), (12, 14), (12, 17), (12, 19),
    -- Niza Lodge
    (13, 2), (13, 4), (13, 6), (13, 8), (13, 10), (13, 12), (13, 14), (13, 59),
    -- Chicago Lodge
    (14, 1), (14, 3), (14, 5), (14, 8), (14, 10), (14, 12), (14, 14), (14, 17),
    -- Liverpool Lodge
    (15, 2), (15, 4), (15, 6), (15, 8), (15, 11), (15, 13), (15, 15), (15, 19),
    -- Pisa Lodge
    (16, 1), (16, 3), (16, 5), (16, 7), (16, 9), (16, 11), (16, 13), (16, 15),
    -- San Francisco Lodge
    (17, 2), (17, 4), (17, 6), (17, 8), (17, 10), (17, 12), (17, 14), (17, 63),
    -- London Lodge
    (18, 1), (18, 3), (18, 5), (18, 7), (18, 9), (18, 11), (18, 13), (18, 15),
    -- Barcelona Lodge
    (19, 2), (19, 4), (19, 6), (19, 8), (19, 10), (19, 12), (19, 14), (19, 16),
    -- Boston Lodge
    (20, 1), (20, 3), (20, 5), (20, 7), (20, 9), (20, 11), (20, 13), (20, 15),
    -- Rome Lodge
    (21, 2), (21, 4), (21, 6), (21, 8), (21, 10), (21, 12), (21, 14), (21, 61),
    -- Seattle Lodge
    (22, 1), (22, 3), (22, 5), (22, 7), (22, 9), (22, 11), (22, 13), (22, 15),
    -- Florence Lodge
    (23, 1), (23, 3), (23, 5), (23, 7), (23, 9), (23, 11), (23, 13), (23, 15),
    (23, 17), (23, 19), (23, 21), (23, 23), (23, 25), (23, 27), (23, 29), (23, 31),
    (23, 33), (23, 35), (23, 37), (23, 39), (23, 41), (23, 43), (23, 45), (23, 47),
    (23, 49), (23, 51), (23, 53), (23, 55), (23, 57), (23, 59), (23, 61), (23, 63),
    (23, 2), (23, 4), (23, 6), (23, 8), (23, 10), (23, 12), (23, 14), (23, 16),
    (23, 18), (23, 20), (23, 22), (23, 24), (23, 26), (23, 28), (23, 30), (23, 32),
    (23, 34), (23, 36), (23, 38), (23, 40), (23, 42), (23, 44), (23, 46), (23, 48),
    (23, 50), (23, 52), (23, 54), (23, 56), (23, 58), (23, 60), (23, 62),

    -- Valencia Lodge
    (24, 1), (24, 3), (24, 5), (24, 7), (24, 9), (24, 11), (24, 13), (24, 15),
    -- Banned Lodge
    (25, 2), (25, 4), (25, 6), (25, 8), (25, 10), (25, 12), (25, 14), (25, 62);



INSERT INTO Lodge_Image (image_url, lodge_id)
VALUES
    ('ParisLodge@example.com_ParisLodge.jpg', 1),
    ('LALodge@example.com_LALodge.jpg', 2),
    ('LasVegasLodge@example.com_LasVegasLodge.jpg', 3),
    ('ManchesterLodge@example.com_ManchesterLodge.jpg', 4),
    ('NaplesLodge@example.com_NaplesLodge.jpg', 5),
    ('VeniceLodge@example.com_VeniceLodge.jpg', 6),
    ('MarsellaLodge@example.com_MarsellaLodge.jpg', 7),
    ('NYLodge@example.com_NYLodge.jpg', 8),
    ('MiamiLodge@example.com_MiamiLodge.jpg', 9),
    ('MadridLodge@example.com_MadridLodge.jpg', 10),
    ('MilanLodge@example.com_MilanLodge.jpg', 11),
    ('LyonLodge@example.com_LyonLodge.jpg', 12),
    ('NizaLodge@example.com_NizaLodge.jpg', 13),
    ('ChicagoLodge@example.com_ChicagoLodge.jpg', 14),
    ('LiverpoolLodge@example.com_LiverpoolLodge.jpg', 15),
    ('PisaLodge@example.com_PisaLodge.jpg', 16),
    ('SanFranciscoLodge@example.com_SanFranciscoLodge.jpg', 17),
    ('LondonLodge@example.com_LondonLodge.jpg', 18),
    ('BarcelonaLodge@example.com_BarcelonaLodge.jpg', 19),
    ('BostonLodge@example.com_BostonLodge.jpg', 20),
    ('RomeLodge@example.com_RomeLodge.jpg', 21),
    ('SeattleLodge@example.com_SeattleLodge.jpg', 22),
    ('FlorenceLodge@example.com_FlorenceLodge.jpg', 23),
    ('ValenciaLodge@example.com_ValenciaLodge.jpg', 24),

    ('Hab6.jpg', 1),
    ('Hab1.jpg', 1),
    ('Hab1.jpg', 2),
    ('Hab10.jpg', 2),
    ('Hab6.jpg', 3),
    ('Hab3.jpg', 4),
    ('Hab2.jpg', 4),
    ('Hab6.jpg', 4),
    ('Hab4.jpg', 5),
    ('Hab6.jpg', 5),
    ('Hab7.jpg', 5),
    ('Hab2.jpg', 6),
    ('Hab1.jpg', 6),
    ('Hab4.jpg', 6),
    ('Hab4.jpg', 7),
    ('Hab7.jpg', 7),
    ('Hab6.jpg', 7),
    ('Hab6.jpg', 8),
    ('Hab1.jpg', 8),
    ('Hab8.jpg', 9),
    ('Hab7.jpg', 9),
    ('Hab1.jpg', 10),
    ('Hab1.jpg', 11),
    ('Hab9.jpg', 11),
    ('Hab5.jpg', 11),
    ('Hab1.jpg', 12),
    ('Hab6.jpg', 13),
    ('Hab8.jpg', 14),
    ('Hab5.jpg', 14),
    ('Hab6.jpg', 14),
    ('Hab4.jpg', 15),
    ('Hab7.jpg', 15),
    ('Hab8.jpg', 15),
    ('Hab1.jpg', 16),
    ('Hab5.jpg', 16),
    ('Hab10.jpg', 17),
    ('Hab10.jpg', 18),
    ('Hab2.jpg', 18),
    ('Hab7.jpg', 18),
    ('Hab4.jpg', 19),
    ('Hab8.jpg', 20),
    ('Hab1.jpg', 20),
    ('Hab6.jpg', 20),
    ('Hab3.jpg', 21),
    ('Hab9.jpg', 22),
    ('Hab5.jpg', 22),
    ('Hab2.jpg', 22),
    ('Hab4.jpg', 23),
    ('Hab3.jpg', 23),
    ('Hab5.jpg', 24),
    ('Hab2.jpg', 24),
    ('Hab4.jpg', 24),
    ('Hab3.jpg', 24)
;