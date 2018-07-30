DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothes", 45.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "bath", 5.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "sports", 150.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothes", 10.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hat", "clothes", 8.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("towel", "bath", 12.00, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bat", "sports", 25.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soap", "bath", 6.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ball", "sports", 5.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothes", 35.50, 50);