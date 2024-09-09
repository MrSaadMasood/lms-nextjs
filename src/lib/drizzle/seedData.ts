export const users = [
  {
    username: 'hamza saleem',
    email: 'hamza@gmail.com',
    password: '$2a$10$Aqb2UA6V6n/p6tJZPUWvre3HnSef3WX/v822L7x9RxHT0mJXkx9w6',
  },
  {
    username: 'saad masood',
    email: 'saad@gmail.com',
    password: '$2a$10$43QZZ3oxQKs0Am97EwbDF.PWgLxrRgSxMP/yjbDXj4PNF4/58QlFW',
  },
  {
    id: 'f0fdf26b-0c91-4e37-ba50-ca91d46ab612',
    username: 'asma',
    email: 'asma@gmail.com',
    password: '$2a$10$kO8z2OkX.RFJxqch6dnWkO3b43ougbZsGFWumuU9QggNA46pbzIT2',
  }

];


export const admins = [
  {
    id: '3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7',
    role: 'ADMIN' as const,
    username: 'asad',
    password: '$2a$10$K/ed3iH1rhbGuD.WP7EkUupKkI9pDWS93Y8Jg0HJmVYjqmfJYPjhy',
    email: 'hamza_admin@gmail.com'
  },
  {
    id: '5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5',
    role: 'ADMIN' as const,
    username: 'hunzla',
    password: '$2a$10$F/Z3zzB1xhC2bU.W9CkN5uK9mPbR/S6U4D2Vg0HJrEYkl8dIZTp3u',
    email: 'saad_admin@gmail.com'
  }
];

export const academies = [
  {
    id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    name: 'British Council',
    admin_id: '3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7'
  },
  {
    id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    name: 'Punjab Public Service Commission',
    admin_id: '5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5'
  },
  {
    id: 'cbb2bf2e-292e-4797-8f14-3256ea2c2c5b',
    name: 'Federal Public Service Commission',
    admin_id: '3a4f8b32-2c7c-4b67-9b8b-0d4a9b63a9e7'
  },
  {
    id: 'ac5be946-d688-48f8-9f59-c27cb174f6d2',
    name: 'Union Public Service Commission',
    admin_id: '5e4f8c78-8c4c-4b78-9b9c-0f6a9a72c7e5'
  }
];


