DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_summaries;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY
);

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username CHAR NOT NULL
);

CREATE TABLE reviews (
    review_id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES products (product_id),
    username CHAR,
    review_heading CHAR, 
    review_text CHAR,
    review_rating INTEGER NOT NULL,
    date_created CHAR
);

CREATE TABLE review_summaries (
    summary_id INTEGER PRIMARY KEY,
    product_id INTEGER REFERENCES products (product_id),
    rating_1 INTEGER CHECK (rating_1 >= 0 AND rating_1 <= 5),
    rating_2 INTEGER CHECK (rating_2 >= 0 AND rating_2 <= 5),
    rating_3 INTEGER CHECK (rating_3 >= 0 AND rating_3 <= 5), 
    rating_4 INTEGER CHECK (rating_4 >= 0 AND rating_4 <= 5),
    rating_5 INTEGER CHECK (rating_5 >= 0 AND rating_5 <= 5),
    rating_quantity INTEGER
);
