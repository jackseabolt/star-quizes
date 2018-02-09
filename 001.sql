BEGIN; 

CREATE TYPE genres AS ENUM (
    'Fiction', 'Non-Fiction', 'Biography', 'Fantasy', 'Mystery'
); 

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, 
    genre genres
); 

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL, 
    article_id INTEGER REFERENCES articles ON DELETE CASCADE NOT NULL
); 

INSERT INTO articles (title, genre) VALUES ('The Lord of the Rings', 'Fantasy');
INSERT INTO articles (title, genre) VALUES ('Return of the Kind', 'Fantasy');
INSERT INTO comments (content, article_id) VALUES ('This book was pretty good', '1');



COMMIT; 