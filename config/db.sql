-- Active: 1755252362274@@127.0.0.1@3306@power_tools
CREATE DATABASE power_tools;

USE power_tools;

SELECT DATABASE();

-- Admin table
CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    is_creator BOOLEAN NOT NULL
);

-- Tool table
CREATE TABLE tool (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tool_price DECIMAL(8,2) NOT NULL
);

-- User table
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role ENUM('client', 'owner') NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- District table
CREATE TABLE district (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Shop table
CREATE TABLE shop (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id BIGINT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    district_id BIGINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user(id),
    FOREIGN KEY (district_id) REFERENCES district(id)
);

-- Shop_Tool table (many-to-many: shop <-> tool)
CREATE TABLE shop_tool (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shop_id BIGINT NOT NULL,
    tool_id BIGINT NOT NULL,
    rent_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shop(id),
    FOREIGN KEY (tool_id) REFERENCES tool(id)
);

-- Order table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT NOT NULL,
    shop_tool_id BIGINT NOT NULL,
    order_date DATE NOT NULL,
    period BIGINT NOT NULL,
    total_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES user(id),
    FOREIGN KEY (shop_tool_id) REFERENCES shop_tool(id)
);
CREATE PROCEDURE getShopByDistrict(IN dname VARCHAR(50))
BEGIN
  SELECT 
    d.name AS district_name,
    s.name AS shop_name
  FROM 
    district d
  LEFT JOIN 
    shop s ON s.district_id = d.id
  WHERE 
    d.name LIKE CONCAT('%', dname, '%');
END

CALL `getShopByDistrict`('sergeli')

CREATE PROCEDURE getShopByOwner(IN ownerName VARCHAR(50))
BEGIN
  SELECT 
    u.name AS owner_name,
    s.name AS shop_name,
    d.name AS district_name
  FROM 
    user u
  LEFT JOIN 
    shop s ON s.owner_id = u.id
  LEFT JOIN 
    district d ON s.district_id = d.id
  WHERE 
    u.name LIKE CONCAT('%', ownerName, '%');
END

CALL getShopByOwner('Ali');

CREATE PROCEDURE getShopsByTool(IN toolName VARCHAR(255))
BEGIN
  SELECT 
    t.name AS tool_name,
    s.name AS shop_name,
    s.address,
    d.name AS district_name
  FROM tool t
  LEFT JOIN shop_tool st ON st.tool_id = t.id
  LEFT JOIN shop s ON st.shop_id = s.id
  LEFT JOIN district d ON s.district_id = d.id
  WHERE t.name LIKE CONCAT('%', toolName, '%');
END;

CALL `getShopsByTool`('drill machine')

CREATE PROCEDURE getClientsByRentPrice(IN maxPrice DECIMAL(8,2))
BEGIN
  SELECT 
    u.name AS client_name,
    u.phone_number,
    t.name AS tool_name,
    st.rent_price,
    o.order_date
  FROM user u
  LEFT JOIN orders o ON o.client_id = u.id
  LEFT JOIN shop_tool st ON o.shop_tool_id = st.id
  LEFT JOIN tool t ON st.tool_id = t.id
  WHERE st.rent_price < maxPrice 
    AND u.role = 'client';
END;

CALL `getClientsByRentPrice`('300')

CREATE PROCEDURE getClientsByDistrictDateTool(
  IN districtName VARCHAR(255),
  IN startDate DATE,
  IN endDate DATE,
  IN toolName VARCHAR(255)
)
BEGIN
  SELECT 
    u.name AS client_name,
    u.phone_number,
    t.name AS tool_name,
    s.name AS shop_name,
    d.name AS district_name,
    o.order_date,
    o.period,
    o.total_price
  FROM user u
  LEFT JOIN orders o ON o.client_id = u.id
  LEFT JOIN shop_tool st ON o.shop_tool_id = st.id
  LEFT JOIN tool t ON st.tool_id = t.id
  LEFT JOIN shop s ON st.shop_id = s.id
  LEFT JOIN district d ON s.district_id = d.id
  WHERE d.name LIKE CONCAT('%', districtName, '%')
    AND t.name LIKE CONCAT('%', toolName, '%')
    AND o.order_date BETWEEN startDate AND endDate;
END;

CALL `getClientsByDistrictDateTool`('yakkasaroy', '2025-01-01', '2025-08-31', 'Drill')
