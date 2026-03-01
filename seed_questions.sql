-- ============================================================
-- PrepMaster GH — Seed Data
-- Run this AFTER supabase_setup.sql in the Supabase SQL Editor
-- ============================================================

-- Insert Exams
INSERT INTO exams (type, description) VALUES
  ('BECE', 'Basic Education Certificate Examination — JHS Level'),
  ('WASSCE', 'West African Senior School Certificate Examination — SHS Level')
ON CONFLICT (type) DO NOTHING;

-- ============================================================
-- BECE SUBJECTS
-- ============================================================
INSERT INTO subjects (exam_id, slug, name, icon) VALUES
  ((SELECT id FROM exams WHERE type='BECE'), 'bece-math', 'Mathematics', '📐'),
  ((SELECT id FROM exams WHERE type='BECE'), 'bece-eng', 'English Language', '📝'),
  ((SELECT id FROM exams WHERE type='BECE'), 'bece-sci', 'Integrated Science', '🔬'),
  ((SELECT id FROM exams WHERE type='BECE'), 'bece-social', 'Social Studies', '🌍'),
  ((SELECT id FROM exams WHERE type='BECE'), 'bece-ict', 'ICT', '💻')
ON CONFLICT (exam_id, slug) DO NOTHING;

-- ============================================================
-- WASSCE SUBJECTS
-- ============================================================
INSERT INTO subjects (exam_id, slug, name, icon) VALUES
  ((SELECT id FROM exams WHERE type='WASSCE'), 'w-cmath', 'Core Mathematics', '🔢'),
  ((SELECT id FROM exams WHERE type='WASSCE'), 'w-eng', 'English Language', '📖'),
  ((SELECT id FROM exams WHERE type='WASSCE'), 'w-isci', 'Integrated Science', '⚗️'),
  ((SELECT id FROM exams WHERE type='WASSCE'), 'w-social', 'Social Studies', '🏛️')
ON CONFLICT (exam_id, slug) DO NOTHING;

