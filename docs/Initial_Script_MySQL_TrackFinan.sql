CREATE DATABASE TrackFinan_DB;
USE TrackFinan_DB;
     
-- Tables:

CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE account_type(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE transaction_type(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE category(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    transaction_type_id INT NOT NULL,
    
    INDEX (user_id),
    
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(id) ON DELETE RESTRICT,
    
    UNIQUE(user_id, name)
);


CREATE TABLE payment_method(
	
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
    
    UNIQUE(user_id, name)
    
);


CREATE TABLE account(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
	name VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX (user_id),
    
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
    FOREIGN KEY (type_id) REFERENCES account_type(id) ON DELETE RESTRICT
);


CREATE TABLE transactions(
	id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    category_id INT NOT NULL,
    payment_method_id INT NOT NULL,
	amount DECIMAL(10,2) NOT NULL,
	description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (amount > 0),
    
    INDEX (account_id),
    INDEX (category_id),
    INDEX (payment_method_id),
    
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT,
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(id) ON DELETE RESTRICT
);


CREATE TABLE budget(

	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
	amount DECIMAL(10,2) NOT NULL,
    month TINYINT NOT NULL,
    year SMALLINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (month BETWEEN 1 AND 12),
    CHECK (amount > 0),
    
    INDEX (user_id),
    INDEX (category_id),
    
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT,
    
    UNIQUE (user_id, category_id, month, year)
);


-- Triggers:

-- Trigger AFTER INSERT
DELIMITER $$

CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN

    DECLARE t_type VARCHAR(50);

    -- Obtener tipo de transacción (income / expense)
    SELECT tt.name INTO t_type
    FROM category c
    JOIN transaction_type tt ON c.transaction_type_id = tt.id
    WHERE c.id = NEW.category_id;

    -- Aplicar lógica al balance
    IF t_type = 'income' THEN
        UPDATE account
        SET balance = balance + NEW.amount
        WHERE id = NEW.account_id;

    ELSEIF t_type = 'expense' THEN
        UPDATE account
        SET balance = balance - NEW.amount
        WHERE id = NEW.account_id;

    END IF;

END$$

DELIMITER ;

-- Trigger AFTER DELETE
DELIMITER $$

CREATE TRIGGER after_transaction_delete
AFTER DELETE ON transactions
FOR EACH ROW
BEGIN

    DECLARE t_type VARCHAR(50);

    SELECT tt.name INTO t_type
    FROM category c
    JOIN transaction_type tt ON c.transaction_type_id = tt.id
    WHERE c.id = OLD.category_id;

    IF t_type = 'income' THEN
        UPDATE account
        SET balance = balance - OLD.amount
        WHERE id = OLD.account_id;

    ELSEIF t_type = 'expense' THEN
        UPDATE account
        SET balance = balance + OLD.amount
        WHERE id = OLD.account_id;

    END IF;

END$$

DELIMITER ;


-- Trigger UPDATE:
DELIMITER $$

CREATE TRIGGER after_transaction_update
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN

    DECLARE old_type VARCHAR(50);
    DECLARE new_type VARCHAR(50);

    -- Obtener tipo anterior
    SELECT tt.name INTO old_type
    FROM category c
    JOIN transaction_type tt ON c.transaction_type_id = tt.id
    WHERE c.id = OLD.category_id;

    -- Obtener tipo nuevo
    SELECT tt.name INTO new_type
    FROM category c
    JOIN transaction_type tt ON c.transaction_type_id = tt.id
    WHERE c.id = NEW.category_id;

    --  1. Revertir efecto anterior
    IF old_type = 'income' THEN
        UPDATE account
        SET balance = balance - OLD.amount
        WHERE id = OLD.account_id;

    ELSEIF old_type = 'expense' THEN
        UPDATE account
        SET balance = balance + OLD.amount
        WHERE id = OLD.account_id;
    END IF;

    --  2. Aplicar efecto nuevo
    IF new_type = 'income' THEN
        UPDATE account
        SET balance = balance + NEW.amount
        WHERE id = NEW.account_id;

    ELSEIF new_type = 'expense' THEN
        UPDATE account
        SET balance = balance - NEW.amount
        WHERE id = NEW.account_id;
    END IF;

END$$

DELIMITER ;


-- Table Catalog:

INSERT INTO account_type (name) VALUES ('cash'), ('bank'), ('credit_card');
INSERT INTO transaction_type (name) VALUES ('income'), ('expense');