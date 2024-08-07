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
