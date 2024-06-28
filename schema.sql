CREATE DATABASE lms;
CREATE USER lms_admin;
GRANT ALL PRIVILEGES ON DATABASE lms TO lms_admin;


CREATE TABLE lms_users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    role VARCHAR(50) NOT NULL,
    subscription_type VARCHAR(15) NOT NULL,
    free_tokens SMALLINT NOT NULL,
    login_method VARCHAR(50) NOT NULL
);

CREATE TABLE lms_academy (
  id UUID PRIMARY KEY,
  name VARCHAR(300) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  public_password VARCHAR(300) NOT NULL
);

CREATE TABLE lms_test_data (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(128) NOT NULL,
    paper_category VARCHAR(128) NOT NULL,
    academy_name VARCHAR(300) REFERENCES lms_academy(name),
    statement TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    correct VARCHAR(10) NOT NULL,
    explanation TEXT,
    paper_year SMALLINT NOT NULL,
    difficulty VARCHAR(10) NOT NULL
      
);

CREATE TABLE lms_user_overall_data (
    userId UUID REFERENCES lms_users,
    subject VARCHAR(128) NOT NULL,
    total_solved INT NOT NULL,
    total_correct INT NOT NULL,
    total_incorrect INT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE lms_tokens ( 
    id UUID REFERENCES lms_users,
    token VARCHAR(300) NOT NULL
);
 
INSERT INTO lms_users (id, first_name, last_name, email, password, role, subscription_type, free_tokens, login_method) 
VALUES ( 'f415284b-87b4-4206-a79f-5bd61b00de97', 'hamza', 'saleem', 'hamza@gmail.com', 
'$2a$10$Aqb2UA6V6n/p6tJZPUWvre3HnSef3WX/v822L7x9RxHT0mJXkx9w6', 'user', 'none', 300, 'normal');

INSERT INTO lms_users (id, first_name, last_name, email, password, role, subscription_type, free_tokens, login_method) 
VALUES ( '0b33ebed-9a89-4e15-b920-88082b06f6ef', 'saad', 'masood', 'saad@gmail.com', 
'$2a$10$43QZZ3oxQKs0Am97EwbDF.PWgLxrRgSxMP/yjbDXj4PNF4/58QlFW', 'admin', 'none', 300, 'normal');

INSERT INTO lms_academy (
  id,
  name,
  password,
  public_password
) VALUES 
('9c92a2ad-b70b-4643-a845-a9756cc5f8fd','British Council', 'random', 'random'),
('7d7d4047-8c4d-467c-9e3d-406129240923','Punjab Public Service Commission', 'random', 'random'),
('f6184cb2-9668-451a-bc92-ed0266e75a0c','Federal Public Service Commission', 'random', 'random'),
('29b4c008-654a-4481-860f-b0b595cfc967','Union Public Service Commission', 'random', 'random');


INSERT INTO lms_test_data (
    subject, 
    paper_category, 
    academy_name, 
    statement, 
    option_a, 
    option_b, 
    option_c, 
    correct, 
    explanation, 
    paper_year, 
    difficulty
) VALUES
('English', 'IELTS', 'British Council', 'Which of the following is a synonym for "abundant"?', 'Scarce', 'Plentiful', 'Rare', 'B', 'The synonym for "abundant" is "plentiful".', 2021, 'Easy'),
('General Knowledge', 'PPSC', 'Punjab Public Service Commission', 'Who is known as the father of computers?', 'Albert Einstein', 'Charles Babbage', 'Isaac Newton', 'B', 'Charles Babbage is known as the father of computers.', 2020, 'Medium'),
('History', 'CSS', 'Federal Public Service Commission', 'In which year did the Battle of Plassey take place?', '1757', '1764', '1776', 'A', 'The Battle of Plassey took place in 1757.', 2019, 'Medium'),
('Geography', 'UPSC', 'Union Public Service Commission', 'Which is the smallest continent by land area?', 'Australia', 'Europe', 'Antarctica', 'A', 'Australia is the smallest continent by land area.', 2021, 'Easy'),
('Science', 'IELTS', 'British Council', 'What is the chemical symbol for Water?', 'O2', 'H2O', 'CO2', 'B', 'The chemical symbol for water is H2O.', 2020, 'Easy'),
('Current Affairs', 'PPSC', 'Punjab Public Service Commission', 'Who is the current Secretary-General of the United Nations?', 'Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'B', 'António Guterres is the current Secretary-General of the United Nations.', 2021, 'Medium'),
('Political Science', 'CSS', 'Federal Public Service Commission', 'Who wrote "The Social Contract"?', 'John Locke', 'Jean-Jacques Rousseau', 'Thomas Hobbes', 'B', 'Jean-Jacques Rousseau wrote "The Social Contract".', 2018, 'Medium'),
('Economics', 'UPSC', 'Union Public Service Commission', 'What is the term for a prolonged period of economic recession?', 'Inflation', 'Depression', 'Stagflation', 'B', 'A prolonged period of economic recession is called a depression.', 2020, 'Medium'),
('English', 'IELTS', 'British Council', 'Choose the correct word: "He has a strong _____ of responsibility."', 'Sense', 'Sens', 'Sence', 'A', 'The correct word is "sense".', 2021, 'Easy'),
('General Knowledge', 'PPSC', 'Punjab Public Service Commission', 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'B', 'Mars is known as the Red Planet.', 2019, 'Easy'),
('History', 'CSS', 'Federal Public Service Commission', 'Who was the first Caliph of Islam?', 'Umar ibn Al-Khattab', 'Abu Bakr', 'Uthman ibn Affan', 'B', 'Abu Bakr was the first Caliph of Islam.', 2021, 'Medium'),
('Geography', 'UPSC', 'Union Public Service Commission', 'Which river is the longest in India?', 'Ganga', 'Yamuna', 'Godavari', 'A', 'The Ganga is the longest river in India.', 2020, 'Easy'),
('Science', 'IELTS', 'British Council', 'Which gas is most abundant in the Earth’s atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'B', 'Nitrogen is the most abundant gas in the Earth’s atmosphere.', 2021, 'Medium'),
('Current Affairs', 'PPSC', 'Punjab Public Service Commission', 'Who won the Nobel Peace Prize in 2020?', 'Abiy Ahmed', 'World Food Programme', 'Malala Yousafzai', 'B', 'The World Food Programme won the Nobel Peace Prize in 2020.', 2021, 'Medium'),
('Political Science', 'CSS', 'Federal Public Service Commission', 'Which country is known as the birthplace of democracy?', 'India', 'USA', 'Greece', 'C', 'Greece is known as the birthplace of democracy.', 2019, 'Easy'),
('Economics', 'UPSC', 'Union Public Service Commission', 'What does GDP stand for?', 'Gross Domestic Product', 'Global Domestic Product', 'Gross Development Product', 'A', 'GDP stands for Gross Domestic Product.', 2018, 'Easy'),
('English', 'IELTS', 'British Council', 'What is the past tense of "write"?', 'Writed', 'Wrote', 'Written', 'B', 'The past tense of "write" is "wrote".', 2020, 'Easy'),
('General Knowledge', 'PPSC', 'Punjab Public Service Commission', 'What is the capital of Canada?', 'Toronto', 'Vancouver', 'Ottawa', 'C', 'Ottawa is the capital of Canada.', 2021, 'Medium'),
('History', 'CSS', 'Federal Public Service Commission', 'Who was the first President of Pakistan?', 'Liaquat Ali Khan', 'Iskander Mirza', 'Ayub Khan', 'B', 'Iskander Mirza was the first President of Pakistan.', 2020, 'Medium'),
('Geography', 'UPSC', 'Union Public Service Commission', 'Mount Everest is located in which mountain range?', 'Andes', 'Rockies', 'Himalayas', 'C', 'Mount Everest is located in the Himalayas.', 2019, 'Easy');
