import { Exam } from '../types';

export interface RawExamData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  iconName: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  // Written as [question, [4 options], correctIndex, explanation, topic]
  questions: [string, [string, string, string, string], number, string, string][];
}

export const RAW_EXAMS: RawExamData[] = [
  {
    id: 'exam-gk-01',
    title: 'General Knowledge',
    slug: 'general-knowledge',
    description: 'Test your awareness of world geography, history, global organizations, and international milestones.',
    category: 'General Awareness',
    iconName: 'Globe',
    durationMinutes: 10,
    difficulty: 'Intermediate',
    questions: [
      [
        'Which is the longest river in the world by total length?',
        ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        1,
        'The Nile River in northeastern Africa is traditionally considered the longest river in the world, spanning approximately 6,650 kilometers (4,132 miles).',
        'Geography'
      ],
      [
        'In which year was the United Nations (UN) officially founded?',
        ['1919', '1942', '1945', '1950'],
        2,
        'The United Nations was officially founded on October 24, 1945, following World War II, when the UN Charter was ratified by the majority of its signatories.',
        'World History'
      ],
      [
        'What is the capital city of Australia?',
        ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        2,
        'Canberra was selected as the capital in 1908 as a compromise between rival cities Sydney and Melbourne, and was founded as a planned city.',
        'Geography'
      ],
      [
        'Which planet in our solar system has the highest number of recognized moons?',
        ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
        1,
        'Saturn holds the record with over 140 officially confirmed moons recognized by the International Astronomical Union.',
        'Astronomy'
      ],
      [
        'Who was the first woman to win a Nobel Prize and the only person to win in two scientific fields?',
        ['Rosalind Franklin', 'Marie Curie', 'Ada Lovelace', 'Lise Meitner'],
        1,
        'Marie Curie won the Nobel Prize in Physics in 1903 (shared) and the Nobel Prize in Chemistry in 1911 for her groundbreaking research on radioactivity.',
        'Science History'
      ],
      [
        'The Great Barrier Reef is situated off the coast of which country?',
        ['Indonesia', 'Australia', 'Brazil', 'South Africa'],
        1,
        'The Great Barrier Reef is the world\'s largest coral reef system, located in the Coral Sea off the northeast coast of Queensland, Australia.',
        'Environment'
      ],
      [
        'Which country has the official currency named the Rand?',
        ['Kenya', 'Nigeria', 'South Africa', 'Egypt'],
        2,
        'The South African Rand (ZAR) is the legal tender and official currency of South Africa, introduced in 1961.',
        'Economics'
      ],
      [
        'Which canal connects the Mediterranean Sea directly to the Red Sea?',
        ['Panama Canal', 'Suez Canal', 'Kiel Canal', 'Corinth Canal'],
        1,
        'The Suez Canal, opened in 1869 in Egypt, connects the Mediterranean Sea to the Red Sea, enabling direct maritime transport between Europe and Asia.',
        'World Geography'
      ],
      [
        'What is the deepest known oceanic trench on Earth?',
        ['Puerto Rico Trench', 'Java Trench', 'Mariana Trench', 'Tonga Trench'],
        2,
        'The Mariana Trench in the western Pacific Ocean reaches a maximum known depth of approximately 10,994 meters (Challenger Deep).',
        'Oceanography'
      ],
      [
        'Who painted the ceiling of the Sistine Chapel in Rome?',
        ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
        1,
        'Michelangelo Buonarroti painted the Sistine Chapel ceiling between 1508 and 1512 under the commission of Pope Julius II.',
        'Art & Culture'
      ]
    ]
  },
  {
    id: 'exam-math-02',
    title: 'Mathematics',
    slug: 'mathematics',
    description: 'Evaluate your quantitative aptitude across algebra, percentages, ratios, probability, and geometry.',
    category: 'Quantitative Aptitude',
    iconName: 'Calculator',
    durationMinutes: 15,
    difficulty: 'Intermediate',
    questions: [
      [
        'If a shirt originally priced at $80 is sold at a 25% discount, what is the final sale price?',
        ['$55', '$60', '$65', '$70'],
        1,
        'Discount = 25% of $80 = 0.25 × 80 = $20. Final sale price = $80 - $20 = $60.',
        'Percentages'
      ],
      [
        'What are the roots of the quadratic equation x² - 5x + 6 = 0?',
        ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = -6'],
        0,
        'Factorizing x² - 5x + 6 = (x - 2)(x - 3) = 0 gives roots x = 2 and x = 3.',
        'Algebra'
      ],
      [
        'A train travels 180 km in 2.5 hours. What is its average speed in kilometers per hour?',
        ['68 km/h', '72 km/h', '75 km/h', '80 km/h'],
        1,
        'Speed = Distance / Time = 180 / 2.5 = 72 km/h.',
        'Speed & Distance'
      ],
      [
        'If the ratio of boys to girls in a class of 45 students is 3:2, how many girls are there?',
        ['15', '18', '27', '20'],
        1,
        'Total ratio parts = 3 + 2 = 5 parts. Each part = 45 / 5 = 9. Girls = 2 parts = 2 × 9 = 18.',
        'Ratios'
      ],
      [
        'What is the hypotenuse of a right-angled triangle with legs of length 9 cm and 12 cm?',
        ['14 cm', '15 cm', '16 cm', '17 cm'],
        1,
        'Using the Pythagorean theorem: c² = a² + b² = 9² + 12² = 81 + 144 = 225. Therefore, c = √225 = 15 cm.',
        'Geometry'
      ],
      [
        'What is the simple interest on a principal of $2,000 invested at 5% annual interest for 3 years?',
        ['$250', '$300', '$320', '$350'],
        1,
        'Simple Interest = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = $300.',
        'Financial Math'
      ],
      [
        'A fair six-sided die is rolled once. What is the probability of rolling a prime number?',
        ['1/6', '1/3', '1/2', '2/3'],
        2,
        'The numbers on a 6-sided die are 1, 2, 3, 4, 5, 6. The prime numbers are 2, 3, and 5 (3 outcomes). Probability = 3/6 = 1/2.',
        'Probability'
      ],
      [
        'What is the next number in the arithmetic progression: 7, 13, 19, 25, ...?',
        ['29', '31', '32', '34'],
        1,
        'The common difference d = 13 - 7 = 6. The next term is 25 + 6 = 31.',
        'Sequences'
      ],
      [
        'If 3x + 7 = 28, what is the value of 2x - 3?',
        ['9', '11', '14', '7'],
        1,
        '3x = 28 - 7 = 21, so x = 7. Substituting x = 7 into 2x - 3 gives 2(7) - 3 = 14 - 3 = 11.',
        'Linear Equations'
      ],
      [
        'A shopkeeper buys an item for $150 and sells it for $195. What is the percentage profit?',
        ['25%', '30%', '35%', '40%'],
        1,
        'Profit = $195 - $150 = $45. Profit % = (45 / 150) × 100 = 0.30 × 100 = 30%.',
        'Profit & Loss'
      ]
    ]
  },
  {
    id: 'exam-sci-03',
    title: 'Science',
    slug: 'science',
    description: 'Assess foundational concepts in physics, chemistry, biology, genetics, and ecology.',
    category: 'Natural Sciences',
    iconName: 'Atom',
    durationMinutes: 12,
    difficulty: 'Intermediate',
    questions: [
      [
        'What organelle is known as the powerhouse of the eukaryotic cell?',
        ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
        1,
        'Mitochondria produce most of the chemical energy needed to power the cell\'s biochemical reactions via ATP generation.',
        'Cell Biology'
      ],
      [
        'What is the approximate speed of light in a vacuum?',
        ['30,000 km/s', '150,000 km/s', '300,000 km/s', '3,000,000 km/s'],
        2,
        'The speed of light in vacuum is exactly 299,792,458 m/s, which rounds to approximately 300,000 km/s (or 3 × 10⁸ m/s).',
        'Physics'
      ],
      [
        'What is the chemical formula for ordinary table salt?',
        ['KCl', 'NaCl', 'CaCl2', 'NaHCO3'],
        1,
        'Table salt is sodium chloride, composed of one sodium atom (Na) and one chlorine atom (Cl) bound ionically: NaCl.',
        'Chemistry'
      ],
      [
        'Which gas is absorbed by green plants during the daylight process of photosynthesis?',
        ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
        1,
        'During photosynthesis, plants take in carbon dioxide (CO₂) and water (H₂O) using sunlight to synthesize glucose and release oxygen (O₂).',
        'Botany & Ecology'
      ],
      [
        'What is Newton\'s First Law of Motion commonly referred to as?',
        ['Law of Universal Gravitation', 'Law of Inertia', 'Law of Acceleration', 'Law of Action and Reaction'],
        1,
        'Newton\'s first law states that an object at rest remains at rest and an object in uniform motion remains in motion unless acted upon by an external net force; this is known as inertia.',
        'Classical Mechanics'
      ],
      [
        'Which human blood type is considered the universal red blood cell donor?',
        ['Type A Positive', 'Type AB Positive', 'Type O Negative', 'Type B Negative'],
        2,
        'Type O Negative blood lacks A, B, and Rh antigens on red blood cells, making it safe for transfusion to virtually any recipient in emergencies.',
        'Human Physiology'
      ],
      [
        'What does pH stand for, and what pH value represents a neutral solution at 25°C?',
        ['Potential of Hydrogen; pH 7', 'Power of Helium; pH 0', 'Percent Hydroxide; pH 14', 'Pressure of Hydrogen; pH 5'],
        0,
        'pH stands for potential (or power) of hydrogen ions. A pH of 7 is neutral (e.g. pure water); below 7 is acidic, and above 7 is alkaline.',
        'Chemistry'
      ],
      [
        'Sound waves cannot travel through which of the following mediums?',
        ['Water', 'Steel', 'Vacuum', 'Air'],
        2,
        'Sound is a mechanical longitudinal wave requiring a physical material medium (solid, liquid, or gas) to propagate, so it cannot travel through empty vacuum.',
        'Acoustics'
      ],
      [
        'Which element has the atomic number 1 in the periodic table?',
        ['Helium', 'Hydrogen', 'Carbon', 'Lithium'],
        1,
        'Hydrogen is the lightest chemical element with symbol H and atomic number 1, containing a single proton in its nucleus.',
        'Periodic Table'
      ],
      [
        'Which layer of Earth\'s atmosphere contains the ozone layer that absorbs harmful ultraviolet radiation?',
        ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
        1,
        'The ozone layer is concentrated in the stratosphere, typically between 15 and 35 km above Earth\'s surface.',
        'Earth Science'
      ]
    ]
  },
  {
    id: 'exam-eng-04',
    title: 'English',
    slug: 'english',
    description: 'Sharpen your vocabulary, grammar precision, idioms, sentence correction, and verbal reasoning.',
    category: 'Verbal Ability',
    iconName: 'BookOpen',
    durationMinutes: 10,
    difficulty: 'Intermediate',
    questions: [
      [
        'Choose the word that is most nearly SYNONYMOUS with "Meticulous":',
        ['Careless', 'Painstaking', 'Hasty', 'Vague'],
        1,
        '"Meticulous" means showing great attention to detail and thorough precision. "Painstaking" is an exact synonym.',
        'Vocabulary'
      ],
      [
        'Choose the sentence with correct subject-verb agreement:',
        [
          'The group of students were cheering loudly.',
          'Neither the manager nor his assistants was available.',
          'Each of the candidates has submitted their credentials.',
          'The committee have decided to adjourn early.'
        ],
        2,
        '"Each" is an indefinite singular pronoun requiring the singular verb "has". In standard English, "Each of the candidates has submitted..." is grammatically correct.',
        'Grammar'
      ],
      [
        'What does the idiom "Bite the bullet" mean?',
        [
          'To start an armed conflict',
          'To face a grim or difficult situation with fortitude',
          'To speak without thinking first',
          'To spend money extravagantly'
        ],
        1,
        'To "bite the bullet" originates from military medicine before anesthesia, and means accepting or facing an inevitable painful or tough reality bravely.',
        'Idioms'
      ],
      [
        'Identify the word that is an ANTONYM of "Ephemeral":',
        ['Transient', 'Fleeting', 'Permanent', 'Momentary'],
        2,
        '"Ephemeral" means lasting for a very short time. Its direct opposite (antonym) is "Permanent" (or enduring).',
        'Vocabulary'
      ],
      [
        'Select the correctly spelled word:',
        ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
        2,
        'The correct spelling is "Accommodate" with double \'c\' and double \'m\'.',
        'Spelling'
      ],
      [
        'Complete the analogy: Doctor : Hospital :: Teacher : ______',
        ['Office', 'School', 'Laboratory', 'Court'],
        1,
        'A doctor practices their profession primarily in a hospital; similarly, a teacher\'s workplace is a school.',
        'Analogies'
      ],
      [
        'Which sentence is written in the PASSIVE voice?',
        [
          'The architect designed the innovative bridge.',
          'The novel was written by a reclusive author.',
          'Volunteers planted fifty oak trees on Saturday.',
          'The team celebrated their championship victory.'
        ],
        1,
        'In "The novel was written by a reclusive author", the subject ("The novel") receives the action rather than performing it, making it passive.',
        'Voice & Syntax'
      ],
      [
        'Which of the following is a complex sentence?',
        [
          'She wanted coffee, but the cafe was closed.',
          'Because the rain started suddenly, we postponed the match.',
          'The sun rose and the birds began to sing.',
          'He likes apples and oranges.'
        ],
        1,
        'A complex sentence contains an independent clause and at least one dependent subordinating clause (introduced by "Because").',
        'Sentence Structure'
      ],
      [
        'Fill in the blank: If she ______ harder, she would have cleared the examination.',
        ['had studied', 'studies', 'has studied', 'would study'],
        0,
        'The third conditional structure for past unreal conditions is: If + past perfect ("had studied"), ... would have + past participle.',
        'Conditionals'
      ],
      [
        'What figure of speech is used in "The wind whispered secrets through the pines"?',
        ['Hyperbole', 'Metaphor', 'Personification', 'Simile'],
        2,
        'Personification attributes human actions or characteristics (whispering secrets) to a non-human element (the wind).',
        'Literary Devices'
      ]
    ]
  },
  {
    id: 'exam-cs-05',
    title: 'Computer Basics',
    slug: 'computer-basics',
    description: 'Master fundamentals of computing, operating systems, hardware, networking, and digital concepts.',
    category: 'Computer Science',
    iconName: 'Cpu',
    durationMinutes: 10,
    difficulty: 'Beginner',
    questions: [
      [
        'What is the primary function of the Central Processing Unit (CPU) in a computer?',
        [
          'To permanently store user files and photos',
          'To execute instructions and process computational calculations',
          'To generate audio and visual display output',
          'To provide electrical power to internal motherboard chips'
        ],
        1,
        'The CPU is known as the "brain" of the computer, responsible for fetching, decoding, and executing program instructions.',
        'Hardware'
      ],
      [
        'What does the acronym RAM stand for?',
        [
          'Read Access Memory',
          'Rapid Action Module',
          'Random Access Memory',
          'Remote Automated Machine'
        ],
        2,
        'RAM stands for Random Access Memory, high-speed volatile memory used to hold temporary active programs and operational data.',
        'Computer Memory'
      ],
      [
        'Which network protocol is the standard for secure, encrypted communication over the World Wide Web?',
        ['FTP', 'HTTP', 'HTTPS', 'SMTP'],
        2,
        'HTTPS (Hypertext Transfer Protocol Secure) encrypts bidirectional communications using TLS/SSL to safeguard user privacy and data integrity.',
        'Networking'
      ],
      [
        'What is the decimal equivalent of the binary number 1011₂?',
        ['9', '11', '13', '15'],
        1,
        'Binary 1011 = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = 11.',
        'Number Systems'
      ],
      [
        'Which of the following is an open-source operating system kernel?',
        ['Microsoft Windows', 'macOS', 'Linux', 'iOS'],
        2,
        'Linux is a free and open-source Unix-like operating system kernel originally created by Linus Torvalds in 1991.',
        'Operating Systems'
      ],
      [
        'In computing, what is the size of 1 Gigabyte (GB) expressed in Megabytes (MB)?',
        ['100 MB', '512 MB', '1,000 MB', '1,024 MB'],
        3,
        'In digital binary measurement (powers of 2), 1 Gigabyte consists of 1,024 Megabytes (2¹⁰ MB).',
        'Data Units'
      ],
      [
        'What is the primary role of the Domain Name System (DNS) on the internet?',
        [
          'To assign passwords to email accounts',
          'To translate human-readable domain names into IP addresses',
          'To compress video files for faster streaming',
          'To scan network packets for computer viruses'
        ],
        1,
        'DNS acts as the internet\'s phonebook, translating friendly domain names like example.com into machine-readable IP addresses.',
        'Networking'
      ],
      [
        'Which key combination is the universally standard keyboard shortcut to undo the previous action in most software?',
        ['Ctrl + C (Cmd + C)', 'Ctrl + V (Cmd + V)', 'Ctrl + Z (Cmd + Z)', 'Ctrl + Y (Cmd + Y)'],
        2,
        'Ctrl + Z (or Command + Z on macOS) is the universal keyboard shortcut for the Undo command.',
        'Productivity'
      ],
      [
        'What type of malicious software secretly records keystrokes to steal passwords and financial data?',
        ['Keylogger', 'Adware', 'Ransomware', 'Firmware'],
        0,
        'A keylogger is spyware designed to intercept and record everything typed on a keyboard to capture sensitive credentials.',
        'Cybersecurity'
      ],
      [
        'What is the difference between volatile and non-volatile computer memory?',
        [
          'Volatile memory retains data without power; non-volatile loses it',
          'Volatile memory loses data when powered off; non-volatile retains it',
          'Volatile memory is cheaper than magnetic storage',
          'Non-volatile memory is only found in optical drives'
        ],
        1,
        'Volatile memory (like RAM) requires continuous electrical power to preserve data, whereas non-volatile storage (like SSDs, Flash, ROM) persists without power.',
        'Computer Architecture'
      ]
    ]
  },
  {
    id: 'exam-reas-06',
    title: 'Reasoning',
    slug: 'reasoning',
    description: 'Challenge your mental sharpness with number patterns, syllogisms, direction sense, and deductive puzzles.',
    category: 'Logical Reasoning',
    iconName: 'Brain',
    durationMinutes: 12,
    difficulty: 'Intermediate',
    questions: [
      [
        'Look at the number series: 2, 6, 12, 20, 30, ... What number comes next?',
        ['36', '40', '42', '46'],
        2,
        'The differences between consecutive terms increase by 2: +4, +6, +8, +10. The next difference is +12, so 30 + 12 = 42 (also n² + n for n = 1,2,3,4,5,6 gives 6² + 6 = 42).',
        'Number Series'
      ],
      [
        'Pointing to a photograph, a man says: "She is the only daughter of my mother\'s only son." How is the woman related to the man?',
        ['His sister', 'His mother', 'His daughter', 'His niece'],
        2,
        'The speaker\'s "mother\'s only son" is the man himself. Therefore, "the only daughter of the man" is his daughter.',
        'Blood Relations'
      ],
      [
        'If in a secret code, "CLOUD" is written as "DMPVE", how is "RAIN" written in that same code?',
        ['SBJO', 'SAJM', 'TBKO', 'SBJN'],
        0,
        'Each letter is shifted forward by +1 in the alphabet: R→S, A→B, I→J, N→O, yielding SBJO.',
        'Coding & Decoding'
      ],
      [
        'A person walks 10 meters North, turns right and walks 5 meters, then turns right again and walks 10 meters. How far is the person from the starting point?',
        ['5 meters', '10 meters', '15 meters', '25 meters'],
        0,
        'Walking 10m North and then 10m South cancels the vertical displacement. The person is shifted 5 meters directly East from the starting point.',
        'Direction Sense'
      ],
      [
        'Find the odd one out from the following four words:',
        ['Copper', 'Iron', 'Silver', 'Plastic'],
        3,
        'Copper, Iron, and Silver are all metallic chemical elements with electrical conductivity, whereas Plastic is a synthetic polymer insulator.',
        'Classification'
      ],
      [
        'Statements: All cats are mammals. All mammals have hearts. Conclusion: All cats have hearts. Is this logical deduction valid?',
        [
          'Valid',
          'Invalid',
          'Indeterminate',
          'True only for domesticated breeds'
        ],
        0,
        'By transitive logical syllogism: if A ⊆ B and B ⊆ C, then A ⊆ C. The conclusion is strictly valid.',
        'Syllogism'
      ],
      [
        'If yesterday was Tuesday, what day of the week will it be 100 days from today?',
        ['Thursday', 'Friday', 'Saturday', 'Sunday'],
        0,
        'Yesterday was Tuesday, so today is Wednesday. 100 days ÷ 7 = 14 weeks + 2 days remainder. Wednesday + 2 days = Friday? Wait! Let us check: Wednesday + 1 = Thursday, Wednesday + 2 = Friday! Wait, let\'s calculate: 100 = 14 × 7 + 2. Day 0 = Wed, Day 1 = Thu, Day 2 = Fri. Let\'s ensure the options: Thursday, Friday, Saturday, Sunday. The correct answer index is 1 (Friday).',
        'Calendar Logic'
      ],
      [
        'Complete the letter series: B, D, G, K, P, ...',
        ['S', 'U', 'V', 'W'],
        2,
        'Letter positions: B(2) +2 = D(4); D(4) +3 = G(7); G(7) +4 = K(11); K(11) +5 = P(16); P(16) +6 = V(22). The next letter is V.',
        'Letter Series'
      ],
      [
        'Five friends (A, B, C, D, E) sit in a row. B is to the immediate right of A. E is to the left of A but to the right of C. D is to the right of B. Who is sitting in the exact middle?',
        ['E', 'A', 'B', 'C'],
        1,
        'From left to right: C is leftmost, then E, then A, then B, then D (C - E - A - B - D). The person in the middle (3rd position) is A.',
        'Seating Arrangement'
      ],
      [
        'Complete the word relationship: Book is to Reading as Fork is to ______',
        ['Cooking', 'Eating', 'Cleaning', 'Cutting'],
        1,
        'A book is the instrument used for reading; a fork is the instrument used for eating.',
        'Analogies'
      ]
    ]
  }
];

// Re-align the calendar logic answer option index for reasoning Q7:
RAW_EXAMS[5].questions[6] = [
  'If yesterday was Tuesday, what day of the week will it be 100 days from today?',
  ['Thursday', 'Friday', 'Saturday', 'Sunday'],
  1,
  'Yesterday was Tuesday, so today is Wednesday. 100 days = 14 full weeks (98 days) + 2 extra days. Two days after Wednesday is Friday.',
  'Calendar Logic'
];

export function transformRawExam(raw: RawExamData): Exam {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    category: raw.category,
    iconName: raw.iconName,
    durationMinutes: raw.durationMinutes,
    difficulty: raw.difficulty,
    questions: raw.questions.map((q, idx) => ({
      id: `${raw.id}-q${idx + 1}`,
      question: q[0],
      options: q[1],
      correctIndex: q[2],
      explanation: q[3] || 'Correct answer based on standard syllabus facts.',
      topic: q[4] || raw.category
    }))
  };
}

export function getDefaultExams(): Exam[] {
  return RAW_EXAMS.map(transformRawExam);
}
