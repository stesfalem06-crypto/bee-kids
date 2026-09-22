import { KidsLevelMap, VideoPackItem } from './types';

export const KIDS_LEVELS: KidsLevelMap[] = [
  {
    "level": 1,
    "titleTigrinya": "ደረጃ 1: ምቑፃርን ምልላይ ቅርጽታትን (Ages 4-5)",
    "ageRange": "4-5 ዓመት",
    "descriptionTigrinya": "ብኣቑሑት ምቑፃር (1 ክሳብ 10)፣ ምንጽጻር (ዝበዝሐ/ዝወሓደ) ከምኡ’ውን መሰረታዊ ቅርጽታት (ክቢ፣ ስኩዌር፣ ትሪያንግል)",
    "lessons": [
      {
        "id": "kids_l1_m1",
        "level": 1,
        "strand": "number",
        "titleTigrinya": "ቱፋሕ ንቑጸር (Count the Apples)",
        "titleEnglish": "Counting Apples to 5",
        "pedagogyStage": "concrete",
        "storyTigrinya": "ኣብ ገረብ ጽቡቓት ቀያሕቲ ቱፋሕ ኣለዉ። ክንደይ ቱፋሕ ትርኢ ኣለኻ?",
        "promptTigrinya": "ንቱፋሓት ሓደ ብሓደ ብምጥዋቕ ቍጸሮም፡",
        "audioVoicePrompt": "ክንደይ ቱፋሕ ኣለዉ? ብኢድካ ጠውቕ!",
        "manipulative": {
          "id": "apples_group_1",
          "type": "apple",
          "count": 4,
          "color": "#ef4444"
        },
        "choices": [
          2,
          3,
          4,
          5
        ],
        "correctAnswer": 4,
        "explanationTigrinya": "ጐበዝ! 1, 2, 3, 4! ልክዕ 4 ቱፋሕ ኣለዉ።",
        "rewardStars": 3
      },
      {
        "id": "kids_l1_m2",
        "level": 1,
        "strand": "geometry",
        "titleTigrinya": "ቅርጺ ክቢ ምልላይ (Find the Circle)",
        "titleEnglish": "Identifying Circles",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "ናይ ኩዕሶን ናይ ፀሓይን ቅርጺ ክቢ (Circle) እዩ።",
        "promptTigrinya": "ካብዞም ቅርጽታት እቲ ክቢ ኣየናይ እዩ?",
        "audioVoicePrompt": "እቲ ክቢ ቅርጺ ኣየናይ እዩ? ጠውቆ!",
        "choices": [
          "ትሪያንግል ▲",
          "ክቢ ●",
          "ስኩዌር ■"
        ],
        "correctAnswer": "ክቢ ●",
        "explanationTigrinya": "ብጣዕሚ ጽቡቕ! ክቢ ጥሙርን ድቡልቡልን ቅርጺ እዩ።",
        "rewardStars": 3
      }
    ]
  },
  {
    "level": 2,
    "titleTigrinya": "ደረጃ 2: ናይ ቍጽሪ መላግቦ (Number Bonds to 10)",
    "ageRange": "5-6 ዓመት",
    "descriptionTigrinya": "መላግቦ ቍጽሪታት (Part-Whole Thinking): ሓደ ቍጽሪ ናብ ክልተ ክፋላት ምምቃል (ኣብነት: 5 = 2 + 3)",
    "lessons": [
      {
        "id": "kids_l2_nb1",
        "level": 2,
        "strand": "bonds",
        "titleTigrinya": "ናይ 5 መላግቦ (Bonds of 5)",
        "titleEnglish": "Number Bonds for 5",
        "pedagogyStage": "concrete",
        "storyTigrinya": "ኣማን 5 ከዋክብቲ ኣለዉዎ። 2 ቀያሕቲ እንተኾይኖም፡ እቶም ሰማያዊ ከዋክብቲ ክንደይ ይኾኑ?",
        "promptTigrinya": "ናይዚ ቍጽሪ መላግቦ ጎደሎ ክፋል ምልኣዮ:",
        "audioVoicePrompt": "2 ምስ ክንደይ እንተተደሚሩ 5 ይኸውን?",
        "numberBond": {
          "whole": 5,
          "part1": 2,
          "part2": null,
          "missing": "part2"
        },
        "choices": [
          1,
          2,
          3,
          4
        ],
        "correctAnswer": 3,
        "explanationTigrinya": "ንፉዕ! 2 + 3 = 5! እቲ ጎደሎ ቁጽሪ 3 እዩ።",
        "rewardStars": 3
      },
      {
        "id": "kids_l2_nb2",
        "level": 2,
        "strand": "bonds",
        "titleTigrinya": "ናይ 10 መላግቦ (Bonds of 10)",
        "titleEnglish": "Number Bonds for 10",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "10 ዓሳታት ኣብ ቀላይ ይሕንብሱ ኣለዉ። 7 ዓበይቲ እንተኾይኖም፡ ደቀቕቲ ክንደይ እዮም?",
        "promptTigrinya": "7 ምስ ክንደይ እንተተደሚሩ 10 ይኸውን?",
        "audioVoicePrompt": "ናይ 10 መላግቦ: 7 + ? = 10",
        "numberBond": {
          "whole": 10,
          "part1": 7,
          "part2": null,
          "missing": "part2"
        },
        "choices": [
          2,
          3,
          4,
          5
        ],
        "correctAnswer": 3,
        "explanationTigrinya": "ልክዕ! 7 + 3 = 10! ፍጹም ናይ 10 መላግቦ።",
        "rewardStars": 3
      }
    ]
  },
  {
    "level": 3,
    "titleTigrinya": "ደረጃ 3: ዓሰርተ-ሳንዱቕን ምድማርን (Ten Frames & Addition)",
    "ageRange": "6-7 ዓመት",
    "descriptionTigrinya": "ብዓሰርተ-ሳንዱቕ (Ten Frame) ምድማርን ምቕናስን ክሳብ 20፡ ናይ ዛንታ ሕቶታት",
    "lessons": [
      {
        "id": "kids_l3_tf1",
        "level": 3,
        "strand": "operations",
        "titleTigrinya": "ብዓሰርተ-ሳንዱቕ ምድማር (8 + 5)",
        "titleEnglish": "Making 10 Strategy",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "ናይ ሲንጋፖር ሜላ 'Make 10': ካብ 5 ክልተ ወሲድካ ን 8 ዓሰርተ ግበሮ። 10 + 3 ክንደይ ይኸውን?",
        "promptTigrinya": "8 + 5 = 10 + ? = ?",
        "audioVoicePrompt": "8 + 5 ክንደይ ይኸውን? ብቐሊሉ 10 + 3 ጌርካ ሕሰቦ!",
        "choices": [
          11,
          12,
          13,
          14
        ],
        "correctAnswer": 13,
        "explanationTigrinya": "ብሉጽ ስራሕ! 8 + 2 = 10, ድሕሪኡ 10 + 3 = 13! 8 + 5 = 13።",
        "rewardStars": 3
      }
    ]
  },
  {
    "level": 4,
    "titleTigrinya": "ደረጃ 4: ዋጋ ቦታን ምትእኽኻብን (Place Value: Tens & Ones)",
    "ageRange": "7-8 ዓመት",
    "descriptionTigrinya": "ዓሰርተታትን ሓደታትን (Tens and Ones)፡ መላግቦ ክሳብ 100፡ መሰረት ምርባሕ",
    "lessons": [
      {
        "id": "kids_l4_pv1",
        "level": 4,
        "strand": "number",
        "titleTigrinya": "ዓሰርተታትን ሓደታትን (Place Value)",
        "titleEnglish": "Tens and Ones",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "ኣብ ሓደ ሳንዱቕ 3 ጥርፊ ዓሰርተታትን (3 Tens) 6 ሓደታትን (6 Ones) ኣለዉ። ጠቕላላ ቍጽሪ ክንደይ እዩ?",
        "promptTigrinya": "3 ዓሰርተታት + 6 ሓደታት = ?",
        "audioVoicePrompt": "3 ዓሰርተታት 30 እዩ። 30 + 6 ክንደይ ይኸውን?",
        "choices": [
          26,
          36,
          46,
          63
        ],
        "correctAnswer": 36,
        "explanationTigrinya": "ሓቂ! 3 ዓሰርተታት (30) + 6 ሓደታት (6) = 36!",
        "rewardStars": 3
      }
    ]
  },
  {
    "level": 5,
    "titleTigrinya": "ደረጃ 5: ናይ ባር ሞዴል ስእላዊ ዛንታ (Singapore Bar Models)",
    "ageRange": "8-9 ዓመት",
    "descriptionTigrinya": "ስእላዊ ባር ሞዴል (Bar Model Method) ንምፍታሕ ዛንታታት ሒሳብን ሰሌዳ ምርባሕን",
    "lessons": [
      {
        "id": "kids_l5_bm1",
        "level": 5,
        "strand": "barmodel",
        "titleTigrinya": "ናይ ክፋልን ጠቕላላን ባር ሞዴል (Part-Whole Bar Model)",
        "titleEnglish": "Part-Whole Bar Model",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "ዮናስ 45 ደብተር ኣለዎ። ሳራ ድማ 30 ደብተር ኣለዋ። ብሓባር ክንደይ ደብተር ኣለዎም?",
        "promptTigrinya": "እቲ ባር ሞዴል 45 ን 30 ን ዘርኢ እዩ። ጠቕላላ ድምር ክንደይ እዩ?",
        "audioVoicePrompt": "45 ደብተር ምስ 30 ደብተር እንተተደሚሩ ክንደይ ይኸውን?",
        "barModel": {
          "total": null,
          "bars": [
            {
              "label": "ዮናስ",
              "value": 45,
              "color": "#0d9488"
            },
            {
              "label": "ሳራ",
              "value": 30,
              "color": "#f59e0b"
            }
          ],
          "missingLabel": "ጠቕላላ ድምር"
        },
        "choices": [
          65,
          70,
          75,
          80
        ],
        "correctAnswer": 75,
        "explanationTigrinya": "ዘደንቕ! 45 + 30 = 75 ደብተር! ባር ሞዴል ብቐሊሉ ኣርእዩና።",
        "rewardStars": 3
      }
    ]
  },
  {
    "level": 6,
    "titleTigrinya": "ደረጃ 6: ክፋላት (ፍርቂ፣ ርብዒ) ከምኡ’ውን ዛንታታት (Fractions & Multi-Step)",
    "ageRange": "9-10 ዓመት",
    "descriptionTigrinya": "ማዕረ ምክፋል (ፍርቂ 1/2፣ ርብዒ 1/4)፡ ማዕረ-ክፋላት (Equivalent Fractions) ብስእሊ",
    "lessons": [
      {
        "id": "kids_l6_fr1",
        "level": 6,
        "strand": "fractions",
        "titleTigrinya": "ፍርቂ ኬክ ምክፋል (Halves & Quarters)",
        "titleEnglish": "Fractions of Shapes",
        "pedagogyStage": "pictorial",
        "storyTigrinya": "ሓደ ኬክ ናብ 4 ማዕረ ክፋላት ተመቒሉ። 2 ክፋላት እንተተበሊዑ፡ ክንደይ ክፋል ተበሊዑ ኣሎ?",
        "promptTigrinya": "2 ካብ 4 (2/4) ምስ ኣየናይ ማዕረ እዩ?",
        "audioVoicePrompt": "2/4 ናይ ሓደ ኬክ ምስ ኣየናይ ማዕረ ይኸውን?",
        "choices": [
          "1/4 (ርብዒ)",
          "1/2 (ፍርቂ)",
          "3/4 (ሰለስተ ርብዒ)"
        ],
        "correctAnswer": "1/2 (ፍርቂ)",
        "explanationTigrinya": "ጐበዝ! 2/4 ማዕረ 1/2 (ፍርቂ) እዩ። ማዕረ-ክፋላት (Equivalent Fractions) ይበሃሉ።",
        "rewardStars": 3
      }
    ]
  }
];

export const SAMPLE_VIDEO_PACKS: VideoPackItem[] = [
  {
    id: 'pack_math_reel_1',
    titleTigrinya: 'ናይ ቍጽሪ ደርፊ ምስ ሓጎስን ሮዛን (Number Song 1-10)',
    duration: '02:15',
    isVertical: true,
    category: 'math_reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    encryptedSize: '18.4 MB'
  },
  {
    id: 'pack_math_reel_2',
    titleTigrinya: 'ባር ሞዴል ከመይ ጌርና ንስእል? (Drawing Bar Models)',
    duration: '03:40',
    isVertical: true,
    category: 'math_reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    encryptedSize: '24.1 MB'
  },
  {
    id: 'pack_math_reel_3',
    titleTigrinya: 'ናይ ዓሰርተ መላግቦ ጸወታ (The Bond of 10 Challenge)',
    duration: '01:50',
    isVertical: false,
    category: 'song',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    encryptedSize: '15.2 MB'
  }
];
