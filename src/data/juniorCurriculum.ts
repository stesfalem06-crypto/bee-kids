import { UnitNotes, SubjectInfo } from './types';

export const SUBJECTS_CONFIG: SubjectInfo[] = [
  {
    key: 'math',
    name: 'Mathematics',
    tigrinyaName: 'ሒሳብ',
    icon: 'Calculator',
    color: 'text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/30',
    description: 'Numbers, Integers, Algebra, Geometry & Problem Solving'
  },
  {
    key: 'science',
    name: 'General Science',
    tigrinyaName: 'ሳይንስ',
    icon: 'Atom',
    color: 'text-teal-400',
    accentBg: 'bg-teal-500/10 border-teal-500/30',
    description: 'Biology, Physics, Chemistry, Earth & Space'
  },
  {
    key: 'english',
    name: 'English Grammar & Reading',
    tigrinyaName: 'እንግሊዝኛ',
    icon: 'BookOpen',
    color: 'text-sky-400',
    accentBg: 'bg-sky-500/10 border-sky-500/30',
    description: 'Grammar mechanics, Comprehension, Vocabulary & Dialogues'
  },
  {
    key: 'social_studies',
    name: 'Social Studies',
    tigrinyaName: 'ማሕበራዊ ትምህርቲ',
    icon: 'Globe',
    color: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'Geography of Eritrea, African History & World Cultures'
  },
  {
    key: 'citizenship',
    name: 'Citizenship Education',
    tigrinyaName: 'ስነ-ዜጋ',
    icon: 'Shield',
    color: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10 border-indigo-500/30',
    description: 'Civic values, National symbols, Rights & Responsibilities'
  },
  {
    key: 'ict',
    name: 'ICT Computer Studies',
    tigrinyaName: 'ቴክኖሎጂ',
    icon: 'Laptop',
    color: 'text-violet-400',
    accentBg: 'bg-violet-500/10 border-violet-500/30',
    description: 'Computer systems, Data processing, Operating systems & Web'
  },
  {
    key: 'life_skills',
    name: 'Life Skills & Health',
    tigrinyaName: 'ናይ ህይወት ክእለት',
    icon: 'HeartHandshake',
    color: 'text-rose-400',
    accentBg: 'bg-rose-500/10 border-rose-500/30',
    description: 'Adolescent health, Decision making & Career exploration'
  }
];

