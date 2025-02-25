USE nutrition_db;

INSERT INTO food (name, calories, proteins, carbs, fats, fiber) VALUES
-- Fruits
('Pomme', 52, 0.3, 14, 0.2, 2.4),
('Banane', 89, 1.1, 23, 0.3, 2.6),
('Orange', 47, 0.9, 12, 0.1, 2.4),

-- Légumes
('Carotte', 41, 0.9, 10, 0.2, 2.8),
('Brocoli', 34, 2.8, 7, 0.4, 2.6),
('Pomme de terre', 77, 2, 17, 0.1, 2.2),

-- Protéines
('Poulet (blanc)', 165, 31, 0, 3.6, 0),
('Saumon', 208, 22, 0, 13, 0),
('Oeuf', 155, 13, 1.1, 11, 0),

-- Céréales et légumineuses
('Riz blanc cuit', 130, 2.7, 28, 0.3, 0.4),
('Lentilles cuites', 116, 9, 20, 0.4, 7.9),
('Quinoa cuit', 120, 4.4, 21.3, 1.9, 2.8),

-- Produits laitiers
('Yaourt nature', 59, 3.8, 4.7, 3.3, 0),
('Fromage cheddar', 402, 25, 1.3, 33, 0),
('Lait demi-écrémé', 47, 3.3, 4.8, 1.5, 0); 