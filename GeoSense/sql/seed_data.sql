INSERT INTO users (id, name, email, created_at) VALUES
(1, 'John Doe', 'john.doe@example.com', NOW()),
(2, 'Jane Smith', 'jane.smith@example.com', NOW()),
(3, 'Alice Johnson', 'alice.johnson@example.com', NOW());

INSERT INTO routes (id, user_id, start_location, end_location, route_type, created_at) VALUES
(1, 1, 'Point A', 'Point B', 'fastest', NOW()),
(2, 1, 'Point A', 'Point C', 'cheapest', NOW()),
(3, 2, 'Point B', 'Point D', 'eco-friendly', NOW());

INSERT INTO points_of_interest (id, name, location, category, created_at) VALUES
(1, 'Central Park', '40.785091,-73.968285', 'Park', NOW()),
(2, 'Statue of Liberty', '40.689247,-74.044502', 'Monument', NOW()),
(3, 'Metropolitan Museum of Art', '40.779437,-73.963244', 'Museum', NOW());

INSERT INTO traffic_data (id, route_id, timestamp, congestion_level, created_at) VALUES
(1, 1, '2023-10-01 08:00:00', 'high', NOW()),
(2, 2, '2023-10-01 08:00:00', 'medium', NOW()),
(3, 3, '2023-10-01 08:00:00', 'low', NOW());