export const testData = [
  {
    subject: 'English',
    paper_category: 'IELTS',
    academy_id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    statement: 'Which of the following is a synonym for "abundant"?',
    option_a: 'Scarce',
    option_b: 'Plentiful',
    option_c: 'Rare',
    option_d: 'Limited',
    correct: 'B' as const,
    explanation: 'The synonym for "abundant" is "plentiful".',
    paper_year: 2021,
    difficulty: 'EASY' as const
  },
  {
    subject: 'General Knowledge',
    paper_category: 'PPSC',
    academy_id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    statement: 'Who is known as the father of computers?',
    option_a: 'Albert Einstein',
    option_b: 'Charles Babbage',
    option_c: 'Isaac Newton',
    option_d: 'Alan Turing',
    correct: 'B' as const,
    explanation: 'Charles Babbage is known as the father of computers.',
    paper_year: 2020,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'History',
    paper_category: 'CSS',
    academy_id: "cbb2bf2e-292e-4797-8f14-3256ea2c2c5b",
    statement: 'In which year did the Battle of Plassey take place?',
    option_a: '1757',
    option_b: '1764',
    option_c: '1776',
    option_d: '1783',
    correct: 'A' as const,
    explanation: 'The Battle of Plassey took place in 1757.',
    paper_year: 2019,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Geography',
    paper_category: 'UPSC',
    academy_id: "ac5be946-d688-48f8-9f59-c27cb174f6d2",
    statement: 'Which is the smallest continent by land area?',
    option_a: 'Australia',
    option_b: 'Europe',
    option_c: 'Antarctica',
    option_d: 'South America',
    correct: 'A' as const,
    explanation: 'Australia is the smallest continent by land area.',
    paper_year: 2021,
    difficulty: 'EASY' as const
  },
  {
    subject: 'Science',
    paper_category: 'IELTS',
    academy_id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    statement: 'What is the chemical symbol for Water?',
    option_a: 'O2',
    option_b: 'H2O',
    option_c: 'CO2',
    option_d: 'HO',
    correct: 'B' as const,
    explanation: 'The chemical symbol for water is H2O.',
    paper_year: 2020,
    difficulty: 'EASY' as const
  },
  {
    subject: 'Current Affairs',
    paper_category: 'PPSC',
    academy_id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    statement: 'Who is the current Secretary-General of the United Nations?',
    option_a: 'Ban Ki-moon',
    option_b: 'António Guterres',
    option_c: 'Kofi Annan',
    option_d: 'Boutros Boutros-Ghali',
    correct: 'B' as const,
    explanation: 'António Guterres is the current Secretary-General of the United Nations.',
    paper_year: 2021,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Political Science',
    paper_category: 'CSS',
    academy_id: "cbb2bf2e-292e-4797-8f14-3256ea2c2c5b",
    statement: 'Who wrote "The Social Contract"?',
    option_a: 'John Locke',
    option_b: 'Jean-Jacques Rousseau',
    option_c: 'Thomas Hobbes',
    option_d: 'Montesquieu',
    correct: 'B' as const,
    explanation: 'Jean-Jacques Rousseau wrote "The Social Contract".',
    paper_year: 2018,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Economics',
    paper_category: 'UPSC',
    academy_id: "ac5be946-d688-48f8-9f59-c27cb174f6d2",
    statement: 'What is the term for a prolonged period of economic recession?',
    option_a: 'Inflation',
    option_b: 'Depression',
    option_c: 'Stagflation',
    option_d: 'Recession',
    correct: 'B' as const,
    explanation: 'A prolonged period of economic recession is called a depression.',
    paper_year: 2020,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'English',
    paper_category: 'IELTS',
    academy_id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    statement: 'Choose the correct word: "He has a strong _____ of responsibility."',
    option_a: 'Sense',
    option_b: 'Sens',
    option_c: 'Sence',
    option_d: 'Scent',
    correct: 'A' as const,
    explanation: 'The correct word is "sense".',
    paper_year: 2021,
    difficulty: 'EASY' as const
  },
  {
    subject: 'General Knowledge',
    paper_category: 'PPSC',
    academy_id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    statement: 'Which planet is known as the Red Planet?',
    option_a: 'Earth',
    option_b: 'Mars',
    option_c: 'Jupiter',
    option_d: 'Venus',
    correct: 'B' as const,
    explanation: 'Mars is known as the Red Planet.',
    paper_year: 2019,
    difficulty: 'EASY' as const
  },
  {
    subject: 'History',
    paper_category: 'CSS',
    academy_id: "cbb2bf2e-292e-4797-8f14-3256ea2c2c5b",
    statement: 'Who was the first Caliph of Islam?',
    option_a: 'Umar ibn Al-Khattab',
    option_b: 'Abu Bakr',
    option_c: 'Uthman ibn Affan',
    option_d: 'Ali ibn Abi Talib',
    correct: 'B' as const,
    explanation: 'Abu Bakr was the first Caliph of Islam.',
    paper_year: 2021,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Geography',
    paper_category: 'UPSC',
    academy_id: "ac5be946-d688-48f8-9f59-c27cb174f6d2",
    statement: 'Which river is the longest in India?',
    option_a: 'Ganga',
    option_b: 'Yamuna',
    option_c: 'Godavari',
    option_d: 'Brahmaputra',
    correct: 'A' as const,
    explanation: 'The Ganga is the longest river in India.',
    paper_year: 2020,
    difficulty: 'EASY' as const
  },
  {
    subject: 'Science',
    paper_category: 'IELTS',
    academy_id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    statement: 'Which gas is most abundant in the Earth’s atmosphere?',
    option_a: 'Oxygen',
    option_b: 'Nitrogen',
    option_c: 'Carbon Dioxide',
    option_d: 'Argon',
    correct: 'B' as const,
    explanation: 'Nitrogen is the most abundant gas in the Earth’s atmosphere.',
    paper_year: 2021,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Current Affairs',
    paper_category: 'PPSC',
    academy_id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    statement: 'Who won the Nobel Peace Prize in 2020?',
    option_a: 'Abiy Ahmed',
    option_b: 'World Food Programme',
    option_c: 'Malala Yousafzai',
    option_d: 'Greta Thunberg',
    correct: 'B' as const,
    explanation: 'The World Food Programme won the Nobel Peace Prize in 2020.',
    paper_year: 2021,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Political Science',
    paper_category: 'CSS',
    academy_id: "cbb2bf2e-292e-4797-8f14-3256ea2c2c5b",
    statement: 'Which country is known as the birthplace of democracy?',
    option_a: 'India',
    option_b: 'USA',
    option_c: 'Greece',
    option_d: 'France',
    correct: 'C' as const,
    explanation: 'Greece is known as the birthplace of democracy.',
    paper_year: 2019,
    difficulty: 'EASY' as const
  },
  {
    subject: 'Economics',
    paper_category: 'UPSC',
    academy_id: "ac5be946-d688-48f8-9f59-c27cb174f6d2",
    statement: 'What does GDP stand for?',
    option_a: 'Gross Domestic Product',
    option_b: 'Global Domestic Product',
    option_c: 'Gross Development Product',
    option_d: 'Gross Domestic Power',
    correct: 'A' as const,
    explanation: 'GDP stands for Gross Domestic Product.',
    paper_year: 2018,
    difficulty: 'EASY' as const
  },
  {
    subject: 'English',
    paper_category: 'IELTS',
    academy_id: '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33',
    statement: 'What is the past tense of "write"?',
    option_a: 'Writed',
    option_b: 'Wrote',
    option_c: 'Written',
    option_d: 'Writing',
    correct: 'B' as const,
    explanation: 'The past tense of "write" is "wrote".',
    paper_year: 2020,
    difficulty: 'EASY' as const
  },
  {
    subject: 'General Knowledge',
    paper_category: 'PPSC',
    academy_id: '1fe58cae-4262-4cb1-aaac-7068d36b5931',
    statement: 'What is the capital of Canada?',
    option_a: 'Toronto',
    option_b: 'Vancouver',
    option_c: 'Ottawa',
    option_d: 'Montreal',
    correct: 'C' as const,
    explanation: 'Ottawa is the capital of Canada.',
    paper_year: 2021,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'History',
    paper_category: 'CSS',
    academy_id: "cbb2bf2e-292e-4797-8f14-3256ea2c2c5b",
    statement: 'Who was the first President of Pakistan?',
    option_a: 'Liaquat Ali Khan',
    option_b: 'Iskander Mirza',
    option_c: 'Ayub Khan',
    option_d: 'Zulfikar Ali Bhutto',
    correct: 'B' as const,
    explanation: 'Iskander Mirza was the first President of Pakistan.',
    paper_year: 2020,
    difficulty: 'MEDIUM' as const
  },
  {
    subject: 'Geography',
    paper_category: 'UPSC',
    academy_id: "ac5be946-d688-48f8-9f59-c27cb174f6d2",
    statement: 'Mount Everest is located in which mountain range?',
    option_a: 'Andes',
    option_b: 'Rockies',
    option_c: 'Himalayas',
    option_d: 'Alps',
    correct: 'C' as const,
    explanation: 'Mount Everest is located in the Himalayas.',
    paper_year: 2019,
    difficulty: 'EASY' as const
  }
];

