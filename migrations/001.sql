BEGIN;  

CREATE TABLE quizes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
); 

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    current INTEGER NOT NULL,
    quiz_id INTEGER REFERENCES quizes ON DELETE CASCADE NOT NULL
); 

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer_one TEXT,  
    answer_two TEXT, 
    answer_three TEXT, 
    answer_four TEXT, 
    correct_answer TEXT NOT NULL, 
    quiz_id INTEGER REFERENCES quizes ON DELETE CASCADE NOT NULL
); 

INSERT INTO quizes (title) VALUES ('Mercury');
INSERT INTO quizes (title) VALUES ('Venus');
INSERT INTO quizes (title) VALUES ('Earth');
INSERT INTO quizes (title) VALUES ('Mars');
INSERT INTO quizes (title) VALUES ('Jupiter');
INSERT INTO quizes (title) VALUES ('Saturn');
INSERT INTO quizes (title) VALUES ('Uranus');
INSERT INTO quizes (title) VALUES ('Neptune');
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Venues', 'A moon', 'A star', 'A planet', 'An asteroid', 'A planet', 1);

COMMIT; 