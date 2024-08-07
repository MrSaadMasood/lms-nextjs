CREATE DATABASE lms;
CREATE USER lms_admin;
GRANT ALL PRIVILEGES ON DATABASE lms TO lms_admin;


CREATE TYPE difficulty as ENUM('EASY', 'MEDIUM', 'HIGH');
CREATE TYPE user_role as ENUM('USER', 'ADMIN');
CREATE TYPE subscription as ENUM('NONE', 'PERM', 'TEMP');
CREATE TYPE login_method as ENUM('NORMAL', 'GOOGLE');
CREATE TYPE correct_option as ENUM('A', 'B', 'C', 'D');

CREATE TABLE IF NOT EXISTS lms_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(300) NOT NULL UNIQUE,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    role USER_ROLE NOT NULL DEFAULT 'USER',
    subscription_type SUBSCRIPTION NOT NULL DEFAULT 'NONE',
    free_tokens SMALLINT NOT NULL DEFAULT 300,
    login_method LOGIN_METHOD NOT NULL DEFAULT 'NORMAL'
);

CREATE TABLE IF NOT EXISTS lms_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role USER_ROLE NOT NULL DEFAULT 'ADMIN',
  username VARCHAR(300) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS lms_academy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(300) NOT NULL UNIQUE,
  admin_id UUID REFERENCES lms_admins,
  public_password VARCHAR(300) 
);

CREATE TABLE IF NOT EXISTS lms_test_data (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(128) NOT NULL,
    paper_category VARCHAR(128) NOT NULL,
    academy_id UUID REFERENCES lms_academy,
    statement TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct CORRECT_OPTION NOT NULL,
    explanation TEXT,
    paper_year SMALLINT NOT NULL,
    difficulty DIFFICULTY NOT NULL
      
);

