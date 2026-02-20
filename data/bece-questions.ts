import { Subject } from '../types';

export const beceSubjects: Subject[] = [
    {
        id: 'bece-math', name: 'Mathematics', icon: '📐',
        years: [
            {
                year: 2022, questions: [
                    { id: 'bm22-1', question: 'Simplify 3/4 + 2/3', options: ['17/12', '5/7', '1 5/12', '5/12'], correctAnswer: 2, explanation: '3/4 + 2/3 = 9/12 + 8/12 = 17/12 = 1 5/12' },
                    { id: 'bm22-2', question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2, explanation: '15/100 × 200 = 30' },
                    { id: 'bm22-3', question: 'Find the area of a rectangle with length 8 cm and width 5 cm.', options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], correctAnswer: 2, explanation: 'Area = length × width = 8 × 5 = 40 cm²' },
                    { id: 'bm22-4', question: 'Solve for x: 2x + 5 = 15', options: ['3', '5', '7', '10'], correctAnswer: 1, explanation: '2x + 5 = 15 → 2x = 10 → x = 5' },
                    { id: 'bm22-5', question: 'What is the next number in the sequence: 2, 6, 18, 54, ...?', options: ['72', '108', '162', '216'], correctAnswer: 2, explanation: 'Each number is multiplied by 3. 54 × 3 = 162' },
                    { id: 'bm22-6', question: 'Convert 450 millimeters to centimeters.', options: ['4.5 cm', '45 cm', '450 cm', '4500 cm'], correctAnswer: 1, explanation: '10 mm = 1 cm. 450 mm / 10 = 45 cm' },
                    { id: 'bm22-7', question: 'What is the value of 4³?', options: ['12', '16', '64', '256'], correctAnswer: 2, explanation: '4 × 4 × 4 = 16 × 4 = 64' },
                    { id: 'bm22-8', question: 'In a triangle, if two angles are 45° and 90°, what is the third angle?', options: ['30°', '45°', '60°', '90°'], correctAnswer: 1, explanation: 'Sum of angles = 180°. 180 - (45 + 90) = 45°' },
                    { id: 'bm22-9', question: 'Find the HCF of 12 and 18.', options: ['2', '3', '6', '12'], correctAnswer: 2, explanation: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6' },
                    { id: 'bm22-10', question: 'If 3y = 21, what is the value of y + 5?', options: ['7', '10', '12', '15'], correctAnswer: 2, explanation: '3y = 21 → y = 7. 7 + 5 = 12' },
                    { id: 'bm22-11', question: 'What is the square root of 225?', options: ['13', '14', '15', '25'], correctAnswer: 2, explanation: '15 × 15 = 225' },
                    { id: 'bm22-12', question: 'If a car travels 120 km in 2 hours, what is its average speed?', options: ['40 km/h', '60 km/h', '80 km/h', '120 km/h'], correctAnswer: 1, explanation: 'Speed = Distance / Time = 120 / 2 = 60 km/h' },
                    { id: 'bm22-13', question: 'Which of the following is an irrational number?', options: ['√4', '3.14', 'π', '22/7'], correctAnswer: 2, explanation: 'π is an irrational number; others are rational.' },
                    { id: 'bm22-14', question: 'A bag contains 4 green balls and 6 yellow balls. What is the probability of picking a yellow ball?', options: ['2/3', '2/5', '3/5', '1/2'], correctAnswer: 2, explanation: 'P(yellow) = 6 / (4 + 6) = 6/10 = 3/5' },
                    { id: 'bm22-15', question: 'The base of a triangle is 10 cm and the height is 6 cm. Find its area.', options: ['16 cm²', '30 cm²', '60 cm²', '12 cm²'], correctAnswer: 1, explanation: 'Area = 1/2 × base × height = 1/2 × 10 × 6 = 30 cm²' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'bm21-1', question: 'Express 0.75 as a fraction in its simplest form.', options: ['3/4', '75/100', '7/10', '15/20'], correctAnswer: 0, explanation: '0.75 = 75/100 = 3/4' },
                    { id: 'bm21-2', question: 'A triangle has angles 40° and 75°. What is the third angle?', options: ['55°', '65°', '75°', '85°'], correctAnswer: 1, explanation: '180° - 40° - 75° = 65°' },
                    { id: 'bm21-3', question: 'What is the LCM of 4 and 6?', options: ['2', '6', '12', '24'], correctAnswer: 2, explanation: 'Multiples of 4: 4,8,12... Multiples of 6: 6,12... LCM = 12' },
                    { id: 'bm21-4', question: 'If a box contains 3 red and 5 blue balls, what is the probability of picking a red ball?', options: ['3/8', '5/8', '3/5', '1/3'], correctAnswer: 0, explanation: 'P(red) = 3/(3+5) = 3/8' },
                    { id: 'bm21-5', question: 'Evaluate: (-3) × (-4)', options: ['-12', '-7', '7', '12'], correctAnswer: 3, explanation: 'Negative × Negative = Positive. 3 × 4 = 12' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'bm20-1', question: 'Convert 2.5 km to metres.', options: ['25 m', '250 m', '2500 m', '25000 m'], correctAnswer: 2, explanation: '1 km = 1000 m, so 2.5 × 1000 = 2500 m' },
                    { id: 'bm20-2', question: 'What is the value of 5²?', options: ['10', '15', '20', '25'], correctAnswer: 3, explanation: '5² = 5 × 5 = 25' },
                    { id: 'bm20-3', question: 'Simplify the ratio 12:8', options: ['6:4', '3:2', '4:3', '2:1'], correctAnswer: 1, explanation: 'Divide both by HCF(4): 12/4 : 8/4 = 3:2' },
                    { id: 'bm20-4', question: 'A shirt costs GH₵45. If a 10% discount is given, what is the sale price?', options: ['GH₵35.50', 'GH₵40.50', 'GH₵41.00', 'GH₵44.10'], correctAnswer: 1, explanation: '10% of 45 = 4.50. Sale price = 45 - 4.50 = GH₵40.50' },
                    { id: 'bm20-5', question: 'Find the perimeter of a square with side 7 cm.', options: ['14 cm', '21 cm', '28 cm', '49 cm'], correctAnswer: 2, explanation: 'Perimeter = 4 × side = 4 × 7 = 28 cm' },
                ]
            },
        ],
    },
    {
        id: 'bece-eng', name: 'English Language', icon: '📝',
        years: [
            {
                year: 2022, questions: [
                    { id: 'be22-1', question: 'Choose the correct spelling:', options: ['Accomodation', 'Accommodation', 'Acomodation', 'Acommodation'], correctAnswer: 1, explanation: '"Accommodation" has double c and double m.' },
                    { id: 'be22-2', question: 'The boy ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 1, explanation: 'Third person singular present tense requires "goes".' },
                    { id: 'be22-3', question: 'Which word is a synonym for "happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correctAnswer: 2, explanation: '"Joyful" means full of joy, similar to happy.' },
                    { id: 'be22-4', question: 'Identify the noun in: "The cat sat on the mat."', options: ['sat', 'on', 'the', 'cat'], correctAnswer: 3, explanation: '"Cat" is a naming word (noun).' },
                    { id: 'be22-5', question: 'What is the plural of "child"?', options: ['Childs', 'Children', 'Childes', 'Childrens'], correctAnswer: 1, explanation: '"Child" has an irregular plural: "children".' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'be21-1', question: 'Which sentence is grammatically correct?', options: ['He don\'t like rice.', 'He doesn\'t likes rice.', 'He doesn\'t like rice.', 'He not like rice.'], correctAnswer: 2, explanation: '"Doesn\'t" + base form of the verb.' },
                    { id: 'be21-2', question: 'An antonym of "generous" is:', options: ['Kind', 'Stingy', 'Wealthy', 'Brave'], correctAnswer: 1, explanation: '"Stingy" means unwilling to give — opposite of generous.' },
                    { id: 'be21-3', question: '"She ran quickly." The word "quickly" is a/an:', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correctAnswer: 3, explanation: '"Quickly" modifies the verb "ran", making it an adverb.' },
                    { id: 'be21-4', question: 'Choose the correct punctuation: "What time is it__"', options: ['.', '!', '?', ','], correctAnswer: 2, explanation: 'Questions end with a question mark (?).' },
                    { id: 'be21-5', question: 'The past tense of "write" is:', options: ['Writed', 'Written', 'Wrote', 'Writing'], correctAnswer: 2, explanation: '"Write" is irregular: write → wrote → written.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'be20-1', question: 'A group of birds is called a:', options: ['Pack', 'Flock', 'Herd', 'Swarm'], correctAnswer: 1, explanation: 'A collective noun for birds is "flock".' },
                    { id: 'be20-2', question: '"I ___ been waiting for an hour."', options: ['has', 'have', 'having', 'had'], correctAnswer: 1, explanation: 'First person uses "have" in present perfect.' },
                    { id: 'be20-3', question: 'Which word is an adjective in: "The tall man walked home."?', options: ['The', 'tall', 'walked', 'home'], correctAnswer: 1, explanation: '"Tall" describes the noun "man".' },
                    { id: 'be20-4', question: 'What figure of speech is: "The wind whispered through the trees"?', options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], correctAnswer: 2, explanation: 'Giving human qualities (whispering) to wind is personification.' },
                    { id: 'be20-5', question: 'Choose the correct form: "Neither John ___ Mary was present."', options: ['or', 'and', 'nor', 'but'], correctAnswer: 2, explanation: '"Neither...nor" is the correct correlative conjunction pair.' },
                ]
            },
        ],
    },
    {
        id: 'bece-sci', name: 'Integrated Science', icon: '🔬',
        years: [
            {
                year: 2022, questions: [
                    { id: 'bs22-1', question: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correctAnswer: 2, explanation: 'Plants absorb CO₂ and release O₂ during photosynthesis.' },
                    { id: 'bs22-2', question: 'The SI unit of force is:', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctAnswer: 1, explanation: 'Force is measured in Newtons (N).' },
                    { id: 'bs22-3', question: 'Which organ pumps blood in the human body?', options: ['Liver', 'Kidney', 'Heart', 'Lung'], correctAnswer: 2, explanation: 'The heart pumps blood through the circulatory system.' },
                    { id: 'bs22-4', question: 'What is the chemical formula for water?', options: ['CO₂', 'H₂O', 'NaCl', 'O₂'], correctAnswer: 1, explanation: 'Water consists of 2 hydrogen and 1 oxygen atom: H₂O.' },
                    { id: 'bs22-5', question: 'Which of these is a renewable energy source?', options: ['Coal', 'Natural gas', 'Solar', 'Petroleum'], correctAnswer: 2, explanation: 'Solar energy is renewable — it comes from the sun.' },
                    { id: 'bs22-6', question: 'Which organ in the human body is responsible for filtering blood?', options: ['Heart', 'Lungs', 'Kidneys', 'Stomach'], correctAnswer: 2, explanation: 'The kidneys filter waste products from the blood to produce urine.' },
                    { id: 'bs22-7', question: 'What is the state of matter of the air we breathe?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctAnswer: 2, explanation: 'Air is a mixture of gases, primarily nitrogen and oxygen.' },
                    { id: 'bs22-8', question: 'Which of the following is an example of a physical change?', options: ['Burning wood', 'Iron rusting', 'Melting ice', 'Digesting food'], correctAnswer: 2, explanation: 'Melting ice is a physical change because it remains water; others are chemical.' },
                    { id: 'bs22-9', question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 2, explanation: 'Jupiter is the largest planet in our solar system.' },
                    { id: 'bs22-10', question: 'Which vitamin is produced when the skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], correctAnswer: 3, explanation: 'Vitamin D is synthesized by the skin in response to UV radiation.' },
                    { id: 'bs22-11', question: 'What is the process by which liquid water changes into water vapor?', options: ['Condensation', 'Evaporation', 'Freezing', 'Melting'], correctAnswer: 1, explanation: 'Evaporation is the process of a liquid turning into a gas.' },
                    { id: 'bs22-12', question: 'Which of these animals is a mammal?', options: ['Snake', 'Frog', 'Eagle', 'Whale'], correctAnswer: 3, explanation: 'Whales are mammals; they breathe air and nurse their young.' },
                    { id: 'bs22-13', question: 'What is the primary source of energy for the Earth?', options: ['The Moon', 'The Sun', 'Coal', 'Nuclear power'], correctAnswer: 1, explanation: 'The Sun provides the primary energy through light and heat.' },
                    { id: 'bs22-14', question: 'Which part of the plant is responsible for reproduction?', options: ['Leaf', 'Stem', 'Root', 'Flower'], correctAnswer: 3, explanation: 'Flowers are the reproductive organs of flowering plants.' },
                    { id: 'bs22-15', question: 'What is the boiling point of pure water at sea level?', options: ['0°C', '50°C', '100°C', '200°C'], correctAnswer: 2, explanation: 'Pure water boils at 100°C at standard atmospheric pressure.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'bs21-1', question: 'The process by which water changes to vapour is called:', options: ['Condensation', 'Evaporation', 'Precipitation', 'Sublimation'], correctAnswer: 1, explanation: 'Evaporation is the change from liquid to gas.' },
                    { id: 'bs21-2', question: 'How many bones are in the adult human body?', options: ['106', '156', '206', '256'], correctAnswer: 2, explanation: 'An adult human has 206 bones.' },
                    { id: 'bs21-3', question: 'Which planet is closest to the sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correctAnswer: 2, explanation: 'Mercury is the closest planet to the sun.' },
                    { id: 'bs21-4', question: 'Rusting of iron is an example of:', options: ['Physical change', 'Chemical change', 'Biological change', 'Nuclear change'], correctAnswer: 1, explanation: 'Rusting involves a chemical reaction with oxygen.' },
                    { id: 'bs21-5', question: 'Which part of the plant absorbs water from the soil?', options: ['Stem', 'Leaf', 'Root', 'Flower'], correctAnswer: 2, explanation: 'Roots absorb water and minerals from the soil.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'bs20-1', question: 'The boiling point of water is:', options: ['50°C', '75°C', '100°C', '150°C'], correctAnswer: 2, explanation: 'Water boils at 100°C at standard atmospheric pressure.' },
                    { id: 'bs20-2', question: 'Which blood cells fight infections?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correctAnswer: 1, explanation: 'White blood cells defend the body against infections.' },
                    { id: 'bs20-3', question: 'Sound travels fastest through:', options: ['Air', 'Water', 'Vacuum', 'Solid'], correctAnswer: 3, explanation: 'Sound travels fastest through solids due to tightly packed particles.' },
                    { id: 'bs20-4', question: 'What type of energy does a moving car have?', options: ['Potential', 'Kinetic', 'Chemical', 'Nuclear'], correctAnswer: 1, explanation: 'A moving object possesses kinetic energy.' },
                    { id: 'bs20-5', question: 'Photosynthesis takes place mainly in the:', options: ['Root', 'Stem', 'Leaf', 'Flower'], correctAnswer: 2, explanation: 'Leaves contain chlorophyll where photosynthesis occurs.' },
                ]
            },
        ],
    },
    {
        id: 'bece-social', name: 'Social Studies', icon: '🌍',
        years: [
            {
                year: 2022, questions: [
                    { id: 'bss22-1', question: 'Ghana gained independence in which year?', options: ['1945', '1957', '1960', '1963'], correctAnswer: 1, explanation: 'Ghana became independent on March 6, 1957.' },
                    { id: 'bss22-2', question: 'Who was the first President of Ghana?', options: ['J.B. Danquah', 'Kwame Nkrumah', 'K.A. Busia', 'Jerry Rawlings'], correctAnswer: 1, explanation: 'Dr. Kwame Nkrumah was the first President of Ghana.' },
                    { id: 'bss22-3', question: 'The capital of Ghana is:', options: ['Kumasi', 'Tamale', 'Accra', 'Cape Coast'], correctAnswer: 2, explanation: 'Accra is the capital city of Ghana.' },
                    { id: 'bss22-4', question: 'Lake Volta is located in which country?', options: ['Nigeria', 'Ghana', 'Togo', 'Senegal'], correctAnswer: 1, explanation: 'Lake Volta is one of the largest man-made lakes, located in Ghana.' },
                    { id: 'bss22-5', question: 'The three arms of government are Executive, Legislature and:', options: ['Military', 'Judiciary', 'Police', 'Media'], correctAnswer: 1, explanation: 'The Judiciary interprets laws and ensures justice.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'bss21-1', question: 'Which region in Ghana is known for gold mining?', options: ['Greater Accra', 'Ashanti', 'Northern', 'Volta'], correctAnswer: 1, explanation: 'The Ashanti Region (now Western too) is historically known for gold.' },
                    { id: 'bss21-2', question: 'The main occupation of people in northern Ghana is:', options: ['Fishing', 'Farming', 'Mining', 'Trading'], correctAnswer: 1, explanation: 'Agriculture/farming is the main occupation in northern Ghana.' },
                    { id: 'bss21-3', question: 'ECOWAS stands for:', options: ['Economic Community of West African States', 'East and Central Organization of West African States', 'Economic Council of West African States', 'Economic Community of World African States'], correctAnswer: 0, explanation: 'ECOWAS = Economic Community of West African States, founded in 1975.' },
                    { id: 'bss21-4', question: 'Population census in Ghana is conducted every ___ years.', options: ['5', '8', '10', '15'], correctAnswer: 2, explanation: 'Ghana conducts a national population census every 10 years.' },
                    { id: 'bss21-5', question: 'The national flag of Ghana has how many colours?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'The flag has 3 colours: red, gold, and green, with a black star.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'bss20-1', question: 'The highest court in Ghana is the:', options: ['High Court', 'Court of Appeal', 'Supreme Court', 'Circuit Court'], correctAnswer: 2, explanation: 'The Supreme Court is the highest court in Ghana.' },
                    { id: 'bss20-2', question: 'Which castle was the seat of government in Ghana before independence?', options: ['Elmina Castle', 'Cape Coast Castle', 'Christiansborg Castle', 'Fort William'], correctAnswer: 2, explanation: 'Christiansborg Castle (Osu Castle) served as the seat of government.' },
                    { id: 'bss20-3', question: 'Ghana is located on which continent?', options: ['Asia', 'Europe', 'Africa', 'South America'], correctAnswer: 2, explanation: 'Ghana is in West Africa.' },
                    { id: 'bss20-4', question: 'The voting age in Ghana is:', options: ['15 years', '18 years', '20 years', '21 years'], correctAnswer: 1, explanation: 'Citizens must be 18 years or older to vote in Ghana.' },
                    { id: 'bss20-5', question: 'What is the currency of Ghana?', options: ['Naira', 'Cedi', 'Rand', 'Dollar'], correctAnswer: 1, explanation: 'The Ghana Cedi (GH₵) is the official currency.' },
                ]
            },
        ],
    },
    {
        id: 'bece-ict', name: 'ICT', icon: '💻',
        years: [
            {
                year: 2022, questions: [
                    { id: 'bi22-1', question: 'CPU stands for:', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Unit'], correctAnswer: 0, explanation: 'CPU = Central Processing Unit — the brain of the computer.' },
                    { id: 'bi22-2', question: 'Which of these is an input device?', options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], correctAnswer: 2, explanation: 'A keyboard sends data into the computer (input).' },
                    { id: 'bi22-3', question: 'RAM stands for:', options: ['Random Access Memory', 'Read Access Memory', 'Random Application Memory', 'Readily Available Memory'], correctAnswer: 0, explanation: 'RAM = Random Access Memory — temporary storage.' },
                    { id: 'bi22-4', question: 'The Internet is a:', options: ['Single computer', 'Local network', 'Global network of networks', 'Software program'], correctAnswer: 2, explanation: 'The Internet is a worldwide network connecting millions of devices.' },
                    { id: 'bi22-5', question: 'Which file extension is for a Word document?', options: ['.xls', '.ppt', '.docx', '.pdf'], correctAnswer: 2, explanation: '.docx is the extension for Microsoft Word documents.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'bi21-1', question: 'An example of an operating system is:', options: ['Microsoft Word', 'Google Chrome', 'Windows', 'PowerPoint'], correctAnswer: 2, explanation: 'Windows is an operating system that manages hardware and software.' },
                    { id: 'bi21-2', question: 'Which key is used to delete text to the left of the cursor?', options: ['Delete', 'Backspace', 'Enter', 'Shift'], correctAnswer: 1, explanation: 'Backspace deletes text to the left of the cursor.' },
                    { id: 'bi21-3', question: 'A byte is made up of:', options: ['4 bits', '8 bits', '16 bits', '32 bits'], correctAnswer: 1, explanation: '1 byte = 8 bits.' },
                    { id: 'bi21-4', question: 'WWW stands for:', options: ['Wide World Web', 'World Wide Web', 'Web World Wide', 'World Web Wide'], correctAnswer: 1, explanation: 'WWW = World Wide Web.' },
                    { id: 'bi21-5', question: 'Which of these is a search engine?', options: ['Facebook', 'WhatsApp', 'Google', 'Microsoft Word'], correctAnswer: 2, explanation: 'Google is the most widely used search engine.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'bi20-1', question: 'USB stands for:', options: ['Universal Serial Bus', 'United Serial Bus', 'Universal System Bus', 'Unified Serial Bus'], correctAnswer: 0, explanation: 'USB = Universal Serial Bus — for connecting peripherals.' },
                    { id: 'bi20-2', question: 'Which generation of computers used transistors?', options: ['First', 'Second', 'Third', 'Fourth'], correctAnswer: 1, explanation: 'Second generation computers (1956-1963) used transistors.' },
                    { id: 'bi20-3', question: 'An example of secondary storage is:', options: ['RAM', 'ROM', 'Hard disk', 'Cache'], correctAnswer: 2, explanation: 'Hard disks are secondary/permanent storage devices.' },
                    { id: 'bi20-4', question: 'The shortcut to copy text is:', options: ['Ctrl + V', 'Ctrl + X', 'Ctrl + C', 'Ctrl + Z'], correctAnswer: 2, explanation: 'Ctrl + C copies selected text or objects.' },
                    { id: 'bi20-5', question: 'HTML is used to create:', options: ['Spreadsheets', 'Web pages', 'Databases', 'Presentations'], correctAnswer: 1, explanation: 'HTML (HyperText Markup Language) is used to build web pages.' },
                ]
            },
        ],
    },
];
