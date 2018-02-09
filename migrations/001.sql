BEGIN; 

CREATE TYPE genres AS ENUM (
    'Fiction', 'Non-Fiction', 'Biography', 'Fantasy', 'Mystery'
); 

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, 
    genre genres
); 

INSERT INTO articles (title, genre) VALUES ('The Lord of the Rings', 'Fantasy');

COMMIT; 