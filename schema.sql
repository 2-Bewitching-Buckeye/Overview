DROP DATABASE IF EXISTS product;

CREATE DATABASE product;

\c product;

CREATE TABLE products (
  product_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(200),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price FLOAT NOT NULL
);

CREATE TABLE styles (
  style_id INT NOT NULL PRIMARY KEY,
  product_id INT,
  name VARCHAR(50) NOT NULL,
  sale_price FLOAT,
  original_price FLOAT NOT NULL,
  default_style BOOL NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE features (
  feature_id SERIAL NOT NULL PRIMARY KEY,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50)
);

CREATE TABLE products_features (
  product_id INT NOT NULL,
  feature_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
  FOREIGN KEY (feature_id) REFERENCES features(feature_id) ON DELETE CASCADE
);

CREATE TABLE photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  style_id INT,
  image_url VARCHAR(400) NOT NULL,
  thumbnail_url VARCHAR(400) NOT NULL,
  FOREIGN KEY (style_id) REFERENCES styles(style_id) ON DELETE CASCADE
);

CREATE TABLE skus (
  skus_id  SERIAL NOT NULL PRIMARY KEY,
  style_id INT,
  size VARCHAR(10) NOT NULL,
  quantity INT DEFAULT 0,
  FOREIGN KEY (style_id) REFERENCES styles(style_id) ON DELETE CASCADE
);

-- DROP DATABASE IF EXISTS product;

-- CREATE DATABASE product;

-- USE product;

-- CREATE TABLE products (
--   product_id INT NOT NULL PRIMARY KEY,
--   name VARCHAR(50) NOT NULL,
--   slogan VARCHAR(100),
--   description VARCHAR(500),
--   category VARCHAR(50),
--   default_price FLOAT NOT NULL
-- );

-- CREATE TABLE styles (
--   style_id INT NOT NULL PRIMARY KEY,
--   product_id INT,
--   name VARCHAR(20) NOT NULL,
--   sale_price FLOAT,
--   original_price FLOAT NOT NULL,
--   default_style BOOL NOT NULL,
--   FOREIGN KEY (product_id) REFERENCES products(product_id)
-- );

-- CREATE TABLE features (
--   feature_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   feature VARCHAR(50) NOT NULL,
--   value VARCHAR(50)
-- );

-- CREATE TABLE products_features (
--   product_id INT NOT NULL,
--   feature_id INT NOT NULL,
--   FOREIGN KEY (product_id) REFERENCES products(product_id),
--   FOREIGN KEY (feature_id) REFERENCES features(feature_id)
-- );

-- CREATE TABLE photos (
--   photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   style_id INT,
--   image_url VARCHAR(100) NOT NULL,
--   thumbnail_url VARCHAR(100) NOT NULL,
--   FOREIGN KEY (style_id) REFERENCES styles(style_id)
-- );

-- CREATE TABLE skus (
--   skus_id  INT NOT NULL PRIMARY KEY,
--   quantity INT NOT NULL,
--   size VARCHAR(3) NOT NULL,
--   style_id INT,
--   FOREIGN KEY (style_id) REFERENCES styles(style_id)
-- );