INSERT INTO users (id, name, email, created_at) VALUES
(1, 'John Doe', 'john.doe@example.com', NOW()),
(2, 'Jane Smith', 'jane.smith@example.com', NOW());

INSERT INTO routes (id, start_location, end_location, distance, duration, eco_friendly, created_at) VALUES
(1, 'Location A', 'Location B', 10.5, 15, TRUE, NOW()),
(2, 'Location C', 'Location D', 5.0, 8, FALSE, NOW());

INSERT INTO poi (id, name, type, location, created_at) VALUES
(1, 'Coffee Shop', 'Café', 'Location A', NOW()),
(2, 'Park', 'Recreation', 'Location B', NOW()),
(3, 'Museum', 'Cultural', 'Location C', NOW());