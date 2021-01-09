DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_summaries;

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INTEGER,
    username VARCHAR(20),
    review_heading VARCHAR(20),
    review_text VARCHAR(2000),
    review_rating SMALLINT DEFAULT 0,
    created_at VARCHAR(30)
);