export const JUNIOR_CURRICULUM_UNITS: UnitNotes[] = [
  {
    "id": "g6_math_u1",
    "grade": 6,
    "subject": "Mathematics",
    "subjectKey": "math",
    "unitNumber": 1,
    "title": "Welcome to Banuna Pizzeria (Quantity, Price & Equations)",
    "summary": "Explore practical math through commerce at Banuna Pizzeria in Asmara. Learn how unit price relates to total cost, formulate algebraic equations, and solve single-step equations with variables.",
    "keyTerms": [
      "Quantity",
      "Unit Price",
      "Total Cost",
      "Variable",
      "Equation",
      "Unknown Term"
    ],
    "keyIdeas": [
      "Total Cost = Unit Price × Quantity.",
      "When the quantity increases, the total cost increases in direct linear proportion.",
      "An equation uses an equals sign (=) to assert equality between two mathematical expressions."
    ],
    "sections": [
      {
        "title": "What Did They Buy? What Did It Cost?",
        "content": "At Banuna Pizzeria in Asmara, a slice of vegetable pizza costs 25 Nakfa and fresh fruit juice costs 15 Nakfa. If Senait buys p pizza slices and j juices, her total expense is 25p + 15j. Defining variables for everyday objects helps translate real situations into mathematical models."
      },
      {
        "title": "Quantity and Price Proportions",
        "content": "If 1 pizza costs 45 Nakfa, 2 pizzas cost 90 Nakfa, and 3 cost 135 Nakfa. We express this with the direct variation formula C = 45q, where C is total cost in Nakfa and q is quantity."
      }
    ],
    "examples": [
      {
        "title": "Calculating Bill at Banuna Pizzeria",
        "problem": "Bereket orders 3 medium pizzas at 60 Nakfa each and 4 sodas at 12 Nakfa each. What is the total bill?",
        "solutionSteps": [
          "Step 1: Calculate cost of pizzas: 3 × 60 = 180 Nakfa.",
          "Step 2: Calculate cost of sodas: 4 × 12 = 48 Nakfa.",
          "Step 3: Sum the amounts: 180 + 48 = 228 Nakfa."
        ],
        "finalAnswer": "228 Nakfa"
      }
    ],
    "exercises": [
      {
        "id": "g6_math_u1_q1",
        "num": 1,
        "question": "If 1 loaf of bread in Keren costs 4 Nakfa, what is the cost of 18 loaves?",
        "options": [
          "64 Nakfa",
          "72 Nakfa",
          "80 Nakfa",
          "84 Nakfa"
        ],
        "answer": "72 Nakfa",
        "explanation": "Cost = 18 × 4 = 72 Nakfa."
      },
      {
        "id": "g6_math_u1_q2",
        "num": 2,
        "question": "Solve for x: 5x + 20 = 70.",
        "options": [
          "8",
          "10",
          "12",
          "14"
        ],
        "answer": "10",
        "explanation": "Subtract 20 from both sides: 5x = 50. Divide by 5: x = 10."
      }
    ]
  },
  {
    "id": "g6_math_u2",
    "grade": 6,
    "subject": "Mathematics",
    "subjectKey": "math",
    "unitNumber": 2,
    "title": "Numbers - Operating on Whole Numbers & Integers",
    "summary": "Master operations on whole numbers up to millions, commutative, associative, and distributive properties, and integer operations on the number line.",
    "keyTerms": [
      "Place Value",
      "Commutative Property",
      "Associative Property",
      "Distributive Property",
      "Integers",
      "Negative Numbers"
    ],
    "keyIdeas": [
      "Commutative Law: a + b = b + a and a × b = b × a.",
      "Distributive Law: a × (b + c) = (a × b) + (a × c).",
      "Integers include negative numbers, zero, and positive numbers."
    ],
    "sections": [
      {
        "title": "Properties of Operations",
        "content": "Operations on whole numbers obey fundamental laws. Using the distributive property: 7 × 106 = 7 × (100 + 6) = 700 + 42 = 742."
      }
    ],
    "examples": [
      {
        "title": "Integer Operations",
        "problem": "Evaluate (-15) + (+9) - (-6).",
        "solutionSteps": [
          "Step 1: Add (-15) + 9 = -6.",
          "Step 2: Subtracting negative is adding: -6 - (-6) = -6 + 6.",
          "Step 3: Result is 0."
        ],
        "finalAnswer": "0"
      }
    ],
    "exercises": [
      {
        "id": "g6_math_u2_q1",
        "num": 1,
        "question": "What is (-8) × (-6)?",
        "options": [
          "-48",
          "48",
          "-14",
          "14"
        ],
        "answer": "48",
        "explanation": "The product of two negative integers is positive: (-8) × (-6) = +48."
      }
    ]
  },
  {
    "id": "g6_sci_u1",
    "grade": 6,
    "subject": "General Science",
    "subjectKey": "science",
    "unitNumber": 1,
    "title": "Living Things & The Optical Microscope",
    "summary": "Explore cell theory, parts of animal and plant cells, optical light microscopes, and the fundamental characteristics of living organisms.",
    "keyTerms": [
      "Cell",
      "Microscope",
      "Cytoplasm",
      "Nucleus",
      "Cell Wall",
      "Chloroplast",
      "Vacuole"
    ],
    "keyIdeas": [
      "All living organisms are made of cells.",
      "Plant cells have a cellulose cell wall, large vacuole, and chloroplasts for photosynthesis.",
      "Total Magnification = Eyepiece Magnification × Objective Lens Magnification."
    ],
    "sections": [
      {
        "title": "Microscope Anatomy & Magnification",
        "content": "The light microscope magnifies microscopic specimens using objective lenses (4x, 10x, 40x) and an eyepiece (10x). Total magnification for high power is 10 × 40 = 400x."
      }
    ],
    "examples": [
      {
        "title": "Calculating Magnification",
        "problem": "Find the magnification using a 10x ocular lens and a 40x objective lens.",
        "solutionSteps": [
          "Multiply 10 by 40: 10 × 40 = 400x."
        ],
        "finalAnswer": "400x"
      }
    ],
    "exercises": [
      {
        "id": "g6_sci_u1_q1",
        "num": 1,
        "question": "Which organelle is found in plant cells but NOT animal cells?",
        "options": [
          "Mitochondria",
          "Cell membrane",
          "Chloroplast",
          "Nucleus"
        ],
        "answer": "Chloroplast",
        "explanation": "Chloroplasts contain chlorophyll for photosynthesis and are exclusive to plant cells."
      }
    ]
  },
  {
    "id": "g6_soc_u1",
    "grade": 6,
    "subject": "Social Studies",
    "subjectKey": "social_studies",
    "unitNumber": 1,
    "title": "Geography & Regions of Eritrea (The Six Zobas)",
    "summary": "Study the geographic landscape, administrative zobas (Maekel, Debub, Anseba, Gash-Barka, Semenawi Keyih Bahri, Debubawi Keyih Bahri), climates, and natural resources of Eritrea.",
    "keyTerms": [
      "Zoba",
      "Highlands",
      "Lowlands",
      "Coastal Plain",
      "Danakil Depression",
      "Red Sea Coastline"
    ],
    "keyIdeas": [
      "Eritrea has six administrative regions (Zobas) with distinct topography and climate zones.",
      "The central highlands enjoy temperate weather, while the eastern and western lowlands experience tropical and semi-arid conditions.",
      "Eritrea's coastline spans over 1,200 km along the vital international Red Sea trade route."
    ],
    "sections": [
      {
        "title": "The Six Administrative Regions of Eritrea",
        "content": "Zoba Maekel contains the capital Asmara. Zoba Debub hosts historic towns and high agricultural output. Zoba Gash-Barka is the vast western agricultural hub. Zoba Anseba centers around Keren. The two coastal regions, Semenawi and Debubawi Keyih Bahri, border the Red Sea with ports at Massawa and Assab."
      }
    ],
    "examples": [
      {
        "title": "Zoba Capital Matching",
        "problem": "Name the capital cities of Zoba Anseba and Zoba Semenawi Keyih Bahri.",
        "solutionSteps": [
          "Zoba Anseba administrative capital is Keren.",
          "Zoba Semenawi Keyih Bahri administrative capital is the historic port city of Massawa."
        ],
        "finalAnswer": "Keren and Massawa"
      }
    ],
    "exercises": [
      {
        "id": "g6_soc_u1_q1",
        "num": 1,
        "question": "Which administrative region of Eritrea is bordered by the southern Red Sea with Assab as its primary port?",
        "options": [
          "Zoba Maekel",
          "Zoba Gash-Barka",
          "Zoba Debubawi Keyih Bahri",
          "Zoba Anseba"
        ],
        "answer": "Zoba Debubawi Keyih Bahri",
        "explanation": "Zoba Debubawi Keyih Bahri (Southern Red Sea region) encompasses the southern coastline and the port city of Assab."
      }
    ]
  },
  {
    "id": "g6_cit_u1",
    "grade": 6,
    "subject": "Citizenship Education",
    "subjectKey": "citizenship",
    "unitNumber": 1,
    "title": "Being a Responsible Young Person & Family Duties",
    "summary": "Learn self-identity, exhibiting responsible behavior in family and community, understanding rights and duties, and cultivating positive friendships.",
    "keyTerms": [
      "Responsibility",
      "Self-discipline",
      "Family Duties",
      "Cooperation",
      "Civic Respect"
    ],
    "keyIdeas": [
      "A responsible person takes accountability for their actions and helps at home and school.",
      "Cooperation and respect for elders are central virtues in Eritrean communities.",
      "Preserving public property and cleanliness is every citizen's obligation."
    ],
    "sections": [
      {
        "title": "Demonstrating Civic Responsibility",
        "content": "Responsibility is shown by completing assignments on time, assisting family with chores, caring for younger siblings, and participating in neighborhood cleanup (maetot)."
      }
    ],
    "examples": [
      {
        "title": "Community Service Role",
        "problem": "How can a student practice civic responsibility in their village or town?",
        "solutionSteps": [
          "1. Participate in communal environmental cleanup.",
          "2. Respect elders and public rules.",
          "3. Protect trees and public water taps."
        ],
        "finalAnswer": "Active communal care and environmental preservation."
      }
    ],
    "exercises": [
      {
        "id": "g6_cit_u1_q1",
        "num": 1,
        "question": "Which of the following demonstrates responsible behavior at school?",
        "options": [
          "Arriving late to class",
          "Damaging library books",
          "Listening attentively to teachers and peers",
          "Blaming others for mistakes"
        ],
        "answer": "Listening attentively to teachers and peers",
        "explanation": "Respectful listening and active cooperation demonstrate civic maturity."
      }
    ]
  },
  {
    "id": "g6_eng_u1",
    "grade": 6,
    "subject": "English Grammar & Reading",
    "subjectKey": "english",
    "unitNumber": 1,
    "title": "Everyday Communication, Parts of Speech & Folktales",
    "summary": "Understand nouns, pronouns, present continuous vs simple present tense, sentence punctuation, and read traditional Eritrean folktales.",
    "keyTerms": [
      "Common Noun",
      "Proper Noun",
      "Pronoun",
      "Subject-Verb Agreement",
      "Punctuation"
    ],
    "keyIdeas": [
      "A proper noun begins with a capital letter and names specific persons, places, or days.",
      "Subject-verb agreement: singular subjects take singular verbs with 's' or 'es' in the simple present tense."
    ],
    "sections": [
      {
        "title": "Nouns and Pronouns in Context",
        "content": "A noun names a person, place, or thing. A pronoun takes the place of a noun to avoid unnecessary repetition (e.g. 'Bereket went to Massawa because he wanted to see the sea')."
      }
    ],
    "examples": [
      {
        "title": "Identifying Subject Pronoun",
        "problem": "Replace the underlined subject with a pronoun: 'Almaz and Helen visited the National Museum.'",
        "solutionSteps": [
          "Almaz and Helen is a plural third-person subject.",
          "The appropriate third-person plural subject pronoun is 'They'."
        ],
        "finalAnswer": "They visited the National Museum."
      }
    ],
    "exercises": [
      {
        "id": "g6_eng_u1_q1",
        "num": 1,
        "question": "Choose the correct verb: 'The teacher ______ the chalkboard before every lesson.'",
        "options": [
          "clean",
          "cleans",
          "cleaning",
          "cleaned have"
        ],
        "answer": "cleans",
        "explanation": "Third-person singular subject 'The teacher' takes the singular verb 'cleans'."
      }
    ]
  },
  {
    "id": "g7_math_u1",
    "grade": 7,
    "subject": "Mathematics",
    "subjectKey": "math",
    "unitNumber": 1,
    "title": "Rational Numbers, Fractions & Repeating Decimals",
    "summary": "Define rational numbers as fractions a/b (b ≠ 0). Master addition, subtraction, multiplication, and division of fractions and decimals, and convert between fractions and repeating decimals.",
    "keyTerms": [
      "Rational Number",
      "Terminating Decimal",
      "Repeating Decimal",
      "Reciprocal",
      "PEMDAS"
    ],
    "keyIdeas": [
      "A rational number is any value expressible as a quotient of integers a/b where b ≠ 0.",
      "To divide fractions, multiply by the reciprocal of the divisor: (a/b) ÷ (c/d) = (a/b) × (d/c).",
      "Rational decimal expansions either terminate or repeat."
    ],
    "sections": [
      {
        "title": "Dividing Rational Numbers",
        "content": "To compute (3/4) ÷ (-9/16): multiply by the reciprocal of -9/16, which is -16/9. (3/4) × (-16/9) = -4/3 = -1 1/3."
      }
    ],
    "examples": [
      {
        "title": "Fraction Division",
        "problem": "Evaluate (5/6) ÷ (10/3).",
        "solutionSteps": [
          "Step 1: Reciprocal of 10/3 is 3/10.",
          "Step 2: Multiply: (5/6) × (3/10).",
          "Step 3: Simplify: (5 × 3) / (6 × 10) = 15/60 = 1/4."
        ],
        "finalAnswer": "1/4"
      }
    ],
    "exercises": [
      {
        "id": "g7_math_u1_q1",
        "num": 1,
        "question": "Which of the following is NOT a rational number?",
        "options": [
          "-5/8",
          "0.75",
          "√2",
          "0"
        ],
        "answer": "√2",
        "explanation": "√2 is irrational because its decimal representation is non-terminating and non-repeating."
      }
    ]
  },
  {
    "id": "g7_sci_u1",
    "grade": 7,
    "subject": "General Science",
    "subjectKey": "science",
    "unitNumber": 1,
    "title": "Human Body Systems - Digestion & Respiration",
    "summary": "Follow the journey of nutrients through the human digestive canal, explore enzyme action, and study gas exchange in pulmonary alveoli.",
    "keyTerms": [
      "Digestive Tract",
      "Enzymes",
      "Peristalsis",
      "Stomach",
      "Villi",
      "Alveoli",
      "Capillaries"
    ],
    "keyIdeas": [
      "Digestive enzymes (amylase, pepsin, lipase) break down complex food polymers into absorbable monomers.",
      "The small intestine villi maximize surface area for nutrient absorption into capillaries.",
      "In alveoli, oxygen diffuses into blood while carbon dioxide diffuses into the lungs to be exhaled."
    ],
    "sections": [
      {
        "title": "Digestive Pathway and Enzymes",
        "content": "Digestion starts in the mouth with salivary amylase. Food travels down the esophagus via peristalsis into the stomach where pepsin and hydrochloric acid digest proteins. Pancreatic juices and bile finish digestion in the duodenum."
      }
    ],
    "examples": [
      {
        "title": "Role of Villi",
        "problem": "Why are villi critical in the small intestine?",
        "solutionSteps": [
          "1. Millions of tiny projections exponentially multiply surface area.",
          "2. Single-cell thin walls allow rapid diffusion into blood vessels."
        ],
        "finalAnswer": "Maximizes nutrient absorption rate."
      }
    ],
    "exercises": [
      {
        "id": "g7_sci_u1_q1",
        "num": 1,
        "question": "Where does the primary absorption of digested nutrients occur?",
        "options": [
          "Stomach",
          "Esophagus",
          "Small Intestine",
          "Large Intestine"
        ],
        "answer": "Small Intestine",
        "explanation": "The small intestine villi absorb glucose, amino acids, and fatty acids into circulation."
      }
    ]
  },
  {
    "id": "g7_soc_u1",
    "grade": 7,
    "subject": "Social Studies",
    "subjectKey": "social_studies",
    "unitNumber": 1,
    "title": "Ancient Trade Routes, Adulis & Geography of Horn of Africa",
    "summary": "Examine the historic significance of ancient Adulis, archaeological treasures of Kohaito and Metera, and the physical geography of the Horn of Africa.",
    "keyTerms": [
      "Adulis",
      "Kohaito",
      "Metera",
      "Trade Winds",
      "Silk and Spice Routes",
      "Horn of Africa"
    ],
    "keyIdeas": [
      "Adulis was a major international maritime port connecting Africa, the Mediterranean, India, and Arabia.",
      "The highlands of Eritrea provided temperate agricultural conditions that supported early civilizational trade hubs."
    ],
    "sections": [
      {
        "title": "The Historic Port of Adulis",
        "content": "Located south of Massawa on the Gulf of Zula, Adulis served as the primary gateway for exports including obsidian, ivory, spices, and fragrant resins."
      }
    ],
    "examples": [
      {
        "title": "Ancient Trade Goods",
        "problem": "What natural commodities did ancient traders export through Adulis?",
        "solutionSteps": [
          "1. High-value natural goods: ivory, frankincense, myrrh, gold.",
          "2. Minerals such as obsidian from the volcanic fields of the Danakil."
        ],
        "finalAnswer": "Ivory, incense, gold, and obsidian."
      }
    ],
    "exercises": [
      {
        "id": "g7_soc_u1_q1",
        "num": 1,
        "question": "On which body of water was the ancient port city of Adulis located?",
        "options": [
          "Mediterranean Sea",
          "Red Sea",
          "Atlantic Ocean",
          "Persian Gulf"
        ],
        "answer": "Red Sea",
        "explanation": "Adulis was situated on the Red Sea coast in the Gulf of Zula."
      }
    ]
  },
  {
    "id": "g7_cit_u1",
    "grade": 7,
    "subject": "Citizenship Education",
    "subjectKey": "citizenship",
    "unitNumber": 1,
    "title": "Rule of Law, Community Equality & Environmental Stewardship",
    "summary": "Study the principles of the Rule of Law, gender equity in society, peaceful conflict resolution, and protection of natural soil and water resources.",
    "keyTerms": [
      "Rule of Law",
      "Gender Equality",
      "Conflict Resolution",
      "Soil Conservation",
      "Terracing"
    ],
    "keyIdeas": [
      "The Rule of Law ensures no individual is above the law and all citizens receive impartial justice.",
      "Soil and water conservation campaigns (such as hillside terracing and tree planting) preserve arable land for future generations."
    ],
    "sections": [
      {
        "title": "Environmental Protection as Civic Duty",
        "content": "Eritrean students regularly contribute to soil conservation by constructing stone terraces along steep hillsides and planting tree saplings during summer work campaigns."
      }
    ],
    "examples": [
      {
        "title": "Hillside Terracing Benefits",
        "problem": "How does terracing prevent catastrophic soil erosion during heavy seasonal rains?",
        "solutionSteps": [
          "1. Stone terraces slow down rushing surface water runoff.",
          "2. Trapped soil creates fertile stepped benches for crops and vegetation."
        ],
        "finalAnswer": "Slows water flow and retains fertile topsoil."
      }
    ],
    "exercises": [
      {
        "id": "g7_cit_u1_q1",
        "num": 1,
        "question": "What is the primary purpose of agricultural hillside terracing in Eritrea?",
        "options": [
          "To build highways",
          "To prevent soil erosion and conserve moisture",
          "To construct sports fields",
          "To extract minerals"
        ],
        "answer": "To prevent soil erosion and conserve moisture",
        "explanation": "Terracing retains topsoil and reduces torrential rainwater runoff on steep hills."
      }
    ]
  },
  {
    "id": "g7_eng_u1",
    "grade": 7,
    "subject": "English Grammar & Reading",
    "subjectKey": "english",
    "unitNumber": 1,
    "title": "Grammar Mastery: Tenses, Modals & Active/Passive Voice",
    "summary": "Master past simple vs present perfect, modal auxiliaries (must, should, can), and convert active voice statements into formal passive constructions.",
    "keyTerms": [
      "Present Perfect",
      "Past Simple",
      "Modal Auxiliary",
      "Active Voice",
      "Passive Voice"
    ],
    "keyIdeas": [
      "Active voice emphasizes the doer: 'The student solved the problem.'",
      "Passive voice emphasizes the object or outcome: 'The problem was solved by the student.'"
    ],
    "sections": [
      {
        "title": "Transforming Active to Passive Voice",
        "content": "In passive voice, the direct object becomes the subject. The verb changes to 'to be' + past participle. For example: 'The engineer designed the bridge' -> 'The bridge was designed by the engineer'."
      }
    ],
    "examples": [
      {
        "title": "Passive Voice Conversion",
        "problem": "Convert to passive: 'Farmers grow sorghum in Gash-Barka.'",
        "solutionSteps": [
          "1. Direct object 'sorghum' becomes subject.",
          "2. Present tense of 'to be' is 'is'.",
          "3. Past participle of grow is 'grown'."
        ],
        "finalAnswer": "Sorghum is grown in Gash-Barka by farmers."
      }
    ],
    "exercises": [
      {
        "id": "g7_eng_u1_q1",
        "num": 1,
        "question": "What is the passive form of 'The author wrote an inspiring story'?",
        "options": [
          "An inspiring story is written by the author.",
          "An inspiring story was written by the author.",
          "The author was writing a story.",
          "The story has written the author."
        ],
        "answer": "An inspiring story was written by the author.",
        "explanation": "Past simple active 'wrote' becomes 'was written' in passive voice."
      }
    ]
  },
  {
    "id": "g8_sci_u1",
    "grade": 8,
    "subject": "General Science",
    "subjectKey": "science",
    "unitNumber": 1,
    "title": "Human Reproduction, Genetics & Cell Division (Meiosis/Mitosis)",
    "summary": "Detailed study of human reproductive anatomy, gametogenesis, meiosis vs mitosis, the menstrual cycle, fertilization in fallopian tubes, and basic Mendelian inheritance.",
    "keyTerms": [
      "Testes",
      "Ovaries",
      "Sperm",
      "Ovum",
      "Meiosis",
      "Fertilization",
      "Zygote",
      "Chromosomes"
    ],
    "keyIdeas": [
      "In humans, sperm cells are produced inside the testes, and ova develop inside the ovaries.",
      "Meiosis produces haploid sex cells (gametes) with 23 chromosomes, restoring 46 chromosomes upon fertilization.",
      "Fertilization takes place in the oviduct (fallopian tube), producing a diploid single-celled zygote."
    ],
    "sections": [
      {
        "title": "Anatomy and Gametogenesis",
        "content": "The male testes produce testosterone and spermatozoa inside seminiferous tubules. The female ovaries produce estrogen and progesterone and release mature ova during ovulation. Fertilization unites sperm and ovum to create a zygote."
      },
      {
        "title": "Mitosis vs Meiosis Comparison",
        "content": "Mitosis produces 2 genetically identical diploid daughter cells for somatic growth. Meiosis involves two nuclear divisions producing 4 genetically varied haploid gametes with half the chromosome number (n = 23)."
      }
    ],
    "examples": [
      {
        "title": "Chromosome Number Calculation",
        "problem": "If a human somatic skin cell contains 46 chromosomes, how many chromosomes are in a human sperm cell?",
        "solutionSteps": [
          "1. Somatic cells are diploid (2n = 46).",
          "2. Gametes are haploid (n) produced via meiosis.",
          "3. Compute: 46 ÷ 2 = 23."
        ],
        "finalAnswer": "23 chromosomes"
      }
    ],
    "exercises": [
      {
        "id": "g8_sci_u1_q1",
        "num": 1,
        "question": "In humans, sperm cells are produced inside the:",
        "options": [
          "Ovary",
          "Blood",
          "Testes",
          "Pistil"
        ],
        "answer": "Testes",
        "explanation": "Testes are the primary male gonads responsible for spermatogenesis."
      },
      {
        "id": "g8_sci_u1_q2",
        "num": 2,
        "question": "Which of the following are produced by meiosis cell division?",
        "options": [
          "Blood cells",
          "Bone cells",
          "Sex cells (gametes)",
          "Skin cells"
        ],
        "answer": "Sex cells (gametes)",
        "explanation": "Meiosis produces haploid sex cells (sperm and egg) for sexual reproduction."
      }
    ]
  },
  {
    "id": "g8_math_u1",
    "grade": 8,
    "subject": "Mathematics",
    "subjectKey": "math",
    "unitNumber": 1,
    "title": "Real Numbers, Radicals & Pythagorean Theorem",
    "summary": "Study rational and irrational numbers, square root properties, the Pythagorean theorem in right-angled triangles, and solving linear inequalities on number lines.",
    "keyTerms": [
      "Real Numbers",
      "Irrational Numbers",
      "Radical",
      "Pythagorean Theorem",
      "Hypotenuse",
      "Linear Inequality"
    ],
    "keyIdeas": [
      "For any right-angled triangle: a² + b² = c², where c is the hypotenuse opposite the 90° angle.",
      "When multiplying or dividing an inequality by a negative number, the inequality sign MUST reverse direction."
    ],
    "sections": [
      {
        "title": "Pythagorean Theorem Applications",
        "content": "In a right triangle with legs a = 6 cm and b = 8 cm, the hypotenuse c is calculated by c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm."
      }
    ],
    "examples": [
      {
        "title": "Solving Negative Inequality",
        "problem": "Solve for x: -4x + 12 < 28.",
        "solutionSteps": [
          "Step 1: Subtract 12 from both sides: -4x < 16.",
          "Step 2: Divide both sides by -4 and reverse the inequality: x > -4."
        ],
        "finalAnswer": "x > -4"
      }
    ],
    "exercises": [
      {
        "id": "g8_math_u1_q1",
        "num": 1,
        "question": "Solve for x: -5x < 25.",
        "options": [
          "x < -5",
          "x > -5",
          "x < 5",
          "x > 5"
        ],
        "answer": "x > -5",
        "explanation": "Dividing both sides by -5 reverses the inequality sign to give x > -5."
      }
    ]
  },
  {
    "id": "g8_ict_u1",
    "grade": 8,
    "subject": "ICT Computer Studies",
    "subjectKey": "ict",
    "unitNumber": 1,
    "title": "Computer Hardware Architecture & Data Processing",
    "summary": "Understand hardware components (CPU, ALU, RAM, ROM, storage drives, peripherals), operating systems, digital byte units, and basic digital literacy.",
    "keyTerms": [
      "CPU",
      "RAM",
      "ROM",
      "Operating System",
      "Byte",
      "Kilobyte",
      "Gigabyte",
      "Input/Output Devices"
    ],
    "keyIdeas": [
      "The Central Processing Unit (CPU) is the computer's computational brain, housing the Control Unit and ALU.",
      "RAM is volatile working memory that clears when powered down; ROM stores non-volatile startup firmware."
    ],
    "sections": [
      {
        "title": "Hierarchy of Computer Memory",
        "content": "Computer memory is measured in bits (0 or 1) and bytes (8 bits). 1 KB = 1024 bytes; 1 MB = 1024 KB; 1 GB = 1024 MB."
      }
    ],
    "examples": [
      {
        "title": "Data Storage Conversion",
        "problem": "How many megabytes are in a 4-gigabyte flash memory drive?",
        "solutionSteps": [
          "1 GB equals 1024 Megabytes.",
          "Multiply: 4 × 1024 = 4096 MB."
        ],
        "finalAnswer": "4096 MB"
      }
    ],
    "exercises": [
      {
        "id": "g8_ict_u1_q1",
        "num": 1,
        "question": "Which memory component is volatile and loses its data when the computer is turned off?",
        "options": [
          "Hard Disk",
          "ROM",
          "RAM",
          "Optical DVD"
        ],
        "answer": "RAM",
        "explanation": "RAM (Random Access Memory) requires continuous electrical power to maintain stored data."
      }
    ]
  },
  {
    "id": "g8_soc_u1",
    "grade": 8,
    "subject": "Social Studies",
    "subjectKey": "social_studies",
    "unitNumber": 1,
    "title": "Modern Eritrean History, Self-Reliance & African Unity",
    "summary": "Survey the history of modern Eritrea, the heroic 30-year armed struggle for national liberation (1961–1991), the 1993 independence referendum, and the African Union.",
    "keyTerms": [
      "Armed Struggle",
      "EPLF",
      "Self-Reliance",
      "1993 Referendum",
      "National Independence",
      "African Union"
    ],
    "keyIdeas": [
      "Eritrea achieved de facto independence on May 24, 1991, followed by an overwhelming 99.8% vote in the UN-monitored April 1993 Referendum.",
      "The national philosophy of self-reliance emphasizes indigenous development and communal empowerment."
    ],
    "sections": [
      {
        "title": "The Road to Independence (1961–1991)",
        "content": "Beginning at Mount Adal on September 1, 1961, the Eritrean people conducted a disciplined 30-year national struggle culminating in the liberation of Asmara on May 24, 1991."
      }
    ],
    "examples": [
      {
        "title": "Key Historical Dates",
        "problem": "State the date of the historic liberation of Asmara.",
        "solutionSteps": [
          "Eritrean forces entered and liberated Asmara on May 24, 1991, celebrated as National Liberation Day."
        ],
        "finalAnswer": "May 24, 1991"
      }
    ],
    "exercises": [
      {
        "id": "g8_soc_u1_q1",
        "num": 1,
        "question": "In what year did the internationally monitored referendum formalize Eritrea's sovereign independence?",
        "options": [
          "1981",
          "1991",
          "1993",
          "2000"
        ],
        "answer": "1993",
        "explanation": "In April 1993, the Eritrean people voted 99.8% in favor of sovereign independence."
      }
    ]
  },
  {
    "id": "g8_cit_u1",
    "grade": 8,
    "subject": "Citizenship Education",
    "subjectKey": "citizenship",
    "unitNumber": 1,
    "title": "Constitutional Rights, National Values & Youth Leadership",
    "summary": "Deepen understanding of constitutional duties, gender equality, human rights conventions, environmental stewardship, and leadership roles for young citizens.",
    "keyTerms": [
      "Constitution",
      "Civic Duty",
      "Integrity",
      "Leadership",
      "Gender Equity",
      "Social Justice"
    ],
    "keyIdeas": [
      "A constitution defines governmental branches, checks and balances, and citizen guarantees.",
      "Integrity and honesty are essential leadership qualities in public and community life."
    ],
    "sections": [
      {
        "title": "Active Citizenship and Youth Leadership",
        "content": "Youth leadership is built on moral integrity, academic diligence, respect for national heritage, and proactive assistance to elderly and vulnerable neighbors."
      }
    ],
    "examples": [
      {
        "title": "Attributes of an Ethical Leader",
        "problem": "List two vital qualities of an ethical student leader.",
        "solutionSteps": [
          "1. Honesty and transparency in managing responsibilities.",
          "2. Treating all classmates with empathy and fairness regardless of background."
        ],
        "finalAnswer": "Honesty, empathy, and impartial fairness."
      }
    ],
    "exercises": [
      {
        "id": "g8_cit_u1_q1",
        "num": 1,
        "question": "What is the supreme foundational law that outlines governance structures and citizen guarantees?",
        "options": [
          "Penal Code",
          "Constitution",
          "Civil Ordinance",
          "Commercial Bylaws"
        ],
        "answer": "Constitution",
        "explanation": "The Constitution is the supreme foundational legal document of a sovereign country."
      }
    ]
  },
  {
    "id": "g8_lif_u1",
    "grade": 8,
    "subject": "Life Skills & Health",
    "subjectKey": "life_skills",
    "unitNumber": 1,
    "title": "Adolescent Health, Decision Making & Future Planning",
    "summary": "Equip students with practical life skills: personal hygiene during puberty, peer pressure resistance, goal setting, study schedules, and career exploration.",
    "keyTerms": [
      "Adolescence",
      "Puberty",
      "Decision Making",
      "Goal Setting",
      "Peer Pressure",
      "Time Management"
    ],
    "keyIdeas": [
      "Adolescence brings physical and emotional changes that require healthy nutrition and personal hygiene.",
      "SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) help organize study habits for national examinations."
    ],
    "sections": [
      {
        "title": "Effective Study Habits for National Examinations",
        "content": "Creating daily revision timetables, forming focused peer study circles, testing oneself with past national exam papers, and getting sufficient sleep lead to academic mastery."
      }
    ],
    "examples": [
      {
        "title": "Overcoming Negative Peer Pressure",
        "problem": "What steps should a student take when pressured to skip classes?",
        "solutionSteps": [
          "1. Clearly and firmly say 'No'.",
          "2. Walk away from harmful situations.",
          "3. Discuss challenges with trusted parents, guardians, or teachers."
        ],
        "finalAnswer": "Firm refusal, removing oneself from harm, and seeking counsel."
      }
    ],
    "exercises": [
      {
        "id": "g8_lif_u1_q1",
        "num": 1,
        "question": "Which of the following is a healthy strategy for managing exam stress?",
        "options": [
          "Staying awake all night without sleep",
          "Organized revision with scheduled breaks and past paper practice",
          "Skipping meals before testing",
          "Ignoring weak subjects entirely"
        ],
        "answer": "Organized revision with scheduled breaks and past paper practice",
        "explanation": "Balanced revision schedules and past examination practice reduce anxiety and improve recall."
      }
    ]
  }
];