export const userStatData = [
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 10,
    "total_correct": 8,
    "total_incorrect": 2,
    "date": "2024-06-01",
    "total_hard": 2,
    "total_medium": 4,
    "total_easy": 4
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 15,
    "total_correct": 12,
    "total_incorrect": 3,
    "date": "2024-06-05",
    "total_hard": 3,
    "total_medium": 6,
    "total_easy": 6
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 12,
    "total_correct": 9,
    "total_incorrect": 3,
    "date": "2024-06-10",
    "total_hard": 2,
    "total_medium": 5,
    "total_easy": 5
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 8,
    "total_correct": 7,
    "total_incorrect": 1,
    "date": "2024-06-15",
    "total_hard": 1,
    "total_medium": 4,
    "total_easy": 3
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 20,
    "total_correct": 18,
    "total_incorrect": 2,
    "date": "2024-06-20",
    "total_hard": 4,
    "total_medium": 8,
    "total_easy": 8
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 18,
    "total_correct": 15,
    "total_incorrect": 3,
    "date": "2024-06-25",
    "total_hard": 4,
    "total_medium": 7,
    "total_easy": 7
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 14,
    "total_correct": 11,
    "total_incorrect": 3,
    "date": "2024-06-30",
    "total_hard": 3,
    "total_medium": 5,
    "total_easy": 6
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 10,
    "total_correct": 9,
    "total_incorrect": 1,
    "date": "2024-07-05",
    "total_hard": 2,
    "total_medium": 4,
    "total_easy": 4
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 25,
    "total_correct": 22,
    "total_incorrect": 3,
    "date": "2024-07-10",
    "total_hard": 5,
    "total_medium": 10,
    "total_easy": 10
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 22,
    "total_correct": 20,
    "total_incorrect": 2,
    "date": "2024-07-15",
    "total_hard": 5,
    "total_medium": 8,
    "total_easy": 9
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 17,
    "total_correct": 15,
    "total_incorrect": 2,
    "date": "2024-07-20",
    "total_hard": 4,
    "total_medium": 6,
    "total_easy": 7
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 12,
    "total_correct": 11,
    "total_incorrect": 1,
    "date": "2024-07-25",
    "total_hard": 3,
    "total_medium": 4,
    "total_easy": 5
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 30,
    "total_correct": 28,
    "total_incorrect": 2,
    "date": "2024-07-30",
    "total_hard": 6,
    "total_medium": 12,
    "total_easy": 12
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 27,
    "total_correct": 25,
    "total_incorrect": 2,
    "date": "2024-08-04",
    "total_hard": 6,
    "total_medium": 11,
    "total_easy": 10
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 20,
    "total_correct": 18,
    "total_incorrect": 2,
    "date": "2024-08-09",
    "total_hard": 5,
    "total_medium": 7,
    "total_easy": 8
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 15,
    "total_correct": 13,
    "total_incorrect": 2,
    "date": "2024-08-14",
    "total_hard": 4,
    "total_medium": 5,
    "total_easy": 6
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 35,
    "total_correct": 32,
    "total_incorrect": 3,
    "date": "2024-08-19",
    "total_hard": 7,
    "total_medium": 14,
    "total_easy": 14
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 32,
    "total_correct": 30,
    "total_incorrect": 2,
    "date": "2024-08-24",
    "total_hard": 8,
    "total_medium": 12,
    "total_easy": 12
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 25,
    "total_correct": 23,
    "total_incorrect": 2,
    "date": "2024-08-29",
    "total_hard": 5,
    "total_medium": 10,
    "total_easy": 10
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 18,
    "total_correct": 16,
    "total_incorrect": 2,
    "date": "2024-09-03",
    "total_hard": 4,
    "total_medium": 7,
    "total_easy": 7
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 40,
    "total_correct": 38,
    "total_incorrect": 2,
    "total_hard": 5,
    "total_medium": 15,
    "total_easy": 20,
    "date": "2024-09-08"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 37,
    "total_correct": 34,
    "total_incorrect": 3,
    "total_hard": 7,
    "total_medium": 14,
    "total_easy": 16,
    "date": "2024-09-13"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 30,
    "total_correct": 28,
    "total_incorrect": 2,
    "total_hard": 4,
    "total_medium": 12,
    "total_easy": 14,
    "date": "2024-09-18"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 22,
    "total_correct": 20,
    "total_incorrect": 2,
    "total_hard": 3,
    "total_medium": 9,
    "total_easy": 10,
    "date": "2024-09-23"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 45,
    "total_correct": 42,
    "total_incorrect": 3,
    "total_hard": 6,
    "total_medium": 17,
    "total_easy": 22,
    "date": "2024-09-28"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 40,
    "total_correct": 38,
    "total_incorrect": 2,
    "total_hard": 7,
    "total_medium": 16,
    "total_easy": 17,
    "date": "2024-10-03"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 35,
    "total_correct": 33,
    "total_incorrect": 2,
    "total_hard": 5,
    "total_medium": 14,
    "total_easy": 16,
    "date": "2024-10-08"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 28,
    "total_correct": 26,
    "total_incorrect": 2,
    "total_hard": 4,
    "total_medium": 11,
    "total_easy": 13,
    "date": "2024-10-13"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 50,
    "total_correct": 48,
    "total_incorrect": 2,
    "total_hard": 7,
    "total_medium": 20,
    "total_easy": 23,
    "date": "2024-10-18"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 45,
    "total_correct": 43,
    "total_incorrect": 2,
    "total_hard": 8,
    "total_medium": 18,
    "total_easy": 19,
    "date": "2024-10-23"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 10,
    "total_correct": 8,
    "total_incorrect": 2,
    "total_hard": 2,
    "total_medium": 3,
    "total_easy": 5,
    "date": "2024-03-01"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 15,
    "total_correct": 12,
    "total_incorrect": 3,
    "total_hard": 3,
    "total_medium": 5,
    "total_easy": 7,
    "date": "2024-03-06"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 12,
    "total_correct": 9,
    "total_incorrect": 3,
    "total_hard": 2,
    "total_medium": 4,
    "total_easy": 6,
    "date": "2024-03-11"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 8,
    "total_correct": 7,
    "total_incorrect": 1,
    "total_hard": 1,
    "total_medium": 3,
    "total_easy": 4,
    "date": "2024-03-16"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 20,
    "total_correct": 18,
    "total_incorrect": 2,
    "total_hard": 3,
    "total_medium": 7,
    "total_easy": 10,
    "date": "2024-03-21"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 18,
    "total_correct": 15,
    "total_incorrect": 3,
    "total_hard": 3,
    "total_medium": 6,
    "total_easy": 9,
    "date": "2024-03-26"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "English",
    "total_solved": 14,
    "total_correct": 11,
    "total_incorrect": 3,
    "total_hard": 2,
    "total_medium": 5,
    "total_easy": 7,
    "date": "2024-03-31"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "History",
    "total_solved": 10,
    "total_correct": 9,
    "total_incorrect": 1,
    "total_hard": 1,
    "total_medium": 3,
    "total_easy": 6,
    "date": "2024-04-05"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Math",
    "total_solved": 25,
    "total_correct": 22,
    "total_incorrect": 3,
    "total_hard": 4,
    "total_medium": 9,
    "total_easy": 12,
    "date": "2024-04-10"
  },
  {
    "user_id": "f0fdf26b-0c91-4e37-ba50-ca91d46ab612",
    "subject": "Science",
    "total_solved": 22,
    "total_correct": 20,
    "total_incorrect": 2,
    "total_hard": 4,
    "total_medium": 8,
    "total_easy": 10,
    "date": "2024-04-15"
  }

]