CREATE TABLE IF NOT EXISTS lms_user_stats (
    userId UUID REFERENCES lms_users,
    subject VARCHAR(128) NOT NULL,
    total_solved INT NOT NULL,
    total_correct INT NOT NULL,
    total_incorrect INT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_test_data_year_category_subject 
ON lms_test_data(paper_year, paper_category, subject);

CREATE INDEX IF NOT EXISTS idx_stats_subject on lms_user_stats(subject);
 
INSERT INTO lms_users (username, email, password, role, subscription_type, free_tokens, login_method) 
VALUES ( 'hamza saleem', 'hamza@gmail.com', 
'$2a$10$Aqb2UA6V6n/p6tJZPUWvre3HnSef3WX/v822L7x9RxHT0mJXkx9w6', 'USER', 'NONE', 300, 'NORMAL');

INSERT INTO lms_users (username, email, password, role, subscription_type, free_tokens, login_method) 
VALUES ('saad masood', 'saad@gmail.com', 
'$2a$10$43QZZ3oxQKs0Am97EwbDF.PWgLxrRgSxMP/yjbDXj4PNF4/58QlFW', 'USER', 'NONE', 300, 'NORMAL');


INSERT INTO lms_admins (id, role, username, password, email)
VALUES
('3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7', 'ADMIN', 'asad', '$2a$10$K/ed3iH1rhbGuD.WP7EkUupKkI9pDWS93Y8Jg0HJmVYjqmfJYPjhy', 'hamza_admin@gmail.com'),
('5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5', 'ADMIN', 'hunzla', '$2a$10$F/Z3zzB1xhC2bU.W9CkN5uK9mPbR/S6U4D2Vg0HJrEYkl8dIZTp3u', 'saad_admin@gmail.com');

INSERT INTO lms_academy (id, name, admin_id)
VALUES
('3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'British Council', '3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7'),
( '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'Punjab Public Service Commission', '5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5'),
('cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'Federal Public Service Commission', '3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7'),
('ac5be946-d688-48f8-9f59-c27cb174f6d2', 'Union Public Service Commission', '5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5');


INSERT INTO lms_test_data (
    subject, 
    paper_category, 
    academy_id, 
    statement, 
    option_a, 
    option_b, 
    option_c, 
    option_d, 
    correct, 
    explanation, 
    paper_year, 
    difficulty
) VALUES
('English', 'IELTS', '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'Which of the following is a synonym for "abundant"?', 'Scarce', 'Plentiful', 'Rare', 'Limited', 'B', 'The synonym for "abundant" is "plentiful".', 2021, 'EASY'),
('General Knowledge', 'PPSC', '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'Who is known as the father of computers?', 'Albert Einstein', 'Charles Babbage', 'Isaac Newton', 'Alan Turing', 'B', 'Charles Babbage is known as the father of computers.', 2020, 'MEDIUM'),
('History', 'CSS', 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'In which year did the Battle of Plassey take place?', '1757', '1764', '1776', '1783', 'A', 'The Battle of Plassey took place in 1757.', 2019, 'MEDIUM'),
('Geography', 'UPSC', 'ac5be946-d688-48f8-9f59-c27cb174f6d2', 'Which is the smallest continent by land area?', 'Australia', 'Europe', 'Antarctica', 'South America', 'A', 'Australia is the smallest continent by land area.', 2021, 'EASY'),
('Science', 'IELTS', '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'What is the chemical symbol for Water?', 'O2', 'H2O', 'CO2', 'HO', 'B', 'The chemical symbol for water is H2O.', 2020, 'EASY'),
('Current Affairs', 'PPSC', '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'Who is the current Secretary-General of the United Nations?', 'Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'Boutros Boutros-Ghali', 'B', 'António Guterres is the current Secretary-General of the United Nations.', 2021, 'MEDIUM'),
('Political Science', 'CSS', 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'Who wrote "The Social Contract"?', 'John Locke', 'Jean-Jacques Rousseau', 'Thomas Hobbes', 'Montesquieu', 'B', 'Jean-Jacques Rousseau wrote "The Social Contract".', 2018, 'MEDIUM'),
('Economics', 'UPSC', 'ac5be946-d688-48f8-9f59-c27cb174f6d2', 'What is the term for a prolonged period of economic recession?', 'Inflation', 'Depression', 'Stagflation', 'Recession', 'B', 'A prolonged period of economic recession is called a depression.', 2020, 'MEDIUM'),
('English', 'IELTS', '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'Choose the correct word: "He has a strong _____ of responsibility."', 'Sense', 'Sens', 'Sence', 'Scent', 'A', 'The correct word is "sense".', 2021, 'EASY'),
('General Knowledge', 'PPSC', '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Venus', 'B', 'Mars is known as the Red Planet.', 2019, 'EASY'),
('History', 'CSS', 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'Who was the first Caliph of Islam?', 'Umar ibn Al-Khattab', 'Abu Bakr', 'Uthman ibn Affan', 'Ali ibn Abi Talib', 'B', 'Abu Bakr was the first Caliph of Islam.', 2021, 'MEDIUM'),
('Geography', 'UPSC', 'ac5be946-d688-48f8-9f59-c27cb174f6d2', 'Which river is the longest in India?', 'Ganga', 'Yamuna', 'Godavari', 'Brahmaputra', 'A', 'The Ganga is the longest river in India.', 2020, 'EASY'),
('Science', 'IELTS', '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'Which gas is most abundant in the Earth’s atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon', 'B', 'Nitrogen is the most abundant gas in the Earth’s atmosphere.', 2021, 'MEDIUM'),
('Current Affairs', 'PPSC', '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'Who won the Nobel Peace Prize in 2020?', 'Abiy Ahmed', 'World Food Programme', 'Malala Yousafzai', 'Greta Thunberg', 'B', 'The World Food Programme won the Nobel Peace Prize in 2020.', 2021, 'MEDIUM'),
('Political Science', 'CSS', 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'Which country is known as the birthplace of democracy?', 'India', 'USA', 'Greece', 'France', 'C', 'Greece is known as the birthplace of democracy.', 2019, 'EASY'),
('Economics', 'UPSC', 'ac5be946-d688-48f8-9f59-c27cb174f6d2', 'What does GDP stand for?', 'Gross Domestic Product', 'Global Domestic Product', 'Gross Development Product', 'Gross Domestic Power', 'A', 'GDP stands for Gross Domestic Product.', 2018, 'EASY'),
('English', 'IELTS', '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33', 'What is the past tense of "write"?', 'Writed', 'Wrote', 'Written', 'Writing', 'B', 'The past tense of "write" is "wrote".', 2020, 'EASY'),
('General Knowledge', 'PPSC', '1fe58cae-4262-4cb1-aaac-7068d36b5931', 'What is the capital of Canada?', 'Toronto', 'Vancouver', 'Ottawa', 'Montreal', 'C', 'Ottawa is the capital of Canada.', 2021, 'MEDIUM'),
('History', 'CSS', 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b', 'Who was the first President of Pakistan?', 'Liaquat Ali Khan', 'Iskander Mirza', 'Ayub Khan', 'Zulfikar Ali Bhutto', 'B', 'Iskander Mirza was the first President of Pakistan.', 2020, 'MEDIUM'),
('Geography', 'UPSC', 'ac5be946-d688-48f8-9f59-c27cb174f6d2', 'Mount Everest is located in which mountain range?', 'Andes', 'Rockies', 'Himalayas', 'Alps', 'C', 'Mount Everest is located in the Himalayas.', 2019, 'EASY');

DROP TABLE IF EXISTS lms_academy CASCADE;
DROP TABLE IF EXISTS lms_admins CASCADE;
DROP TABLE IF EXISTS lms_users CASCADE;
DROP TABLE IF EXISTS lms_test_data CASCADE;
DROP TABLE IF EXISTS lms_user_stats CASCADE;

DROP INDEX IF EXISTS idx_test_data_year_category_subject CASCADE;
DROP INDEX IF EXISTS idx_stats_subject CASCADE;
