DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_summaries;

CREATE TABLE reviews (
    review_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    username VARCHAR(20),
    review_heading VARCHAR(20), 
    review_text VARCHAR(2000),
    review_rating SMALLINT DEFAULT 0
);

CREATE TABLE review_summaries (
    summary_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    rating_1 INTEGER DEFAULT 0,
    rating_2 INTEGER DEFAULT 0,
    rating_3 INTEGER DEFAULT 0, 
    rating_4 INTEGER DEFAULT 0,
    rating_5 INTEGER DEFAULT 0,
    rating_quantity INTEGER DEFAULT 0
);
