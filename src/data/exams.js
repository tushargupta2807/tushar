/**
 * 6 Subjects, 10 Questions each with 4 options and correctIndex.
 * Format for questions: [question, [4 options], correctIndex]
 */
export const exams = [
  {
    id: 'exam-gk-01',
    title: 'General Knowledge',
    slug: 'general-knowledge',
    category: 'General Awareness',
    durationMinutes: 10,
    questions: [
      [
        'Which is the longest river in the world by total length?',
        ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        1
      ],
      [
        'In which year was the United Nations (UN) officially founded?',
        ['1919', '1942', '1945', '1950'],
        2
      ],
      [
        'What is the capital city of Australia?',
        ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        2
      ],
      [
        'Which planet in our solar system has the highest number of recognized moons?',
        ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
        1
      ],
      [
        'Who was the first woman to win a Nobel Prize and the only person to win in two scientific fields?',
        ['Rosalind Franklin', 'Marie Curie', 'Ada Lovelace', 'Lise Meitner'],
        1
      ],
      [
        'The Great Barrier Reef is situated off the coast of which country?',
        ['Indonesia', 'Australia', 'Brazil', 'South Africa'],
        1
      ],
      [
        'Which country has the official currency named the Rand?',
        ['Kenya', 'Nigeria', 'South Africa', 'Egypt'],
        2
      ],
      [
        'Which canal connects the Mediterranean Sea directly to the Red Sea?',
        ['Panama Canal', 'Suez Canal', 'Kiel Canal', 'Corinth Canal'],
        1
      ],
      [
        'What is the deepest known oceanic trench on Earth?',
        ['Puerto Rico Trench', 'Java Trench', 'Mariana Trench', 'Tonga Trench'],
        2
      ],
      [
        'Who painted the ceiling of the Sistine Chapel in Rome?',
        ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
        1
      ]
    ]
  },
  {
    id: 'exam-math-02',
    title: 'Mathematics',
    slug: 'mathematics',
    category: 'Quantitative Aptitude',
    durationMinutes: 15,
    questions: [
      [
        'If a shirt originally priced at $80 is sold at a 25% discount, what is the final sale price?',
        ['$55', '$60', '$65', '$70'],
        1
      ],
      [
        'What are the roots of the quadratic equation x² - 5x + 6 = 0?',
        ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = -6'],
        0
      ],
      [
        'A train travels 180 km in 2.5 hours. What is its average speed in kilometers per hour?',
        ['68 km/h', '72 km/h', '75 km/h', '80 km/h'],
        1
      ],
      [
        'If the ratio of boys to girls in a class of 45 students is 3:2, how many girls are there?',
        ['15', '18', '27', '20'],
        1
      ],
      [
        'What is the hypotenuse of a right-angled triangle with legs of length 9 cm and 12 cm?',
        ['14 cm', '15 cm', '16 cm', '17 cm'],
        1
      ],
      [
        'What is the simple interest on a principal of $2,000 invested at 5% annual interest for 3 years?',
        ['$250', '$300', '$320', '$350'],
        1
      ],
      [
        'A fair six-sided die is rolled once. What is the probability of rolling a prime number?',
        ['1/6', '1/3', '1/2', '2/3'],
        2
      ],
      [
        'What is the next number in the arithmetic progression: 7, 13, 19, 25, ...?',
        ['29', '31', '32', '34'],
        1
      ],
      [
        'If 3x + 7 = 28, what is the value of 2x - 3?',
        ['9', '11', '14', '7'],
        1
      ],
      [
        'A shopkeeper buys an item for $150 and sells it for $195. What is the percentage profit?',
        ['25%', '30%', '35%', '40%'],
        1
      ]
    ]
  },
  {
    id: 'exam-sci-03',
    title: 'Science',
    slug: 'science',
    category: 'Natural Sciences',
    durationMinutes: 12,
    questions: [
      [
        'What organelle is known as the powerhouse of the eukaryotic cell?',
        ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
        1
      ],
      [
        'What is the approximate speed of light in a vacuum?',
        ['30,000 km/s', '150,000 km/s', '300,000 km/s', '3,000,000 km/s'],
        2
      ],
      [
        'What is the chemical formula for ordinary table salt?',
        ['KCl', 'NaCl', 'CaCl2', 'NaHCO3'],
        1
      ],
      [
        'Which gas is absorbed by green plants during the daylight process of photosynthesis?',
        ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
        1
      ],
      [
        'What is Newton\'s First Law of Motion commonly referred to as?',
        ['Law of Universal Gravitation', 'Law of Inertia', 'Law of Acceleration', 'Law of Action and Reaction'],
        1
      ],
      [
        'Which human blood type is considered the universal red blood cell donor?',
        ['Type A Positive', 'Type AB Positive', 'Type O Negative', 'Type B Negative'],
        2
      ],
      [
        'What does pH stand for, and what pH value represents a neutral solution at 25°C?',
        ['Potential of Hydrogen; pH 7', 'Power of Helium; pH 0', 'Percent Hydroxide; pH 14', 'Pressure of Hydrogen; pH 5'],
        0
      ],
      [
        'Sound waves cannot travel through which of the following mediums?',
        ['Water', 'Steel', 'Vacuum', 'Air'],
        2
      ],
      [
        'Which element has the atomic number 1 in the periodic table?',
        ['Helium', 'Hydrogen', 'Carbon', 'Lithium'],
        1
      ],
      [
        'Which layer of Earth\'s atmosphere contains the ozone layer that absorbs harmful ultraviolet radiation?',
        ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
        1
      ]
    ]
  },
  {
    id: 'exam-eng-04',
    title: 'English',
    slug: 'english',
    category: 'Verbal Ability',
    durationMinutes: 10,
    questions: [
      [
        'Choose the word that is most nearly SYNONYMOUS with "Meticulous":',
        ['Careless', 'Painstaking', 'Hasty', 'Vague'],
        1
      ],
      [
        'Choose the sentence with correct subject-verb agreement:',
        [
          'The group of students were cheering loudly.',
          'Neither the manager nor his assistants was available.',
          'Each of the candidates has submitted their credentials.',
          'The committee have decided to adjourn early.'
        ],
        2
      ],
      [
        'What does the idiom "Bite the bullet" mean?',
        [
          'To start an armed conflict',
          'To face a grim or difficult situation with fortitude',
          'To speak without thinking first',
          'To spend money extravagantly'
        ],
        1
      ],
      [
        'Identify the word that is an ANTONYM of "Ephemeral":',
        ['Transient', 'Fleeting', 'Permanent', 'Momentary'],
        2
      ],
      [
        'Select the correctly spelled word:',
        ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
        2
      ],
      [
        'Complete the analogy: Doctor : Hospital :: Teacher : ______',
        ['Office', 'School', 'Laboratory', 'Court'],
        1
      ],
      [
        'Which sentence is written in the PASSIVE voice?',
        [
          'The architect designed the innovative bridge.',
          'The novel was written by a reclusive author.',
          'Volunteers planted fifty oak trees on Saturday.',
          'The team celebrated their championship victory.'
        ],
        1
      ],
      [
        'Which of the following is a complex sentence?',
        [
          'She wanted coffee, but the cafe was closed.',
          'Because the rain started suddenly, we postponed the match.',
          'The sun rose and the birds began to sing.',
          'He likes apples and oranges.'
        ],
        1
      ],
      [
        'Fill in the blank: If she ______ harder, she would have cleared the examination.',
        ['had studied', 'studies', 'has studied', 'would study'],
        0
      ],
      [
        'What figure of speech is used in "The wind whispered secrets through the pines"?',
        ['Hyperbole', 'Metaphor', 'Personification', 'Simile'],
        2
      ]
    ]
  },
  {
    id: 'exam-cs-05',
    title: 'Computer Basics',
    slug: 'computer-basics',
    category: 'Computer Science',
    durationMinutes: 10,
    questions: [
      [
        'What is the primary function of the Central Processing Unit (CPU) in a computer?',
        [
          'To permanently store user files and photos',
          'To execute instructions and process computational calculations',
          'To generate audio and visual display output',
          'To provide electrical power to internal motherboard chips'
        ],
        1
      ],
      [
        'What does the acronym RAM stand for?',
        [
          'Read Access Memory',
          'Rapid Action Module',
          'Random Access Memory',
          'Remote Automated Machine'
        ],
        2
      ],
      [
        'Which network protocol is the standard for secure, encrypted communication over the World Wide Web?',
        ['FTP', 'HTTP', 'HTTPS', 'SMTP'],
        2
      ],
      [
        'What is the decimal equivalent of the binary number 1011₂?',
        ['9', '11', '13', '15'],
        1
      ],
      [
        'Which of the following is an open-source operating system kernel?',
        ['Microsoft Windows', 'macOS', 'Linux', 'iOS'],
        2
      ],
      [
        'In computing, what is the size of 1 Gigabyte (GB) expressed in Megabytes (MB)?',
        ['100 MB', '512 MB', '1,000 MB', '1,024 MB'],
        3
      ],
      [
        'What is the primary role of the Domain Name System (DNS) on the internet?',
        [
          'To assign passwords to email accounts',
          'To translate human-readable domain names into IP addresses',
          'To compress video files for faster streaming',
          'To scan network packets for computer viruses'
        ],
        1
      ],
      [
        'Which key combination is the universally standard keyboard shortcut to undo the previous action in most software?',
        ['Ctrl + C (Cmd + C)', 'Ctrl + V (Cmd + V)', 'Ctrl + Z (Cmd + Z)', 'Ctrl + Y (Cmd + Y)'],
        2
      ],
      [
        'What type of malicious software secretly records keystrokes to steal passwords and financial data?',
        ['Keylogger', 'Adware', 'Ransomware', 'Firmware'],
        0
      ],
      [
        'What is the difference between volatile and non-volatile computer memory?',
        [
          'Volatile memory retains data without power; non-volatile loses it',
          'Volatile memory loses data when powered off; non-volatile retains it',
          'Volatile memory is cheaper than magnetic storage',
          'Non-volatile memory is only found in optical drives'
        ],
        1
      ]
    ]
  },
  {
    id: 'exam-reas-06',
    title: 'Reasoning',
    slug: 'reasoning',
    category: 'Logical Reasoning',
    durationMinutes: 12,
    questions: [
      [
        'Look at the number series: 2, 6, 12, 20, 30, ... What number comes next?',
        ['36', '40', '42', '46'],
        2
      ],
      [
        'Pointing to a photograph, a man says: "She is the only daughter of my mother\'s only son." How is the woman related to the man?',
        ['His sister', 'His mother', 'His daughter', 'His niece'],
        2
      ],
      [
        'If in a secret code, "CLOUD" is written as "DMPVE", how is "RAIN" written in that same code?',
        ['SBJO', 'SAJM', 'TBKO', 'SBJN'],
        0
      ],
      [
        'A person walks 10 meters North, turns right and walks 5 meters, then turns right again and walks 10 meters. How far is the person from the starting point?',
        ['5 meters', '10 meters', '15 meters', '25 meters'],
        0
      ],
      [
        'Find the odd one out from the following four words:',
        ['Copper', 'Iron', 'Silver', 'Plastic'],
        3
      ],
      [
        'Statements: All cats are mammals. All mammals have hearts. Conclusion: All cats have hearts. Is this logical deduction valid?',
        [
          'Valid',
          'Invalid',
          'Indeterminate',
          'True only for domesticated breeds'
        ],
        0
      ],
      [
        'If yesterday was Tuesday, what day of the week will it be 100 days from today?',
        ['Thursday', 'Friday', 'Saturday', 'Sunday'],
        1
      ],
      [
        'Complete the letter series: B, D, G, K, P, ...',
        ['S', 'U', 'V', 'W'],
        2
      ],
      [
        'Five friends (A, B, C, D, E) sit in a row. B is to the immediate right of A. E is to the left of A but to the right of C. D is to the right of B. Who is sitting in the exact middle?',
        ['E', 'A', 'B', 'C'],
        1
      ],
      [
        'Complete the word relationship: Book is to Reading as Fork is to ______',
        ['Cooking', 'Eating', 'Cleaning', 'Cutting'],
        1
      ]
    ]
  }
];

export function getDefaultExams() {
  return exams.map((exam) => ({
    id: exam.id,
    title: exam.title,
    slug: exam.slug,
    description: `Comprehensive 10-question test evaluating your understanding of ${exam.title}.`,
    category: exam.category,
    iconName: exam.id.includes('gk') ? 'Globe' : exam.id.includes('math') ? 'Calculator' : exam.id.includes('sci') ? 'Atom' : exam.id.includes('eng') ? 'BookOpen' : exam.id.includes('cs') ? 'Cpu' : 'Brain',
    durationMinutes: exam.durationMinutes,
    difficulty: exam.id.includes('cs') ? 'Beginner' : 'Intermediate',
    questions: exam.questions.map((q, idx) => ({
      id: `${exam.id}-q${idx + 1}`,
      question: q[0],
      options: q[1],
      correctIndex: q[2],
      explanation: `Correct answer is option ${String.fromCharCode(65 + q[2])}: ${q[1][q[2]]}. Verified against the standard syllabus curriculum.`,
      topic: exam.category
    }))
  }));
}
