import { Subject } from '../types';

export const wassceSubjects: Subject[] = [
    {
        id: 'w-cmath', name: 'Core Mathematics', icon: '🔢',
        years: [
            {
                year: 2022, questions: [
                    { id: 'wm22-1', question: 'Solve the equation: 3x² - 12 = 0', options: ['x = ±2', 'x = ±4', 'x = ±3', 'x = ±6'], correctAnswer: 0, explanation: '3x² = 12, x² = 4, x = ±2' },
                    { id: 'wm22-2', question: 'Find the gradient of the line 2y + 3x = 6', options: ['-3/2', '3/2', '-2/3', '2/3'], correctAnswer: 0, explanation: '2y = -3x + 6, y = -3x/2 + 3. Gradient = -3/2' },
                    { id: 'wm22-3', question: 'If log₁₀2 = 0.301, find log₁₀8', options: ['0.602', '0.903', '2.408', '0.301'], correctAnswer: 1, explanation: 'log₁₀8 = log₁₀2³ = 3 × 0.301 = 0.903' },
                    { id: 'wm22-4', question: 'What is the sum of interior angles of a hexagon?', options: ['360°', '540°', '720°', '900°'], correctAnswer: 2, explanation: '(n-2)×180 = (6-2)×180 = 720°' },
                    { id: 'wm22-5', question: 'Simplify: (√50 - √32)', options: ['√2', '√18', '3√2', '√8'], correctAnswer: 0, explanation: '√50 = 5√2, √32 = 4√2. 5√2 - 4√2 = √2' },
                    { id: 'wm22-6', question: 'Find the value of x if 2^(x+1) = 32.', options: ['3', '4', '5', '6'], correctAnswer: 1, explanation: '32 = 2⁵. x + 1 = 5 → x = 4.' },
                    { id: 'wm22-7', question: 'Calculate the simple interest on GH₵2000 for 3 years at 5% per annum.', options: ['GH₵300', 'GH₵400', 'GH₵500', 'GH₵600'], correctAnswer: 0, explanation: 'SI = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = 300.' },
                    { id: 'wm22-8', question: 'The probability of an event happening is 0.35. What is the probability of the event NOT happening?', options: ['0.35', '0.55', '0.65', '0.75'], correctAnswer: 2, explanation: 'P(not E) = 1 - P(E) = 1 - 0.35 = 0.65.' },
                    { id: 'wm22-9', question: 'Rationalize the denominator: 1 / √2', options: ['√2', '√2 / 2', '2√2', '2'], correctAnswer: 1, explanation: '(1 / √2) × (√2 / √2) = √2 / 2.' },
                    { id: 'wm22-10', question: 'Find the length of the hypotenuse of a right-angled triangle with sides 5 cm and 12 cm.', options: ['13 cm', '15 cm', '17 cm', '20 cm'], correctAnswer: 0, explanation: 'c² = a² + b² = 5² + 12² = 25 + 144 = 169. c = √169 = 13.' },
                    { id: 'wm22-11', question: 'Evaluate (0.04)⁰.⁵', options: ['0.02', '0.2', '2.0', '0.002'], correctAnswer: 1, explanation: '√(0.04) = 0.2.' },
                    { id: 'wm22-12', question: 'If f(x) = 2x² - 3x + 1, find f(2).', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: 'f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3.' },
                    { id: 'wm22-13', question: 'Solve for x: (x - 2) / 3 = 4', options: ['10', '12', '14', '16'], correctAnswer: 2, explanation: 'x - 2 = 12 → x = 14.' },
                    { id: 'wm22-14', question: 'Convert 150° to radians.', options: ['π/2', '2π/3', '5π/6', '3π/2'], correctAnswer: 2, explanation: 'Rad = (Deg × π) / 180 = (150 × π) / 180 = 5π/6.' },
                    { id: 'wm22-15', question: 'The perimeter of a circle is 44 cm. Find its radius. (π = 22/7)', options: ['7 cm', '14 cm', '21 cm', '28 cm'], correctAnswer: 0, explanation: 'C = 2πr → 44 = 2 × 22/7 × r → 44 = 44/7 × r → r = 7.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'wm21-1', question: 'Find the 10th term of the AP: 3, 7, 11, 15, ...', options: ['39', '43', '35', '47'], correctAnswer: 0, explanation: 'a = 3, d = 4. T₁₀ = 3 + (10-1)×4 = 3 + 36 = 39' },
                    { id: 'wm21-2', question: 'If P = {1,2,3,4,5} and Q = {3,4,5,6,7}, find P∩Q', options: ['{1,2}', '{3,4,5}', '{6,7}', '{1,2,3,4,5,6,7}'], correctAnswer: 1, explanation: 'P∩Q contains elements common to both sets: {3,4,5}' },
                    { id: 'wm21-3', question: 'Convert 110₂ to base 10', options: ['4', '5', '6', '7'], correctAnswer: 2, explanation: '1×2² + 1×2¹ + 0×2⁰ = 4 + 2 + 0 = 6' },
                    { id: 'wm21-4', question: 'A circle has radius 7 cm. Find its area. (π = 22/7)', options: ['44 cm²', '154 cm²', '308 cm²', '22 cm²'], correctAnswer: 1, explanation: 'A = πr² = 22/7 × 7² = 22/7 × 49 = 154 cm²' },
                    { id: 'wm21-5', question: 'Factorize: x² - 9', options: ['(x-3)(x-3)', '(x+3)(x+3)', '(x-3)(x+3)', '(x-9)(x+1)'], correctAnswer: 2, explanation: 'Difference of squares: a²-b² = (a-b)(a+b). x²-9 = (x-3)(x+3)' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'wm20-1', question: 'Evaluate: 27^(1/3)', options: ['3', '9', '81', '1/3'], correctAnswer: 0, explanation: '27^(1/3) = ∛27 = 3' },
                    { id: 'wm20-2', question: 'If tan θ = 3/4 and θ is acute, find sin θ', options: ['3/5', '4/5', '3/4', '5/3'], correctAnswer: 0, explanation: 'If tan = 3/4, opp=3, adj=4, hyp=5. sin = 3/5' },
                    { id: 'wm20-3', question: 'The mean of 5 numbers is 8. If one number is removed, the mean becomes 7. What was removed?', options: ['10', '11', '12', '13'], correctAnswer: 2, explanation: 'Sum = 5×8 = 40. New sum = 4×7 = 28. Removed = 40-28 = 12' },
                    { id: 'wm20-4', question: 'Solve: 2ˣ = 16', options: ['2', '3', '4', '8'], correctAnswer: 2, explanation: '2ˣ = 16 = 2⁴, so x = 4' },
                    { id: 'wm20-5', question: 'Find the median of: 3, 7, 1, 9, 5', options: ['3', '5', '7', '9'], correctAnswer: 1, explanation: 'Arranged: 1,3,5,7,9. Median (middle) = 5' },
                ]
            },
        ],
    },
    {
        id: 'w-eng', name: 'English Language', icon: '📖',
        years: [
            {
                year: 2022, questions: [
                    { id: 'we22-1', question: 'Choose the word that best completes: "The manager\'s decision was ___."', options: ['Arbitary', 'Arbitrary', 'Arbritray', 'Arbirary'], correctAnswer: 1, explanation: '"Arbitrary" means based on random choice rather than reason.' },
                    { id: 'we22-2', question: '"Had I known, I would have come." This sentence expresses:', options: ['A wish', 'A regret', 'An order', 'A request'], correctAnswer: 1, explanation: 'The past perfect conditional expresses regret about the past.' },
                    { id: 'we22-3', question: 'A "monologue" is a speech given by:', options: ['Two people', 'A group', 'One person', 'An audience'], correctAnswer: 2, explanation: '"Mono" means one. A monologue is a speech by one person.' },
                    { id: 'we22-4', question: 'The literary device in "He is as brave as a lion" is:', options: ['Metaphor', 'Simile', 'Irony', 'Alliteration'], correctAnswer: 1, explanation: 'A simile compares using "as" or "like".' },
                    { id: 'we22-5', question: 'Which is the correct passive form of "She writes a letter"?', options: ['A letter was written by her', 'A letter is written by her', 'A letter were written by her', 'A letter is writing by her'], correctAnswer: 1, explanation: 'Present tense passive: subject + is/are + past participle.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'we21-1', question: '"Ephemeral" most nearly means:', options: ['Eternal', 'Short-lived', 'Beautiful', 'Mysterious'], correctAnswer: 1, explanation: '"Ephemeral" means lasting for a very short time.' },
                    { id: 'we21-2', question: 'Identify the clause type: "When the bell rang, students rushed out."', options: ['Noun clause', 'Adverbial clause', 'Adjectival clause', 'Main clause'], correctAnswer: 1, explanation: '"When the bell rang" is a subordinate adverbial clause of time.' },
                    { id: 'we21-3', question: '"To kill two birds with one stone" means:', options: ['Hunting birds', 'Achieving two goals at once', 'Being violent', 'Using weapons'], correctAnswer: 1, explanation: 'This idiom means achieving two things with a single action.' },
                    { id: 'we21-4', question: 'The stressed syllable in "photograph" falls on:', options: ['pho-', '-to-', '-graph', 'All equal'], correctAnswer: 0, explanation: 'PHO-to-graph — stress is on the first syllable.' },
                    { id: 'we21-5', question: '"He came late ___ he missed the bus."', options: ['because', 'although', 'unless', 'until'], correctAnswer: 0, explanation: '"Because" shows the causal relationship.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'we20-1', question: 'A "bibliography" is:', options: ['A biography', 'A list of books referenced', 'A type of essay', 'A speech'], correctAnswer: 1, explanation: 'A bibliography is a list of sources consulted in research.' },
                    { id: 'we20-2', question: 'Which sentence uses the subjunctive mood?', options: ['She was at school.', 'If I were you, I would study.', 'He goes to school.', 'They are late.'], correctAnswer: 1, explanation: '"If I were you" uses the subjunctive mood for hypothetical situations.' },
                    { id: 'we20-3', question: '"The committee ___ divided on the issue."', options: ['is', 'are', 'were', 'have'], correctAnswer: 1, explanation: 'When members act individually, use plural verb "are".' },
                    { id: 'we20-4', question: 'An "oxymoron" is:', options: ['A type of rhyme', 'A combination of contradictory words', 'A long narrative', 'Repetition of sounds'], correctAnswer: 1, explanation: 'E.g., "living dead" or "deafening silence" — contradictory terms.' },
                    { id: 'we20-5', question: 'Choose the correct tag: "She can swim, ___?"', options: ['can she', 'can\'t she', 'could she', 'does she'], correctAnswer: 1, explanation: 'Positive statement gets a negative tag: "can\'t she?"' },
                ]
            },
        ],
    },
    {
        id: 'w-isci', name: 'Integrated Science', icon: '⚗️',
        years: [
            {
                year: 2022, questions: [
                    { id: 'ws22-1', question: 'The mole is the SI unit of:', options: ['Mass', 'Amount of substance', 'Volume', 'Temperature'], correctAnswer: 1, explanation: 'The mole measures the amount of substance (Avogadro\'s number).' },
                    { id: 'ws22-2', question: 'Which organelle is responsible for protein synthesis?', options: ['Mitochondria', 'Ribosome', 'Nucleus', 'Golgi body'], correctAnswer: 1, explanation: 'Ribosomes are the site of protein synthesis.' },
                    { id: 'ws22-3', question: 'Ohm\'s law states that V = ?', options: ['IR', 'I/R', 'R/I', 'I+R'], correctAnswer: 0, explanation: 'Ohm\'s law: V = IR (Voltage = Current × Resistance).' },
                    { id: 'ws22-4', question: 'The process of cell division that produces gametes is:', options: ['Mitosis', 'Meiosis', 'Osmosis', 'Binary fission'], correctAnswer: 1, explanation: 'Meiosis produces haploid gametes (sex cells).' },
                    { id: 'ws22-5', question: 'Which element has the atomic number 1?', options: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'], correctAnswer: 2, explanation: 'Hydrogen has 1 proton → atomic number 1.' },
                    { id: 'ws22-6', question: 'Which of the following is a vector quantity?', options: ['Speed', 'Mass', 'Velocity', 'Time'], correctAnswer: 2, explanation: 'Velocity has both magnitude and direction.' },
                    { id: 'ws22-7', question: 'What is the most abundant gas in the Earth\'s atmosphere?', options: ['Oxygen', 'Nitrogen', 'Argon', 'Carbon dioxide'], correctAnswer: 1, explanation: 'Nitrogen makes up about 78% of the Earth\'s atmosphere.' },
                    { id: 'ws22-8', question: 'Which part of the eye controls the amount of light entering?', options: ['Retina', 'Cornea', 'Iris', 'Optic nerve'], correctAnswer: 2, explanation: 'The iris regulates the size of the pupil and thus the light entry.' },
                    { id: 'ws22-9', question: 'What is the chemical symbol for Gold?', options: ['Ag', 'Gd', 'Au', 'Pb'], correctAnswer: 2, explanation: 'Au comes from the Latin word "Aurum".' },
                    { id: 'ws22-10', question: 'Which of these is a non-metal?', options: ['Iron', 'Sodium', 'Sulfur', 'Copper'], correctAnswer: 2, explanation: 'Sulfur is a non-metal; the others are metals.' },
                    { id: 'ws22-11', question: 'The escape velocity from Earth is approximately:', options: ['5.2 km/s', '7.9 km/s', '11.2 km/s', '16.7 km/s'], correctAnswer: 2, explanation: '11.2 km/s is the minimum speed needed to escape Earth\'s gravity.' },
                    { id: 'ws22-12', question: 'Which hormone regulates blood sugar levels?', options: ['Adrenaline', 'Thyroxine', 'Insulin', 'Estrogen'], correctAnswer: 2, explanation: 'Insulin produced by the pancreas lowers blood sugar.' },
                    { id: 'ws22-13', question: 'What type of mirror is used in car side-view mirrors?', options: ['Plane', 'Concave', 'Convex', 'Spherical'], correctAnswer: 2, explanation: 'Convex mirrors provide a wider field of view.' },
                    { id: 'ws22-14', question: 'An object is placed at the center of curvature of a concave mirror. Its image is:', options: ['Virtual and upright', 'Real and inverted', 'Real and upright', 'Virtual and inverted'], correctAnswer: 1, explanation: 'Concave mirrors produce real, inverted images for objects beyond the focal point.' },
                    { id: 'ws22-15', question: 'Which of the following is an allotrope of carbon?', options: ['Steel', 'Diamond', 'Bronze', 'Brass'], correctAnswer: 1, explanation: 'Diamond and graphite are allotropes of carbon.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'ws21-1', question: 'An acid turns blue litmus paper:', options: ['Blue', 'Red', 'Green', 'Yellow'], correctAnswer: 1, explanation: 'Acids turn blue litmus red.' },
                    { id: 'ws21-2', question: 'The powerhouse of the cell is the:', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Cell membrane'], correctAnswer: 2, explanation: 'Mitochondria produce ATP — the cell\'s energy currency.' },
                    { id: 'ws21-3', question: 'Which wave type requires a medium?', options: ['Light', 'Radio', 'Sound', 'X-ray'], correctAnswer: 2, explanation: 'Sound is a mechanical wave; it requires a medium to travel.' },
                    { id: 'ws21-4', question: 'Phototropism in plants is a response to:', options: ['Water', 'Light', 'Gravity', 'Touch'], correctAnswer: 1, explanation: 'Phototropism is the growth of a plant toward or away from light.' },
                    { id: 'ws21-5', question: 'What is the valency of oxygen?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'Oxygen has 6 valence electrons and needs 2 more → valency = 2.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'ws20-1', question: 'Newton\'s third law states that for every action there is:', options: ['No reaction', 'An equal reaction', 'An equal and opposite reaction', 'A greater reaction'], correctAnswer: 2, explanation: 'Newton\'s 3rd law: every action has an equal and opposite reaction.' },
                    { id: 'ws20-2', question: 'DNA stands for:', options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribonucleic Association'], correctAnswer: 1, explanation: 'DNA = Deoxyribonucleic Acid — the molecule of heredity.' },
                    { id: 'ws20-3', question: 'Which gas is produced when metals react with dilute acids?', options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'], correctAnswer: 2, explanation: 'Metal + Acid → Salt + Hydrogen gas.' },
                    { id: 'ws20-4', question: 'The lens of the human eye focuses light on the:', options: ['Cornea', 'Iris', 'Retina', 'Pupil'], correctAnswer: 2, explanation: 'The retina contains photoreceptor cells that detect light.' },
                    { id: 'ws20-5', question: 'An isotope of an element has the same number of ___ but different ___:', options: ['Neutrons, Protons', 'Protons, Neutrons', 'Electrons, Protons', 'Protons, Electrons'], correctAnswer: 1, explanation: 'Isotopes: same protons (same element) but different neutrons.' },
                ]
            },
        ],
    },
    {
        id: 'w-social', name: 'Social Studies', icon: '🏛️',
        years: [
            {
                year: 2022, questions: [
                    { id: 'wss22-1', question: 'The United Nations was established in:', options: ['1919', '1939', '1945', '1960'], correctAnswer: 2, explanation: 'The UN was established on October 24, 1945.' },
                    { id: 'wss22-2', question: 'Which of these is NOT a fundamental human right?', options: ['Right to life', 'Right to vote at age 10', 'Freedom of speech', 'Right to education'], correctAnswer: 1, explanation: 'Voting is restricted by age (18+); there is no right to vote at 10.' },
                    { id: 'wss22-3', question: 'The African Union (AU) headquarters is in:', options: ['Lagos', 'Nairobi', 'Addis Ababa', 'Cairo'], correctAnswer: 2, explanation: 'The AU is headquartered in Addis Ababa, Ethiopia.' },
                    { id: 'wss22-4', question: 'Globalisation refers to:', options: ['Isolating economies', 'Increasing worldwide interconnection', 'Reducing trade', 'Localising production'], correctAnswer: 1, explanation: 'Globalisation is the increasing integration of world economies and cultures.' },
                    { id: 'wss22-5', question: 'The 1992 Constitution of Ghana established:', options: ['Military rule', 'One-party system', 'Multi-party democracy', 'Monarchy'], correctAnswer: 2, explanation: 'The 4th Republic constitution (1992) established multi-party democracy.' },
                ]
            },
            {
                year: 2021, questions: [
                    { id: 'wss21-1', question: 'Sustainable development means:', options: ['Rapid industrialization', 'Meeting present needs without compromising the future', 'Unlimited resource use', 'Urban expansion'], correctAnswer: 1, explanation: 'Sustainability balances present needs with future generation needs.' },
                    { id: 'wss21-2', question: 'The Speaker of Parliament in Ghana is elected by:', options: ['The President', 'Members of Parliament', 'The Judiciary', 'The Electoral Commission'], correctAnswer: 1, explanation: 'Members of Parliament elect the Speaker from among themselves or outside.' },
                    { id: 'wss21-3', question: 'Brain drain refers to:', options: ['Mental illness', 'Skilled workers leaving their country', 'Education reform', 'Rural-urban migration'], correctAnswer: 1, explanation: 'Brain drain is the emigration of highly trained professionals.' },
                    { id: 'wss21-4', question: 'Which river is the longest in Africa?', options: ['Niger', 'Congo', 'Nile', 'Volta'], correctAnswer: 2, explanation: 'The Nile River (6,650 km) is the longest in Africa.' },
                    { id: 'wss21-5', question: 'Adolescent reproductive health education aims to:', options: ['Encourage early marriage', 'Inform youth about responsible behaviour', 'Promote large families', 'Reduce school attendance'], correctAnswer: 1, explanation: 'It aims to educate young people about responsible reproductive behaviour.' },
                ]
            },
            {
                year: 2020, questions: [
                    { id: 'wss20-1', question: 'Good governance includes all EXCEPT:', options: ['Accountability', 'Transparency', 'Corruption', 'Rule of law'], correctAnswer: 2, explanation: 'Corruption opposes good governance principles.' },
                    { id: 'wss20-2', question: 'CHRAJ stands for:', options: ['Commission on Human Rights and Administrative Justice', 'Council of Human Rights and Administration of Justice', 'Committee on Human Rights and Administrative Judgement', 'Commission on Human Relations and Administrative Justice'], correctAnswer: 0, explanation: 'CHRAJ = Commission on Human Rights and Administrative Justice.' },
                    { id: 'wss20-3', question: 'A major cause of rural-urban migration in Ghana is:', options: ['Better farming land', 'Abundant natural resources', 'Employment opportunities in cities', 'Lower cost of living in cities'], correctAnswer: 2, explanation: 'People move to cities seeking jobs and better economic opportunities.' },
                    { id: 'wss20-4', question: 'The main purpose of taxation is to:', options: ['Punish citizens', 'Generate government revenue', 'Reduce population', 'Control elections'], correctAnswer: 1, explanation: 'Taxes fund government services, infrastructure, and development.' },
                    { id: 'wss20-5', question: 'Conflict resolution methods include all EXCEPT:', options: ['Negotiation', 'Mediation', 'Violence', 'Arbitration'], correctAnswer: 2, explanation: 'Violence is not a conflict resolution method; it escalates conflict.' },
                ]
            },
        ],
    },
];
