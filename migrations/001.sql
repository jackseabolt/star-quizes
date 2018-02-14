BEGIN;  

CREATE TABLE quizes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, 
    image TEXT NOT NULL
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

INSERT INTO quizes (title, image) VALUES ('Mercury', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/1200px-Mercury_in_color_-_Prockter07-edit1.jpg');
INSERT INTO quizes (title, image) VALUES ('Venus', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg');
INSERT INTO quizes (title, image) VALUES ('Earth', 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg');
INSERT INTO quizes (title, image) VALUES ('Mars', 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg');
INSERT INTO quizes (title, image) VALUES ('Jupiter', 'http://cdn.sci-news.com/images/enlarge3/image_4461e-Jupiter.jpg');
INSERT INTO quizes (title, image) VALUES ('Saturn', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1200px-Saturn_during_Equinox.jpg');
INSERT INTO quizes (title, image) VALUES ('Uranus', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg');
INSERT INTO quizes (title, image) VALUES ('Neptune', 'https://img.purch.com/h/1000/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAwMC8xMjIvb3JpZ2luYWwvMDcwOTE4X25lcHR1bmVfMDIuanBn');
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Venus?', 'A moon', 'A star', 'A planet', 'An asteroid', 'A planet', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Venus is the ___ closest planet to the Sun', 'first', 'second', 'third', 'fourth', 'second', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The atmosphere of Venus is 96.5% ___', 'nitrogen', 'helium', 'carbon dioxide', 'oxygen', 'carbon dioxide', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How many Earth days does it take Venus to orbit around the Sun?', ' 224.7 days', '53.4 days', '461.1 days', '40.5 days', '224.7 days', 2);


COMMIT; 