-- ============================================================
-- BECE MATHEMATICS QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
-- 2022
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-1', 'Simplify 3/4 + 2/3', '["17/12", "5/7", "1 5/12", "5/12"]', 2, '3/4 + 2/3 = 9/12 + 8/12 = 17/12 = 1 5/12'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-2', 'What is 15% of 200?', '["20", "25", "30", "35"]', 2, '15/100 × 200 = 30'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-3', 'Find the area of a rectangle with length 8 cm and width 5 cm.', '["13 cm²", "26 cm²", "40 cm²", "80 cm²"]', 2, 'Area = length × width = 8 × 5 = 40 cm²'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-4', 'Solve for x: 2x + 5 = 15', '["3", "5", "7", "10"]', 1, '2x + 5 = 15 → 2x = 10 → x = 5'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-5', 'What is the next number in the sequence: 2, 6, 18, 54, ...?', '["72", "108", "162", "216"]', 2, 'Each number is multiplied by 3. 54 × 3 = 162'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-6', 'Convert 450 millimeters to centimeters.', '["4.5 cm", "45 cm", "450 cm", "4500 cm"]', 1, '10 mm = 1 cm. 450 mm / 10 = 45 cm'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-7', 'What is the value of 4³?', '["12", "16", "64", "256"]', 2, '4 × 4 × 4 = 16 × 4 = 64'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-8', 'In a triangle, if two angles are 45° and 90°, what is the third angle?', '["30°", "45°", "60°", "90°"]', 1, 'Sum of angles = 180°. 180 - (45 + 90) = 45°'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-9', 'Find the HCF of 12 and 18.', '["2", "3", "6", "12"]', 2, 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-10', 'If 3y = 21, what is the value of y + 5?', '["7", "10", "12", "15"]', 2, '3y = 21 → y = 7. 7 + 5 = 12'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-11', 'What is the square root of 225?', '["13", "14", "15", "25"]', 2, '15 × 15 = 225'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-12', 'If a car travels 120 km in 2 hours, what is its average speed?', '["40 km/h", "60 km/h", "80 km/h", "120 km/h"]', 1, 'Speed = Distance / Time = 120 / 2 = 60 km/h'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-13', 'Which of the following is an irrational number?', '["√4", "3.14", "π", "22/7"]', 2, 'π is an irrational number; others are rational.'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-14', 'A bag contains 4 green balls and 6 yellow balls. What is the probability of picking a yellow ball?', '["2/3", "2/5", "3/5", "1/2"]', 2, 'P(yellow) = 6 / (4 + 6) = 6/10 = 3/5'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2022, 'bm22-15', 'The base of a triangle is 10 cm and the height is 6 cm. Find its area.', '["16 cm²", "30 cm²", "60 cm²", "12 cm²"]', 1, 'Area = 1/2 × base × height = 1/2 × 10 × 6 = 30 cm²'),
-- 2021
((SELECT id FROM subjects WHERE slug='bece-math'), 2021, 'bm21-1', 'Express 0.75 as a fraction in its simplest form.', '["3/4", "75/100", "7/10", "15/20"]', 0, '0.75 = 75/100 = 3/4'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2021, 'bm21-2', 'A triangle has angles 40° and 75°. What is the third angle?', '["55°", "65°", "75°", "85°"]', 1, '180° - 40° - 75° = 65°'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2021, 'bm21-3', 'What is the LCM of 4 and 6?', '["2", "6", "12", "24"]', 2, 'Multiples of 4: 4,8,12... Multiples of 6: 6,12... LCM = 12'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2021, 'bm21-4', 'If a box contains 3 red and 5 blue balls, what is the probability of picking a red ball?', '["3/8", "5/8", "3/5", "1/3"]', 0, 'P(red) = 3/(3+5) = 3/8'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2021, 'bm21-5', 'Evaluate: (-3) × (-4)', '["−12", "−7", "7", "12"]', 3, 'Negative × Negative = Positive. 3 × 4 = 12'),
-- 2020
((SELECT id FROM subjects WHERE slug='bece-math'), 2020, 'bm20-1', 'Convert 2.5 km to metres.', '["25 m", "250 m", "2500 m", "25000 m"]', 2, '1 km = 1000 m, so 2.5 × 1000 = 2500 m'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2020, 'bm20-2', 'What is the value of 5²?', '["10", "15", "20", "25"]', 3, '5² = 5 × 5 = 25'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2020, 'bm20-3', 'Simplify the ratio 12:8', '["6:4", "3:2", "4:3", "2:1"]', 1, 'Divide both by HCF(4): 12/4 : 8/4 = 3:2'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2020, 'bm20-4', 'A shirt costs GH₵45. If a 10% discount is given, what is the sale price?', '["GH₵35.50", "GH₵40.50", "GH₵41.00", "GH₵44.10"]', 1, '10% of 45 = 4.50. Sale price = 45 - 4.50 = GH₵40.50'),
((SELECT id FROM subjects WHERE slug='bece-math'), 2020, 'bm20-5', 'Find the perimeter of a square with side 7 cm.', '["14 cm", "21 cm", "28 cm", "49 cm"]', 2, 'Perimeter = 4 × side = 4 × 7 = 28 cm')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- BECE ENGLISH QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='bece-eng'), 2022, 'be22-1', 'Choose the correct spelling:', '["Accomodation", "Accommodation", "Acomodation", "Acommodation"]', 1, '"Accommodation" has double c and double m.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2022, 'be22-2', 'The boy ___ to school every day.', '["go", "goes", "going", "gone"]', 1, 'Third person singular present tense requires "goes".'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2022, 'be22-3', 'Which word is a synonym for "happy"?', '["Sad", "Angry", "Joyful", "Tired"]', 2, '"Joyful" means full of joy, similar to happy.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2022, 'be22-4', 'Identify the noun in: "The cat sat on the mat."', '["sat", "on", "the", "cat"]', 3, '"Cat" is a naming word (noun).'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2022, 'be22-5', 'What is the plural of "child"?', '["Childs", "Children", "Childes", "Childrens"]', 1, '"Child" has an irregular plural: "children".'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2021, 'be21-1', 'Which sentence is grammatically correct?', '["He don''t like rice.", "He doesn''t likes rice.", "He doesn''t like rice.", "He not like rice."]', 2, '"Doesn''t" + base form of the verb.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2021, 'be21-2', 'An antonym of "generous" is:', '["Kind", "Stingy", "Wealthy", "Brave"]', 1, '"Stingy" means unwilling to give — opposite of generous.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2021, 'be21-3', '"She ran quickly." The word "quickly" is a/an:', '["Noun", "Verb", "Adjective", "Adverb"]', 3, '"Quickly" modifies the verb "ran", making it an adverb.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2021, 'be21-4', 'Choose the correct punctuation: "What time is it__"', '[".", "!", "?", ","]', 2, 'Questions end with a question mark (?).'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2021, 'be21-5', 'The past tense of "write" is:', '["Writed", "Written", "Wrote", "Writing"]', 2, '"Write" is irregular: write → wrote → written.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2020, 'be20-1', 'A group of birds is called a:', '["Pack", "Flock", "Herd", "Swarm"]', 1, 'A collective noun for birds is "flock".'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2020, 'be20-2', '"I ___ been waiting for an hour."', '["has", "have", "having", "had"]', 1, 'First person uses "have" in present perfect.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2020, 'be20-3', 'Which word is an adjective in: "The tall man walked home."?', '["The", "tall", "walked", "home"]', 1, '"Tall" describes the noun "man".'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2020, 'be20-4', 'What figure of speech is: "The wind whispered through the trees"?', '["Simile", "Metaphor", "Personification", "Hyperbole"]', 2, 'Giving human qualities (whispering) to wind is personification.'),
((SELECT id FROM subjects WHERE slug='bece-eng'), 2020, 'be20-5', 'Choose the correct form: "Neither John ___ Mary was present."', '["or", "and", "nor", "but"]', 2, '"Neither...nor" is the correct correlative conjunction pair.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- BECE INTEGRATED SCIENCE QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-1', 'Which gas do plants absorb during photosynthesis?', '["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"]', 2, 'Plants absorb CO₂ and release O₂ during photosynthesis.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-2', 'The SI unit of force is:', '["Joule", "Newton", "Watt", "Pascal"]', 1, 'Force is measured in Newtons (N).'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-3', 'Which organ pumps blood in the human body?', '["Liver", "Kidney", "Heart", "Lung"]', 2, 'The heart pumps blood through the circulatory system.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-4', 'What is the chemical formula for water?', '["CO₂", "H₂O", "NaCl", "O₂"]', 1, 'Water consists of 2 hydrogen and 1 oxygen atom: H₂O.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-5', 'Which of these is a renewable energy source?', '["Coal", "Natural gas", "Solar", "Petroleum"]', 2, 'Solar energy is renewable — it comes from the sun.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-6', 'Which organ in the human body is responsible for filtering blood?', '["Heart", "Lungs", "Kidneys", "Stomach"]', 2, 'The kidneys filter waste products from the blood.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-7', 'What is the state of matter of the air we breathe?', '["Solid", "Liquid", "Gas", "Plasma"]', 2, 'Air is a mixture of gases.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-8', 'Which of the following is an example of a physical change?', '["Burning wood", "Iron rusting", "Melting ice", "Digesting food"]', 2, 'Melting ice is a physical change.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-9', 'What is the largest planet in our solar system?', '["Earth", "Mars", "Jupiter", "Saturn"]', 2, 'Jupiter is the largest planet.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-10', 'Which vitamin is produced when the skin is exposed to sunlight?', '["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"]', 3, 'Vitamin D is synthesized by the skin in response to UV radiation.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-11', 'What is the process by which liquid water changes into water vapor?', '["Condensation", "Evaporation", "Freezing", "Melting"]', 1, 'Evaporation is the process of a liquid turning into a gas.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-12', 'Which of these animals is a mammal?', '["Snake", "Frog", "Eagle", "Whale"]', 3, 'Whales are mammals.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-13', 'What is the primary source of energy for the Earth?', '["The Moon", "The Sun", "Coal", "Nuclear power"]', 1, 'The Sun provides the primary energy.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-14', 'Which part of the plant is responsible for reproduction?', '["Leaf", "Stem", "Root", "Flower"]', 3, 'Flowers are the reproductive organs of flowering plants.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2022, 'bs22-15', 'What is the boiling point of pure water at sea level?', '["0°C", "50°C", "100°C", "200°C"]', 2, 'Pure water boils at 100°C.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2021, 'bs21-1', 'The process by which water changes to vapour is called:', '["Condensation", "Evaporation", "Precipitation", "Sublimation"]', 1, 'Evaporation is the change from liquid to gas.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2021, 'bs21-2', 'How many bones are in the adult human body?', '["106", "156", "206", "256"]', 2, 'An adult human has 206 bones.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2021, 'bs21-3', 'Which planet is closest to the sun?', '["Venus", "Earth", "Mercury", "Mars"]', 2, 'Mercury is the closest planet to the sun.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2021, 'bs21-4', 'Rusting of iron is an example of:', '["Physical change", "Chemical change", "Biological change", "Nuclear change"]', 1, 'Rusting involves a chemical reaction with oxygen.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2021, 'bs21-5', 'Which part of the plant absorbs water from the soil?', '["Stem", "Leaf", "Root", "Flower"]', 2, 'Roots absorb water and minerals from the soil.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2020, 'bs20-1', 'The boiling point of water is:', '["50°C", "75°C", "100°C", "150°C"]', 2, 'Water boils at 100°C.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2020, 'bs20-2', 'Which blood cells fight infections?', '["Red blood cells", "White blood cells", "Platelets", "Plasma"]', 1, 'White blood cells defend the body against infections.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2020, 'bs20-3', 'Sound travels fastest through:', '["Air", "Water", "Vacuum", "Solid"]', 3, 'Sound travels fastest through solids.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2020, 'bs20-4', 'What type of energy does a moving car have?', '["Potential", "Kinetic", "Chemical", "Nuclear"]', 1, 'A moving object possesses kinetic energy.'),
((SELECT id FROM subjects WHERE slug='bece-sci'), 2020, 'bs20-5', 'Photosynthesis takes place mainly in the:', '["Root", "Stem", "Leaf", "Flower"]', 2, 'Leaves contain chlorophyll where photosynthesis occurs.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- BECE SOCIAL STUDIES QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='bece-social'), 2022, 'bss22-1', 'Ghana gained independence in which year?', '["1945", "1957", "1960", "1963"]', 1, 'Ghana became independent on March 6, 1957.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2022, 'bss22-2', 'Who was the first President of Ghana?', '["J.B. Danquah", "Kwame Nkrumah", "K.A. Busia", "Jerry Rawlings"]', 1, 'Dr. Kwame Nkrumah was the first President of Ghana.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2022, 'bss22-3', 'The capital of Ghana is:', '["Kumasi", "Tamale", "Accra", "Cape Coast"]', 2, 'Accra is the capital city of Ghana.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2022, 'bss22-4', 'Lake Volta is located in which country?', '["Nigeria", "Ghana", "Togo", "Senegal"]', 1, 'Lake Volta is in Ghana.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2022, 'bss22-5', 'The three arms of government are Executive, Legislature and:', '["Military", "Judiciary", "Police", "Media"]', 1, 'The Judiciary interprets laws.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2021, 'bss21-1', 'Which region in Ghana is known for gold mining?', '["Greater Accra", "Ashanti", "Northern", "Volta"]', 1, 'The Ashanti Region is historically known for gold.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2021, 'bss21-2', 'The main occupation of people in northern Ghana is:', '["Fishing", "Farming", "Mining", "Trading"]', 1, 'Agriculture/farming is the main occupation.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2021, 'bss21-3', 'ECOWAS stands for:', '["Economic Community of West African States", "East and Central Organization of West African States", "Economic Council of West African States", "Economic Community of World African States"]', 0, 'ECOWAS = Economic Community of West African States.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2021, 'bss21-4', 'Population census in Ghana is conducted every ___ years.', '["5", "8", "10", "15"]', 2, 'Ghana conducts a census every 10 years.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2021, 'bss21-5', 'The national flag of Ghana has how many colours?', '["2", "3", "4", "5"]', 1, 'The flag has 3 colours: red, gold, and green.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2020, 'bss20-1', 'The highest court in Ghana is the:', '["High Court", "Court of Appeal", "Supreme Court", "Circuit Court"]', 2, 'The Supreme Court is the highest court.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2020, 'bss20-2', 'Which castle was the seat of government before independence?', '["Elmina Castle", "Cape Coast Castle", "Christiansborg Castle", "Fort William"]', 2, 'Christiansborg Castle served as the seat of government.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2020, 'bss20-3', 'Ghana is located on which continent?', '["Asia", "Europe", "Africa", "South America"]', 2, 'Ghana is in West Africa.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2020, 'bss20-4', 'The voting age in Ghana is:', '["15 years", "18 years", "20 years", "21 years"]', 1, 'Citizens must be 18 years or older to vote.'),
((SELECT id FROM subjects WHERE slug='bece-social'), 2020, 'bss20-5', 'What is the currency of Ghana?', '["Naira", "Cedi", "Rand", "Dollar"]', 1, 'The Ghana Cedi (GH₵) is the official currency.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- BECE ICT QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='bece-ict'), 2022, 'bi22-1', 'CPU stands for:', '["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"]', 0, 'CPU = Central Processing Unit.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2022, 'bi22-2', 'Which of these is an input device?', '["Monitor", "Printer", "Keyboard", "Speaker"]', 2, 'A keyboard sends data into the computer.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2022, 'bi22-3', 'RAM stands for:', '["Random Access Memory", "Read Access Memory", "Random Application Memory", "Readily Available Memory"]', 0, 'RAM = Random Access Memory.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2022, 'bi22-4', 'The Internet is a:', '["Single computer", "Local network", "Global network of networks", "Software program"]', 2, 'The Internet is a worldwide network.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2022, 'bi22-5', 'Which file extension is for a Word document?', '[".xls", ".ppt", ".docx", ".pdf"]', 2, '.docx is the extension for Microsoft Word documents.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2021, 'bi21-1', 'An example of an operating system is:', '["Microsoft Word", "Google Chrome", "Windows", "PowerPoint"]', 2, 'Windows is an operating system.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2021, 'bi21-2', 'Which key is used to delete text to the left of the cursor?', '["Delete", "Backspace", "Enter", "Shift"]', 1, 'Backspace deletes text to the left.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2021, 'bi21-3', 'A byte is made up of:', '["4 bits", "8 bits", "16 bits", "32 bits"]', 1, '1 byte = 8 bits.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2021, 'bi21-4', 'WWW stands for:', '["Wide World Web", "World Wide Web", "Web World Wide", "World Web Wide"]', 1, 'WWW = World Wide Web.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2021, 'bi21-5', 'Which of these is a search engine?', '["Facebook", "WhatsApp", "Google", "Microsoft Word"]', 2, 'Google is a search engine.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2020, 'bi20-1', 'USB stands for:', '["Universal Serial Bus", "United Serial Bus", "Universal System Bus", "Unified Serial Bus"]', 0, 'USB = Universal Serial Bus.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2020, 'bi20-2', 'Which generation of computers used transistors?', '["First", "Second", "Third", "Fourth"]', 1, 'Second generation computers used transistors.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2020, 'bi20-3', 'An example of secondary storage is:', '["RAM", "ROM", "Hard disk", "Cache"]', 2, 'Hard disks are secondary storage.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2020, 'bi20-4', 'The shortcut to copy text is:', '["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"]', 2, 'Ctrl + C copies selected text.'),
((SELECT id FROM subjects WHERE slug='bece-ict'), 2020, 'bi20-5', 'HTML is used to create:', '["Spreadsheets", "Web pages", "Databases", "Presentations"]', 1, 'HTML is used to build web pages.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- WASSCE CORE MATHEMATICS QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-1', 'Solve the equation: 3x² - 12 = 0', '["x = ±2", "x = ±4", "x = ±3", "x = ±6"]', 0, '3x² = 12, x² = 4, x = ±2'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-2', 'Find the gradient of the line 2y + 3x = 6', '["-3/2", "3/2", "-2/3", "2/3"]', 0, '2y = -3x + 6, y = -3x/2 + 3. Gradient = -3/2'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-3', 'If log₁₀2 = 0.301, find log₁₀8', '["0.602", "0.903", "2.408", "0.301"]', 1, 'log₁₀8 = log₁₀2³ = 3 × 0.301 = 0.903'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-4', 'What is the sum of interior angles of a hexagon?', '["360°", "540°", "720°", "900°"]', 2, '(n-2)×180 = (6-2)×180 = 720°'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-5', 'Simplify: (√50 - √32)', '["√2", "√18", "3√2", "√8"]', 0, '√50 = 5√2, √32 = 4√2. 5√2 - 4√2 = √2'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-6', 'Find the value of x if 2^(x+1) = 32.', '["3", "4", "5", "6"]', 1, '32 = 2⁵. x + 1 = 5 → x = 4.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-7', 'Calculate the simple interest on GH₵2000 for 3 years at 5% per annum.', '["GH₵300", "GH₵400", "GH₵500", "GH₵600"]', 0, 'SI = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = 300.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-8', 'The probability of an event happening is 0.35. What is the probability of it NOT happening?', '["0.35", "0.55", "0.65", "0.75"]', 2, 'P(not E) = 1 - 0.35 = 0.65.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-9', 'Rationalize the denominator: 1 / √2', '["√2", "√2 / 2", "2√2", "2"]', 1, '(1 / √2) × (√2 / √2) = √2 / 2.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-10', 'Find the hypotenuse of a right triangle with sides 5 cm and 12 cm.', '["13 cm", "15 cm", "17 cm", "20 cm"]', 0, 'c² = 5² + 12² = 169. c = 13.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-11', 'Evaluate (0.04)⁰·⁵', '["0.02", "0.2", "2.0", "0.002"]', 1, '√(0.04) = 0.2.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-12', 'If f(x) = 2x² - 3x + 1, find f(2).', '["1", "2", "3", "4"]', 2, 'f(2) = 8 - 6 + 1 = 3.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-13', 'Solve for x: (x - 2) / 3 = 4', '["10", "12", "14", "16"]', 2, 'x - 2 = 12 → x = 14.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-14', 'Convert 150° to radians.', '["π/2", "2π/3", "5π/6", "3π/2"]', 2, '(150 × π) / 180 = 5π/6.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2022, 'wm22-15', 'The perimeter of a circle is 44 cm. Find its radius. (π = 22/7)', '["7 cm", "14 cm", "21 cm", "28 cm"]', 0, 'C = 2πr → 44 = 2 × 22/7 × r → r = 7.'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2021, 'wm21-1', 'Find the 10th term of the AP: 3, 7, 11, 15, ...', '["39", "43", "35", "47"]', 0, 'T₁₀ = 3 + (10-1)×4 = 39'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2021, 'wm21-2', 'If P = {1,2,3,4,5} and Q = {3,4,5,6,7}, find P∩Q', '["{1,2}", "{3,4,5}", "{6,7}", "{1,2,3,4,5,6,7}"]', 1, 'P∩Q = {3,4,5}'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2021, 'wm21-3', 'Convert 110₂ to base 10', '["4", "5", "6", "7"]', 2, '1×4 + 1×2 + 0×1 = 6'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2021, 'wm21-4', 'A circle has radius 7 cm. Find its area. (π = 22/7)', '["44 cm²", "154 cm²", "308 cm²", "22 cm²"]', 1, 'A = πr² = 22/7 × 49 = 154 cm²'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2021, 'wm21-5', 'Factorize: x² - 9', '["(x-3)(x-3)", "(x+3)(x+3)", "(x-3)(x+3)", "(x-9)(x+1)"]', 2, 'x²-9 = (x-3)(x+3)'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2020, 'wm20-1', 'Evaluate: 27^(1/3)', '["3", "9", "81", "1/3"]', 0, '∛27 = 3'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2020, 'wm20-2', 'If tan θ = 3/4 and θ is acute, find sin θ', '["3/5", "4/5", "3/4", "5/3"]', 0, 'opp=3, adj=4, hyp=5. sin = 3/5'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2020, 'wm20-3', 'The mean of 5 numbers is 8. If one number is removed, the mean becomes 7. What was removed?', '["10", "11", "12", "13"]', 2, 'Sum=40. New sum=28. Removed=12'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2020, 'wm20-4', 'Solve: 2ˣ = 16', '["2", "3", "4", "8"]', 2, '2⁴ = 16, so x = 4'),
((SELECT id FROM subjects WHERE slug='w-cmath'), 2020, 'wm20-5', 'Find the median of: 3, 7, 1, 9, 5', '["3", "5", "7", "9"]', 1, 'Arranged: 1,3,5,7,9. Median = 5')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- WASSCE ENGLISH QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='w-eng'), 2022, 'we22-1', 'Choose the word that best completes: "The manager''s decision was ___."', '["Arbitary", "Arbitrary", "Arbritray", "Arbirary"]', 1, '"Arbitrary" means based on random choice.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2022, 'we22-2', '"Had I known, I would have come." This sentence expresses:', '["A wish", "A regret", "An order", "A request"]', 1, 'Past perfect conditional expresses regret.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2022, 'we22-3', 'A "monologue" is a speech given by:', '["Two people", "A group", "One person", "An audience"]', 2, '"Mono" means one.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2022, 'we22-4', 'The literary device in "He is as brave as a lion" is:', '["Metaphor", "Simile", "Irony", "Alliteration"]', 1, 'A simile compares using "as" or "like".'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2022, 'we22-5', 'Which is the correct passive form of "She writes a letter"?', '["A letter was written by her", "A letter is written by her", "A letter were written by her", "A letter is writing by her"]', 1, 'Present tense passive: subject + is/are + past participle.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2021, 'we21-1', '"Ephemeral" most nearly means:', '["Eternal", "Short-lived", "Beautiful", "Mysterious"]', 1, '"Ephemeral" means lasting for a very short time.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2021, 'we21-2', 'Identify the clause type: "When the bell rang, students rushed out."', '["Noun clause", "Adverbial clause", "Adjectival clause", "Main clause"]', 1, '"When the bell rang" is an adverbial clause of time.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2021, 'we21-3', '"To kill two birds with one stone" means:', '["Hunting birds", "Achieving two goals at once", "Being violent", "Using weapons"]', 1, 'Achieving two things with a single action.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2021, 'we21-4', 'The stressed syllable in "photograph" falls on:', '["pho-", "-to-", "-graph", "All equal"]', 0, 'PHO-to-graph — stress is on the first syllable.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2021, 'we21-5', '"He came late ___ he missed the bus."', '["because", "although", "unless", "until"]', 0, '"Because" shows the causal relationship.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2020, 'we20-1', 'A "bibliography" is:', '["A biography", "A list of books referenced", "A type of essay", "A speech"]', 1, 'A bibliography is a list of sources consulted.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2020, 'we20-2', 'Which sentence uses the subjunctive mood?', '["She was at school.", "If I were you, I would study.", "He goes to school.", "They are late."]', 1, '"If I were you" uses the subjunctive mood.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2020, 'we20-3', '"The committee ___ divided on the issue."', '["is", "are", "were", "have"]', 1, 'When members act individually, use plural verb.'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2020, 'we20-4', 'An "oxymoron" is:', '["A type of rhyme", "A combination of contradictory words", "A long narrative", "Repetition of sounds"]', 1, 'E.g., "living dead" or "deafening silence".'),
((SELECT id FROM subjects WHERE slug='w-eng'), 2020, 'we20-5', 'Choose the correct tag: "She can swim, ___?"', '["can she", "can''t she", "could she", "does she"]', 1, 'Positive statement gets a negative tag.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- WASSCE INTEGRATED SCIENCE QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-1', 'The mole is the SI unit of:', '["Mass", "Amount of substance", "Volume", "Temperature"]', 1, 'The mole measures the amount of substance.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-2', 'Which organelle is responsible for protein synthesis?', '["Mitochondria", "Ribosome", "Nucleus", "Golgi body"]', 1, 'Ribosomes are the site of protein synthesis.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-3', 'Ohm''s law states that V = ?', '["IR", "I/R", "R/I", "I+R"]', 0, 'V = IR.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-4', 'The process of cell division that produces gametes is:', '["Mitosis", "Meiosis", "Osmosis", "Binary fission"]', 1, 'Meiosis produces haploid gametes.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-5', 'Which element has the atomic number 1?', '["Helium", "Oxygen", "Hydrogen", "Carbon"]', 2, 'Hydrogen has 1 proton.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-6', 'Which of the following is a vector quantity?', '["Speed", "Mass", "Velocity", "Time"]', 2, 'Velocity has magnitude and direction.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-7', 'What is the most abundant gas in the Earth''s atmosphere?', '["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"]', 1, 'Nitrogen makes up about 78%.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-8', 'Which part of the eye controls the amount of light entering?', '["Retina", "Cornea", "Iris", "Optic nerve"]', 2, 'The iris regulates the pupil size.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-9', 'What is the chemical symbol for Gold?', '["Ag", "Gd", "Au", "Pb"]', 2, 'Au comes from the Latin "Aurum".'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-10', 'Which of these is a non-metal?', '["Iron", "Sodium", "Sulfur", "Copper"]', 2, 'Sulfur is a non-metal.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-11', 'The escape velocity from Earth is approximately:', '["5.2 km/s", "7.9 km/s", "11.2 km/s", "16.7 km/s"]', 2, '11.2 km/s is needed to escape Earth''s gravity.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-12', 'Which hormone regulates blood sugar levels?', '["Adrenaline", "Thyroxine", "Insulin", "Estrogen"]', 2, 'Insulin from the pancreas lowers blood sugar.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-13', 'What type of mirror is used in car side-view mirrors?', '["Plane", "Concave", "Convex", "Spherical"]', 2, 'Convex mirrors provide a wider field of view.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-14', 'An object at the center of curvature of a concave mirror. Its image is:', '["Virtual and upright", "Real and inverted", "Real and upright", "Virtual and inverted"]', 1, 'Concave mirrors produce real, inverted images.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2022, 'ws22-15', 'Which of the following is an allotrope of carbon?', '["Steel", "Diamond", "Bronze", "Brass"]', 1, 'Diamond and graphite are allotropes of carbon.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2021, 'ws21-1', 'An acid turns blue litmus paper:', '["Blue", "Red", "Green", "Yellow"]', 1, 'Acids turn blue litmus red.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2021, 'ws21-2', 'The powerhouse of the cell is the:', '["Nucleus", "Ribosome", "Mitochondria", "Cell membrane"]', 2, 'Mitochondria produce ATP.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2021, 'ws21-3', 'Which wave type requires a medium?', '["Light", "Radio", "Sound", "X-ray"]', 2, 'Sound is a mechanical wave.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2021, 'ws21-4', 'Phototropism in plants is a response to:', '["Water", "Light", "Gravity", "Touch"]', 1, 'Phototropism is growth toward/away from light.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2021, 'ws21-5', 'What is the valency of oxygen?', '["1", "2", "3", "4"]', 1, 'Oxygen needs 2 more electrons → valency = 2.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2020, 'ws20-1', 'Newton''s third law states that for every action there is:', '["No reaction", "An equal reaction", "An equal and opposite reaction", "A greater reaction"]', 2, 'Every action has an equal and opposite reaction.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2020, 'ws20-2', 'DNA stands for:', '["Deoxyribose Nucleic Acid", "Deoxyribonucleic Acid", "Diribonucleic Acid", "Deoxyribonucleic Association"]', 1, 'DNA = Deoxyribonucleic Acid.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2020, 'ws20-3', 'Which gas is produced when metals react with dilute acids?', '["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"]', 2, 'Metal + Acid → Salt + Hydrogen.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2020, 'ws20-4', 'The lens of the human eye focuses light on the:', '["Cornea", "Iris", "Retina", "Pupil"]', 2, 'The retina detects light.'),
((SELECT id FROM subjects WHERE slug='w-isci'), 2020, 'ws20-5', 'An isotope has the same number of ___ but different ___:', '["Neutrons, Protons", "Protons, Neutrons", "Electrons, Protons", "Protons, Electrons"]', 1, 'Same protons, different neutrons.')
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================
-- WASSCE SOCIAL STUDIES QUESTIONS
-- ============================================================
INSERT INTO questions (subject_id, year, slug, question, options, correct_answer, explanation) VALUES
((SELECT id FROM subjects WHERE slug='w-social'), 2022, 'wss22-1', 'The United Nations was established in:', '["1919", "1939", "1945", "1960"]', 2, 'The UN was established on October 24, 1945.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2022, 'wss22-2', 'Which of these is NOT a fundamental human right?', '["Right to life", "Right to vote at age 10", "Freedom of speech", "Right to education"]', 1, 'Voting is restricted by age (18+).'),
((SELECT id FROM subjects WHERE slug='w-social'), 2022, 'wss22-3', 'The African Union (AU) headquarters is in:', '["Lagos", "Nairobi", "Addis Ababa", "Cairo"]', 2, 'The AU is headquartered in Addis Ababa, Ethiopia.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2022, 'wss22-4', 'Globalisation refers to:', '["Isolating economies", "Increasing worldwide interconnection", "Reducing trade", "Localising production"]', 1, 'Globalisation is increasing integration of world economies.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2022, 'wss22-5', 'The 1992 Constitution of Ghana established:', '["Military rule", "One-party system", "Multi-party democracy", "Monarchy"]', 2, 'The 4th Republic constitution established multi-party democracy.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2021, 'wss21-1', 'Sustainable development means:', '["Rapid industrialization", "Meeting present needs without compromising the future", "Unlimited resource use", "Urban expansion"]', 1, 'Sustainability balances present needs with future generations.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2021, 'wss21-2', 'The Speaker of Parliament in Ghana is elected by:', '["The President", "Members of Parliament", "The Judiciary", "The Electoral Commission"]', 1, 'Members of Parliament elect the Speaker.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2021, 'wss21-3', 'Brain drain refers to:', '["Mental illness", "Skilled workers leaving their country", "Education reform", "Rural-urban migration"]', 1, 'Brain drain is the emigration of skilled professionals.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2021, 'wss21-4', 'Which river is the longest in Africa?', '["Niger", "Congo", "Nile", "Volta"]', 2, 'The Nile River (6,650 km) is the longest.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2021, 'wss21-5', 'Adolescent reproductive health education aims to:', '["Encourage early marriage", "Inform youth about responsible behaviour", "Promote large families", "Reduce school attendance"]', 1, 'It educates young people about responsible behaviour.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2020, 'wss20-1', 'Good governance includes all EXCEPT:', '["Accountability", "Transparency", "Corruption", "Rule of law"]', 2, 'Corruption opposes good governance.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2020, 'wss20-2', 'CHRAJ stands for:', '["Commission on Human Rights and Administrative Justice", "Council of Human Rights and Administration of Justice", "Committee on Human Rights and Administrative Judgement", "Commission on Human Relations and Administrative Justice"]', 0, 'CHRAJ = Commission on Human Rights and Administrative Justice.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2020, 'wss20-3', 'A major cause of rural-urban migration in Ghana is:', '["Better farming land", "Abundant natural resources", "Employment opportunities in cities", "Lower cost of living in cities"]', 2, 'People move to cities seeking jobs.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2020, 'wss20-4', 'The main purpose of taxation is to:', '["Punish citizens", "Generate government revenue", "Reduce population", "Control elections"]', 1, 'Taxes fund government services.'),
((SELECT id FROM subjects WHERE slug='w-social'), 2020, 'wss20-5', 'Conflict resolution methods include all EXCEPT:', '["Negotiation", "Mediation", "Violence", "Arbitration"]', 2, 'Violence is not a conflict resolution method.')
ON CONFLICT (subject_id, slug) DO NOTHING;
