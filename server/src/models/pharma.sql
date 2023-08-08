

-- Create the "pharmacie" table without the foreign key constraint
CREATE TABLE pharmacie (
    pharmacie_id INT AUTO_INCREMENT PRIMARY KEY,
    id_owner INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20)
);
-- Create the "users" table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    idpharmacie INT,
    isarchived BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (idpharmacie) REFERENCES pharmacie (pharmacie_id)
);



-- Create the "medicament" table
CREATE TABLE medicament (
    medicament_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    manufacturer VARCHAR(100),
    dosage VARCHAR(50)
);

-- Create the "stock" table
CREATE TABLE stock (
    pharmacie_id INT NOT NULL,
    medicament_id INT NOT NULL,
    stock_date TIMESTAMP NOT NULL,
    quantity INT NOT NULL,
    expiration_date DATE NOT NULL,
    PRIMARY KEY (pharmacie_id, medicament_id, stock_date),
    FOREIGN KEY (pharmacie_id) REFERENCES pharmacie (pharmacie_id),
    FOREIGN KEY (medicament_id) REFERENCES medicament (medicament_id)
);


ALTER TABLE pharmacie
ADD FOREIGN KEY (id_owner) REFERENCES users (user_id);
