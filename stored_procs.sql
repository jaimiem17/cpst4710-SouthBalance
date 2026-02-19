/* South Balance AAFES MVP
   Starter Stored Procedures (Mod 4)
   Database: south_balance_aafes_mvp */

USE south_balance_aafes_mvp;

-- Create User

DELIMITER $$

CREATE PROCEDURE sp_create_user (
    IN p_username VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_role VARCHAR(50)
)
BEGIN
    INSERT INTO user_account (
        account_id,
        username,
        password_hash,
        role,
        is_active,
        created_at
    )
    VALUES (
        UUID(),
        p_username,
        p_password_hash,
        p_role,
        TRUE,
        CURRENT_TIMESTAMP
    );
END$$

DELIMITER ;


-- Create Product

DELIMITER $$

CREATE PROCEDURE sp_create_product (
    IN p_product_name VARCHAR(200),
    IN p_base_cost DECIMAL(10,2)
)
BEGIN
    INSERT INTO product_item (
        product_id,
        product_name,
        base_cost,
        is_active
    )
    VALUES (
        UUID(),
        p_product_name,
        p_base_cost,
        TRUE
    );
END$$

DELIMITER ;


-- Adjust Inventory

DELIMITER $$

CREATE PROCEDURE sp_adjust_inventory (
    IN p_stock_id CHAR(36),
    IN p_quantity_change INT
)
BEGIN
    UPDATE inventory_stock
    SET quantity_available = quantity_available + p_quantity_change
    WHERE stock_id = p_stock_id
      AND (quantity_available + p_quantity_change) >= 0;

    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Inventory adjustment failed (insufficient stock or invalid stock_id)';
    END IF;
END$$

DELIMITER ;


-- Create Order Header

DELIMITER $$

CREATE PROCEDURE sp_create_order (
    IN p_account_id CHAR(36),
    IN p_dc_id CHAR(36),
    IN p_contact_email VARCHAR(200),
    IN p_status VARCHAR(50)
)
BEGIN
    INSERT INTO order_header (
        order_id,
        account_id,
        dc_id,
        order_date,
        status,
        contact_email,
        total_cost
    )
    VALUES (
        UUID(),
        p_account_id,
        p_dc_id,
        CURRENT_TIMESTAMP,
        p_status,
        p_contact_email,
        0.00
    );
END$$

DELIMITER ;


-- Update Order Status

DELIMITER $$

CREATE PROCEDURE sp_update_order_status (
    IN p_order_id CHAR(36),
    IN p_status VARCHAR(50)
)
BEGIN
    UPDATE order_header
    SET status = p_status
    WHERE order_id = p_order_id;
END$$

DELIMITER ;



-- Get Order

DELIMITER $$

CREATE PROCEDURE sp_get_order (
    IN p_order_id CHAR(36)
)
BEGIN
    SELECT *
    FROM order_header
    WHERE order_id = p_order_id;

    SELECT *
    FROM order_item
    WHERE order_id = p_order_id;
END$$

DELIMITER ;
