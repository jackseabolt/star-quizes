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

INSERT INTO quizes (title, image) VALUES ('Mercury', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804359/Mercury_jjonkm.jpg');
INSERT INTO quizes (title, image) VALUES ('Venus', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804423/Venus_rzk4oc.jpg');
INSERT INTO quizes (title, image) VALUES ('Earth', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804477/Earth_qrvt7j.jpg');
INSERT INTO quizes (title, image) VALUES ('Mars', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804518/Mars_rtmsbg.jpg');
INSERT INTO quizes (title, image) VALUES ('Jupiter', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804564/jupiter_bjwccg.jpg');
INSERT INTO quizes (title, image) VALUES ('Saturn', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804757/Sat_sbx54u.jpg');
INSERT INTO quizes (title, image) VALUES ('Uranus', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804796/Uranus_kphmne.jpg');
INSERT INTO quizes (title, image) VALUES ('Neptune', 'http://res.cloudinary.com/dkksqcvlg/image/upload/v1518804926/Screen_Shot_2018-02-16_at_10.15.01_AM_rcqhge.png');


INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Mercury?', 'A moon', 'A star', 'A planet', 'An asteroid', 'A planet', 1);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How hot is it on Mercury at night?', '801 Fahrenheit', '204 Fahrenheit', '560 Fahrenheit', '125 Fahrenheit', '801 Fahrenheit', 1);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The atmosphere of Mercury is 42% ___', 'nitrogen', 'helium', 'carbon dioxide', 'oxygen', 'oxygen', 1);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How many Earth days does it take Mercury to orbit around the Sun?', '224.7 days', '53.4 days', '116 days', '40.5 days', '116 days', 1);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What was the name of the first spacecraft to visit Mercury?', 'Mariner 10', 'Apollo 15', 'MESSENGER', 'Callisto', 'Mariner 10', 1);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Venus?', 'A moon', 'A star', 'A planet', 'An asteroid', 'A planet', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Venus is the ___ closest planet to the Sun', 'second', 'third', 'fourth', 'firth', 'second', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The atmosphere of Venus is 96.5% ___', 'nitrogen', 'helium', 'carbon dioxide', 'oxygen', 'carbon dioxide', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How many Earth days does it take Venus to orbit around the Sun?', '224.7 days', '53.4 days', '461.1 days', '40.5 days', '224.7 days', 2);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The surface of Venus is primarily covered in ___', 'Acid', 'Water', 'Ice', 'Rock', 'Rock', 2);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Where is Earth?', 'The Milky Way', 'Local Group', 'Laniakea Supercluster', 'All of the above', 'All of the above', 3);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Earth is the ___ closest planet to the Sun', 'second', 'third', 'fourth', 'firth', 'third', 3);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The atmosphere of Earth is 78% ___', 'nitrogen', 'helium', 'carbon dioxide', 'oxygen', 'nitrogen', 3);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How many days does it take Earth to orbit around the Sun?', '365 days', '53.4 days', '461.1 days', '40.5 days', '365 days', 3);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('When did the first spacecraft leave Earth?', '1947', '1964', '1961', '1957', '1957', 3);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Mars?', 'A moon', 'A star', 'A planet', 'An asteroid', 'A planet', 4);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Mars is the ___ closest planet to the Sun', 'second', 'third', 'fourth', 'firth', 'fourth', 4);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('The atmosphere of Mars is 95% ___', 'nitrogen', 'helium', 'carbon dioxide', 'oxygen', 'carbon dioxide', 4);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How many Earth days does it take Mars to orbit around the Sun?', '687 days', '53 days', '461 days', '400 days', '687 days', 4);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('When did the first spacecraft reach Mars?', '1967', '1976', '1971', '1987', '1976', 4);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Jupiter?', 'A quasar', 'A star', 'A brown dwaf', 'A gas giant', 'A gas giant', 5);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Jupiter is the ___ closest planet to the Sun', 'second', 'third', 'fourth', 'fifth', 'fifth', 5);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Jupiter is 90% ___', 'hydrogen', 'helium', 'carbon dioxide', 'oxygen', 'hydrogen', 5);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How long does it take Jupiter to orbit around the Sun?', '983 days', '12 years', '3 years', '402 days', '12 years', 5);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What was the first spacecraft reach Jupiter?', 'Apollo 12', 'Voyager', 'Pioneer', 'Mercury 2', 'Pioneer', 5);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Saturn?', 'A quasar', 'A gas giant', 'A brown dwaf', 'A black hole', 'A gas giant', 6);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Saturn is the ___ closest planet to the Sun', 'fourth', 'fifth', 'sixth', 'seventh', 'sixth', 6);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Saturn is famous for having ___', 'asteroids', 'rings', 'volcanoes', 'water', 'rings', 6);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How long does it take Saturn to orbit around the Sun?', '29 years', '12 years', '3 years', '8 days', '29 years', 6);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('When did the first spacecraft fly past Saturn?', '1979', '1974', '1982', '1989', '1979', 6);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Uranus?', 'A galaxy', 'A gas giant', 'A brown dwaf', 'A rocky planet', 'A gas giant', 7);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Uranus is the ___ closest planet to the Sun', 'fifth', 'sixth', 'seventh', 'eighth', 'seventh', 7);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Uranus was first discovered in ___', '1975', '1781', '1981', '1954', '1781', 7);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How long does it take Uranus to orbit around the Sun?', '29 years', '12 years', '70 years', '84 years', '84 years', 7);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Uranus is 83% ___', 'oxygen', 'mthane', 'carbon', 'hydrogen', 'hydrogen', 7);

INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('What is Neptune?', 'A galaxy', 'A gas giant', 'A brown dwaf', 'A rocky planet', 'A gas giant', 8);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Neptune is the ___ closest planet to the Sun', 'second', 'sixth', 'eighth', 'ninth', 'eighth', 8);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Neptune was first discovered in ___', '1975', '1781', '1846', '1954', '1846', 8);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('How long does it take Uranus to orbit around the Sun?', '29 years', '12 years', '70 years', '84 years', '84 years', 8);
INSERT INTO questions (question, answer_one, answer_two, answer_three, answer_four, correct_answer, quiz_id) VALUES ('Neptune is 80% ___', 'oxygen', 'mthane', 'carbon', 'hydrogen', 'hydrogen', 8);

COMMIT; 