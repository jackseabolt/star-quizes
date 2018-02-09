BEGIN;  

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
); 

CREATE TABLE siblings (
    member_one_id REFERENCES members ON DELETE CASCADE, 
    member_two_id INT REFERENCES members ON DELETE CASCADE
    PRIMARY KEY (member_one_id, member_two_id)
); 

INSERT INTO members (first_name, last_name) VALUES ('Jack', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Will', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Alden', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Garrett', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Graham', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Nora', 'Seabolt');
INSERT INTO members (first_name, last_name) VALUES ('Kelsey', 'Seabolt');

COMMIT; 