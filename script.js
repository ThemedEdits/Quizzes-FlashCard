document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const quizModeBtn = document.getElementById('quiz-mode-btn');
    const flashcardModeBtn = document.getElementById('flashcard-mode-btn');
    const quizContainer = document.getElementById('quiz-container');
    const flashcardContainer = document.getElementById('flashcard-container');
    const resultsContainer = document.getElementById('results-container');
    const nextQuestionBtn = document.getElementById('next-question');
    const flashcard = document.querySelector('.flashcard');
    const prevCardBtn = document.getElementById('prev-card');
    const nextCardBtn = document.getElementById('next-card');
    const shuffleCardsBtn = document.getElementById('shuffle-cards');
    const filterCardsBtn = document.getElementById('filter-cards');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const shareResultsBtn = document.getElementById('share-results');
    const topicLinks = document.querySelectorAll('.dropdown-content a');

    // App State
    let darkMode = false;
    let currentMode = 'quiz';
    let currentTopic = 'coding';
    let quizData = {};
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let timer;
    let timeLeft = 60;
    let flashcards = [];
    let currentCardIndex = 0;
    let filteredCards = [];
    let onlyPracticeCards = false;


    const sampleData = {
        coding: {
            quiz: [
                {
                    question: "Which of these is NOT a JavaScript framework?",
                    options: [
                        "React",
                        "Angular",
                        "Laravel",
                        "Vue"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which symbol is used for comments in JavaScript?",
                    options: [
                        "//",
                        "/* */",
                        "<!-- -->",
                        "#"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "Which of the following is not a programming language?",
                    options: [
                        "Python",
                        "HTML",
                        "Java",
                        "C++"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "Which method is used to output data in Python?",
                    options: [
                        "echo()",
                        "printf()",
                        "cout<<",
                        "print()"
                    ],
                    answer: 3,
                    difficulty: "easy"
                },
                {
                    question: "Which of the following is a JavaScript framework?",
                    options: [
                        "Django",
                        "React",
                        "Laravel",
                        "Flask"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "In which language is the Android SDK primarily written?",
                    options: [
                        "Kotlin",
                        "Swift",
                        "Java",
                        "C#"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which of the following is used to style a web page?",
                    options: [
                        "HTML",
                        "Python",
                        "CSS",
                        "SQL"
                    ],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "What does API stand for?",
                    options: [
                        "Application Programming Interface",
                        "Advanced Program Integration",
                        "Application Program Initialization",
                        "Automated Program Interaction"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "What does SQL stand for?",
                    options: [
                        "Structured Query Language",
                        "Simple Query Language",
                        "Standard Question Language",
                        "Sequential Query Logic"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "Which of these is not a Python data type?",
                    options: [
                        "list",
                        "dict",
                        "set",
                        "arraylist"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "Which keyword is used to define a function in JavaScript?",
                    options: [
                        "function",
                        "def",
                        "method",
                        "func"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "What is the correct syntax to connect a CSS file to an HTML document?",
                    options: [
                        "<link rel='stylesheet' href='style.css'>",
                        "<style src='style.css'>",
                        "<css link='style.css'>",
                        "<script href='style.css'>"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "Which of these is a Python web framework?",
                    options: [
                        "Laravel",
                        "Flask",
                        "Angular",
                        "Spring"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "Which HTML element is used to add a JavaScript file?",
                    options: [
                        "<script>",
                        "<js>",
                        "<javascript>",
                        "<link>"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "What is the purpose of 'use strict' in JavaScript?",
                    options: [
                        "To enable strict CSS rules",
                        "To write cleaner code and avoid some bugs",
                        "To enable strict HTML validation",
                        "To define a strict function"
                    ],
                    answer: 1,
                    difficulty: "hard"
                },
                {
                    question: "Which function is used to parse a JSON string in JavaScript?",
                    options: [
                        "JSON.stringify()",
                        "JSON.decode()",
                        "JSON.parse()",
                        "parse.JSON()"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which HTML tag is used to define an unordered list?",
                    options: [
                        "<ol>",
                        "<ul>",
                        "<li>",
                        "<list>"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Which of the following is not a loop structure in JavaScript?",
                    options: [
                        "for",
                        "while",
                        "do-while",
                        "repeat-until"
                    ],
                    answer: 3,
                    difficulty: "hard"
                },
                {
                    question: "What is the result of 3 + '3' in JavaScript?",
                    options: [
                        "6",
                        "'6'",
                        "33",
                        "'33'"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "Which HTTP method is used to update data?",
                    options: [
                        "GET",
                        "POST",
                        "PUT",
                        "FETCH"
                    ],
                    answer: 2,
                    difficulty: "medium"
                }
            ],
            flashcards: [
                { front: "What does HTML stand for?", back: "Hyper Text Markup Language", known: false },
                { front: "What does CSS stand for?", back: "Cascading Style Sheets", known: false },
                { front: "What is the purpose of JavaScript?", back: "To add interactivity to web pages", known: false },
                { front: "What does DOM stand for in web development?", back: "Document Object Model", known: false },
                { front: "What does the <head> element contain in HTML?", back: "Metadata and links to scripts or styles", known: false },
                { front: "What is a semantic HTML tag?", back: "A tag that clearly describes its meaning (like <article>, <footer>)", known: false },
                { front: "What is the purpose of the 'alt' attribute in an <img> tag?", back: "To provide alternative text for an image", known: false },
                { front: "What does the 'href' attribute in an <a> tag specify?", back: "The URL of the page the link goes to", known: false },
                { front: "What is the difference between 'id' and 'class' in HTML?", back: "'id' is unique, 'class' can be reused", known: false },
                { front: "What does the 'viewport' meta tag control?", back: "How a web page is displayed on different screen sizes", known: false },
                { front: "What does a 'responsive' website mean?", back: "It adjusts layout based on screen size or device", known: false },
                { front: "What is a pseudo-class in CSS?", back: "A keyword added to a selector that defines a special state", known: false },
                { front: "What does the CSS property 'z-index' control?", back: "The stacking order of elements", known: false },
                { front: "What is an external stylesheet?", back: "A separate .css file linked to the HTML document", known: false },
                { front: "What does the 'box model' in CSS consist of?", back: "Content, padding, border, and margin", known: false },
                { front: "What does the JavaScript function setTimeout() do?", back: "Executes a function after a specified delay", known: false },
                { front: "What does 'NaN' stand for in JavaScript?", back: "Not a Number", known: false },
                { front: "What is the use of the 'let' keyword in JavaScript?", back: "To declare a block-scoped variable", known: false },
                { front: "What does JSON stand for?", back: "JavaScript Object Notation", known: false },
                { front: "What is a callback function?", back: "A function passed as an argument to another function", known: false }

            ]
        },
        "general-knowledge": {
            quiz: [
                {
                    question: "What is the capital of France?",
                    options: [
                        "Berlin",
                        "Madrid",
                        "Paris",
                        "Rome"
                    ],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    options: [
                        "Venus",
                        "Saturn",
                        "Mars",
                        "Jupiter"
                    ],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "Who wrote the play 'Romeo and Juliet'?",
                    options: [
                        "William Shakespeare",
                        "Jane Austen",
                        "Charles Dickens",
                        "Mark Twain"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "Which gas do plants absorb from the atmosphere?",
                    options: [
                        "Oxygen",
                        "Carbon Dioxide",
                        "Nitrogen",
                        "Hydrogen"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "What is the largest mammal in the world?",
                    options: [
                        "Elephant",
                        "Blue Whale",
                        "Giraffe",
                        "Hippopotamus"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "In which country is the Great Pyramid of Giza located?",
                    options: [
                        "Mexico",
                        "Egypt",
                        "India",
                        "Iraq"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "What is the chemical symbol for gold?",
                    options: [
                        "Gd",
                        "Au",
                        "Ag",
                        "Go"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "How many continents are there in the world?",
                    options: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "What is the smallest prime number?",
                    options: [
                        "1",
                        "2",
                        "3",
                        "5"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "Which ocean is the largest?",
                    options: [
                        "Atlantic Ocean",
                        "Indian Ocean",
                        "Arctic Ocean",
                        "Pacific Ocean"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "Which language has the most native speakers worldwide?",
                    options: [
                        "English",
                        "Spanish",
                        "Mandarin Chinese",
                        "Hindi"
                    ],
                    answer: 2,
                    difficulty: "hard"
                },
                {
                    question: "Which organ in the human body is primarily responsible for filtering blood?",
                    options: [
                        "Liver",
                        "Heart",
                        "Kidneys",
                        "Lungs"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which element has the atomic number 1?",
                    options: [
                        "Oxygen",
                        "Hydrogen",
                        "Helium",
                        "Carbon"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Who painted the Mona Lisa?",
                    options: [
                        "Vincent van Gogh",
                        "Leonardo da Vinci",
                        "Michelangelo",
                        "Pablo Picasso"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "What currency is used in Japan?",
                    options: [
                        "Won",
                        "Yen",
                        "Renminbi",
                        "Baht"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "In which year did the Titanic sink?",
                    options: [
                        "1912",
                        "1905",
                        "1920",
                        "1898"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "Which famous scientist developed the theory of relativity?",
                    options: [
                        "Isaac Newton",
                        "Albert Einstein",
                        "Marie Curie",
                        "Galileo Galilei"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "Which country hosted the 2016 Summer Olympics?",
                    options: [
                        "China",
                        "Brazil",
                        "UK",
                        "Russia"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "What is the tallest mountain in the world?",
                    options: [
                        "K2",
                        "Mount Everest",
                        "Kangchenjunga",
                        "Makalu"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Which famous ship was discovered by Robert Ballard in 1985?",
                    options: [
                        "Lusitania",
                        "Titanic",
                        "Bismarck",
                        "Queen Mary"
                    ],
                    answer: 1,
                    difficulty: "hard"
                }
            ],
            flashcards: [
                { front: "Which country has the most natural lakes?", back: "Canada", known: false },
                { front: "What is the only food that never spoils?", back: "Honey", known: false },
                { front: "Which animal can sleep for up to three years?", back: "Snail", known: false },
                { front: "What is the smallest country in the world?", back: "Vatican City", known: false },
                { front: "Which planet spins the fastest in our solar system?", back: "Jupiter", known: false },
                { front: "What is the national flower of Japan?", back: "Cherry Blossom", known: false },
                { front: "Which bird is known for mimicking human speech?", back: "Parrot", known: false },
                { front: "What is the name of the largest desert in the world?", back: "Antarctic Desert", known: false },
                { front: "What part of the body continues to grow after death?", back: "None, it's a myth", known: false },
                { front: "Which country has a flag that is not rectangular or square?", back: "Nepal", known: false },
                { front: "How many hearts does an octopus have?", back: "Three", known: false },
                { front: "Which bone is the smallest in the human body?", back: "Stapes (in the ear)", known: false },
                { front: "What is the most widely spoken constructed language?", back: "Esperanto", known: false },
                { front: "What was the first country to grant women the right to vote?", back: "New Zealand", known: false },
                { front: "Which metal is liquid at room temperature?", back: "Mercury", known: false },
                { front: "Which is the only mammal capable of true flight?", back: "Bat", known: false },
                { front: "Which fruit floats in water because 25% of it is air?", back: "Apple", known: false },
                { front: "Which ancient civilization built Machu Picchu?", back: "Inca", known: false },
                { front: "What is the main ingredient in traditional Japanese miso soup?", back: "Fermented soybeans", known: false },
                { front: "What is the fear of long words ironically called?", back: "Hippopotomonstrosesquipedaliophobia", known: false }
            ]

        },
        sports: {
            quiz: [
                {
                    question: "Which country won the 2018 FIFA World Cup?",
                    options: [
                        "Germany",
                        "Brazil",
                        "France",
                        "Spain"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "How many players are there in a baseball team on the field?",
                    options: [
                        "9",
                        "10",
                        "11",
                        "8"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "What is the maximum score in a single frame of bowling?",
                    options: [
                        "20",
                        "30",
                        "40",
                        "50"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "In which country were the first modern Olympic Games held?",
                    options: [
                        "France",
                        "Greece",
                        "USA",
                        "Italy"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "How long is a marathon?",
                    options: [
                        "26.2 miles",
                        "25 miles",
                        "24 miles",
                        "30 miles"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "Which cricketer is known as the 'Master Blaster'?",
                    options: [
                        "MS Dhoni",
                        "Virat Kohli",
                        "Sachin Tendulkar",
                        "Kapil Dev"
                    ],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "Which country has won the most Olympic gold medals overall?",
                    options: [
                        "Russia",
                        "USA",
                        "China",
                        "Germany"
                    ],
                    answer: 1,
                    difficulty: "hard"
                },
                {
                    question: "What is the national sport of Japan?",
                    options: [
                        "Karate",
                        "Judo",
                        "Baseball",
                        "Sumo wrestling"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "How many minutes are played in a rugby union match?",
                    options: [
                        "80 minutes",
                        "90 minutes",
                        "60 minutes",
                        "75 minutes"
                    ],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "What is the term for scoring three goals in a single soccer game?",
                    options: [
                        "Triple",
                        "Hat-trick",
                        "Treble",
                        "Trio-goal"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Which tennis tournament is played on a grass surface?",
                    options: [
                        "Australian Open",
                        "French Open",
                        "US Open",
                        "Wimbledon"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "Which country invented table tennis?",
                    options: [
                        "China",
                        "Japan",
                        "England",
                        "Germany"
                    ],
                    answer: 2,
                    difficulty: "hard"
                },
                {
                    question: "Who holds the record for the most goals in World Cup history?",
                    options: [
                        "Cristiano Ronaldo",
                        "Miroslav Klose",
                        "Pele",
                        "Lionel Messi"
                    ],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "What does NBA stand for?",
                    options: [
                        "National Baseball Association",
                        "National Basketball Association",
                        "North Basketball Authority",
                        "New Basketball Alliance"
                    ],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "In which sport would you perform a slam dunk?",
                    options: [
                        "Basketball",
                        "Tennis",
                        "Football",
                        "Baseball"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "Which country won the ICC Cricket World Cup 2019?",
                    options: [
                        "Australia",
                        "India",
                        "New Zealand",
                        "England"
                    ],
                    answer: 3,
                    difficulty: "medium"
                },
                {
                    question: "Who is the fastest man in the world (100m sprint)?",
                    options: [
                        "Usain Bolt",
                        "Tyson Gay",
                        "Yohan Blake",
                        "Justin Gatlin"
                    ],
                    answer: 0,
                    difficulty: "easy"
                },
                {
                    question: "Which Grand Slam comes first in the calendar year?",
                    options: [
                        "Wimbledon",
                        "US Open",
                        "Australian Open",
                        "French Open"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "In which sport do teams compete for the Stanley Cup?",
                    options: [
                        "Baseball",
                        "Basketball",
                        "Ice Hockey",
                        "American Football"
                    ],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "What sport does Serena Williams play?",
                    options: [
                        "Badminton",
                        "Tennis",
                        "Golf",
                        "Athletics"
                    ],
                    answer: 1,
                    difficulty: "easy"
                }
            ]
            ,
            flashcards: [
                { front: "Who has won the most Olympic medals in history?", back: "Michael Phelps", known: false },
                { front: "Which sport is known as the 'King of Sports'?", back: "Soccer (Football)", known: false },
                { front: "Which country is known for originating kabaddi?", back: "India", known: false },
                { front: "In which sport do you use a shuttlecock?", back: "Badminton", known: false },
                { front: "How many rings are there in the Olympic symbol?", back: "Five", known: false },
                { front: "Which athlete is nicknamed 'The Lightning Bolt'?", back: "Usain Bolt", known: false },
                { front: "Which Grand Slam tournament is played on clay courts?", back: "French Open", known: false },
                { front: "How many holes are there in a standard round of golf?", back: "18", known: false },
                { front: "What color card means a player is sent off in football?", back: "Red", known: false },
                { front: "Which sport uses the terms 'love', 'deuce', and 'ace'?", back: "Tennis", known: false },
                { front: "Which country is famous for the sport of sumo wrestling?", back: "Japan", known: false },
                { front: "What sport is played on a diamond-shaped field?", back: "Baseball", known: false },
                { front: "Which cricketer has scored 100 international centuries?", back: "Sachin Tendulkar", known: false },
                { front: "What is the diameter of a basketball hoop in inches?", back: "18 inches", known: false },
                { front: "Which country hosts the Tour de France?", back: "France", known: false },
                { front: "How many players are on a volleyball team on the court?", back: "6", known: false },
                { front: "Which position in football wears gloves?", back: "Goalkeeper", known: false },
                { front: "Which boxer was known as 'The Greatest'?", back: "Muhammad Ali", known: false },
                { front: "Which country is known as the birthplace of the Olympic Games?", back: "Greece", known: false },
                { front: "Which chess piece can move in an L-shape?", back: "Knight", known: false }
            ]

        },
        design: {
            quiz: [
                {
                    question: "Which software is primarily used for vector graphic design?",
                    options: ["Photoshop", "Illustrator", "Figma", "InDesign"],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "What does UI stand for in design?",
                    options: ["User Information", "User Interface", "Unique Interaction", "User Integration"],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "What is the main difference between RGB and CMYK color modes?",
                    options: ["RGB is for print, CMYK is for digital", "They are the same", "RGB is for digital, CMYK is for print", "CMYK is for web only"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "What principle of design refers to the visual weight of elements?",
                    options: ["Contrast", "Balance", "Alignment", "Repetition"],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "Which file format is best for logos?",
                    options: ["JPG", "PNG", "SVG", "BMP"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "What does UX stand for?",
                    options: ["Ultimate Experience", "User Expertise", "User Experience", "Useful Experience"],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "Which font type does NOT have decorative ends (serifs)?",
                    options: ["Times New Roman", "Georgia", "Arial", "Garamond"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "What is the use of a grid in design?",
                    options: ["To decorate the design", "To align and organize elements", "To add patterns", "To test animations"],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Which design principle focuses on creating a focal point?",
                    options: ["Hierarchy", "Proximity", "Repetition", "Balance"],
                    answer: 0,
                    difficulty: "medium"
                },
                {
                    question: "Which tool is best known for designing user interfaces and prototypes?",
                    options: ["Lightroom", "XD", "Illustrator", "After Effects"],
                    answer: 1,
                    difficulty: "medium"
                },
                {
                    question: "What does DPI stand for in printing?",
                    options: ["Dots Per Inch", "Design Pixels Indicator", "Depth Precision Index", "Data Print Indicator"],
                    answer: 0,
                    difficulty: "hard"
                },
                {
                    question: "Which of the following is a raster graphics editor?",
                    options: ["Figma", "Illustrator", "Photoshop", "Sketch"],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "Which principle improves readability and scannability in text design?",
                    options: ["Alignment", "Contrast", "White Space", "Proximity"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which layout technique ensures that content looks good across all devices?",
                    options: ["Static Design", "Fixed Layout", "Responsive Design", "Flexible Grid"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "Which color is typically used to indicate an error in UX design?",
                    options: ["Green", "Blue", "Red", "Yellow"],
                    answer: 2,
                    difficulty: "easy"
                },
                {
                    question: "What does the golden ratio refer to in design?",
                    options: ["A perfect square", "A color palette", "A proportional relationship for aesthetic balance", "Font sizing technique"],
                    answer: 2,
                    difficulty: "hard"
                },
                {
                    question: "Which of these is a serif font?",
                    options: ["Verdana", "Arial", "Times New Roman", "Tahoma"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "In color theory, what are the three primary colors?",
                    options: ["Red, Green, Blue", "Red, Yellow, Blue", "Cyan, Magenta, Yellow", "Blue, Black, White"],
                    answer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Which Adobe software is mainly used for layout and publishing?",
                    options: ["Photoshop", "Illustrator", "InDesign", "After Effects"],
                    answer: 2,
                    difficulty: "medium"
                },
                {
                    question: "What is kerning in typography?",
                    options: ["Adjusting line spacing", "Adjusting space between letters", "Changing font size", "Choosing a font style"],
                    answer: 1,
                    difficulty: "medium"
                }
            ],

            flashcards: [
                { front: "What is the term for the space between lines of text?", back: "Leading", known: false },
                { front: "What color is formed when red and blue are mixed?", back: "Purple", known: false },
                { front: "Which design principle groups related items together?", back: "Proximity", known: false },
                { front: "Which design tool was originally created for Mac users and is popular for UI design?", back: "Sketch", known: false },
                { front: "What is a mood board used for in design?", back: "To visually communicate the look and feel of a project", known: false },
                { front: "What does a brand guideline typically include?", back: "Logo usage, typography, colors, and tone of voice", known: false },
                { front: "What is the main function of a wireframe?", back: "To plan the structure and layout of a design", known: false },
                { front: "Which type of logo consists of only text?", back: "Wordmark", known: false },
                { front: "What is a monochromatic color scheme?", back: "A palette using one base color and its tints, tones, and shades", known: false },
                { front: "What is Lorem Ipsum used for in design?", back: "Placeholder text to visualize content layout", known: false },
                { front: "What is negative space also known as?", back: "White space", known: false },
                { front: "Which format supports transparency: JPG or PNG?", back: "PNG", known: false },
                { front: "What is the purpose of contrast in design?", back: "To create visual interest and improve readability", known: false },
                { front: "What does the eyedropper tool do in most design software?", back: "Selects and samples colors from the design", known: false },
                { front: "What is the Z-pattern used for in layout design?", back: "To guide the eye across the page in a natural reading flow", known: false },
                { front: "What does the rule of thirds help with in design?", back: "Creating balanced and appealing compositions", known: false },
                { front: "What does CMYK stand for?", back: "Cyan, Magenta, Yellow, Black", known: false },
                { front: "What is a gradient in design?", back: "A gradual blend between two or more colors", known: false },
                { front: "What is a favicon?", back: "A small website icon shown in browser tabs", known: false },
                { front: "What is the purpose of design mockups?", back: "To present a realistic preview of a design project", known: false }
            ]
        },
    };

    // Initialize the app
    function init() {
        loadTopic(currentTopic);
        setupEventListeners();
        updateThemeIcon();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Theme toggle
        themeToggle.addEventListener('click', toggleDarkMode);

        // Mode selection
        quizModeBtn.addEventListener('click', () => switchMode('quiz'));
        flashcardModeBtn.addEventListener('click', () => switchMode('flashcard'));

        // Quiz controls
        nextQuestionBtn.addEventListener('click', nextQuestion);

        // Flashcard controls
        flashcard.addEventListener('click', flipCard);
        prevCardBtn.addEventListener('click', showPreviousCard);
        nextCardBtn.addEventListener('click', showNextCard);
        shuffleCardsBtn.addEventListener('click', shuffleCards);
        filterCardsBtn.addEventListener('click', togglePracticeFilter);

        // Results controls
        restartQuizBtn.addEventListener('click', restartQuiz);
        shareResultsBtn.addEventListener('click', shareResults);

        // Topic selection
        topicLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const topic = this.getAttribute('data-topic');
                currentTopic = topic;
                loadTopic(topic);
            });
        });
    }

    // Toggle dark/light mode
    function toggleDarkMode() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('darkMode', darkMode);
        updateThemeIcon();
    }

    // Update the theme toggle icon
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (darkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Switch between quiz and flashcard modes
    function switchMode(mode) {
        currentMode = mode;

        // Update UI
        quizModeBtn.classList.toggle('active', mode === 'quiz');
        flashcardModeBtn.classList.toggle('active', mode === 'flashcard');
        quizContainer.classList.toggle('active', mode === 'quiz');
        flashcardContainer.classList.toggle('active', mode === 'flashcard');
        resultsContainer.classList.remove('active');

        // Reset relevant states
        if (mode === 'quiz') {
            resetQuiz();
        } else {
            resetFlashcards();
        }
    }

    // Load topic data
    function loadTopic(topic) {
        quizData = sampleData[topic] || sampleData.coding;

        if (currentMode === 'quiz') {
            resetQuiz();
        } else {
            resetFlashcards();
        }
    }

    // Quiz Functions
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        clearInterval(timer);
        timeLeft = 60;
        updateTimerDisplay();
        showQuestion();
        resultsContainer.classList.remove('active');
        quizContainer.classList.add('active');
    }

    function showQuestion() {
        if (!quizData.quiz || currentQuestionIndex >= quizData.quiz.length) {
            showResults();
            return;
        }

        const question = quizData.quiz[currentQuestionIndex];
        document.getElementById('quiz-question').textContent = question.question;

        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        // Update progress
        const progress = ((currentQuestionIndex) / quizData.quiz.length) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        document.getElementById('question-count').textContent = `${currentQuestionIndex + 1}/${quizData.quiz.length}`;

        // Reset next button
        nextQuestionBtn.disabled = true;
        nextQuestionBtn.textContent = 'Next Question';

        // Start timer
        startTimer();
    }

    function startTimer() {
        clearInterval(timer);
        timeLeft = 60;
        updateTimerDisplay();

        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function selectOption(optionIndex) {
        // Deselect previous option if any
        if (selectedOption !== null) {
            document.querySelectorAll('.option')[selectedOption].classList.remove('selected');
        }

        // Select new option
        selectedOption = optionIndex;
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');
        nextQuestionBtn.disabled = false;
    }

    function nextQuestion() {
        clearInterval(timer);

        // Check if answer is correct if an option was selected
        if (selectedOption !== null) {
            const question = quizData.quiz[currentQuestionIndex];
            const options = document.querySelectorAll('.option');

            // Mark correct and incorrect answers
            options[question.answer].classList.add('correct');
            if (selectedOption !== question.answer) {
                options[selectedOption].classList.add('incorrect');
            } else {
                score++;
            }

            // Update next button text
            nextQuestionBtn.textContent = currentQuestionIndex < quizData.quiz.length - 1 ? 'Next Question' : 'See Results';
            nextQuestionBtn.disabled = false;

            // Prevent further selection
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });

            // Move to next question after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.quiz.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 1500);
        } else {
            // No option selected, just move to next question
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.quiz.length) {
                showQuestion();
            } else {
                showResults();
            }
        }
    }

    function showResults() {
        quizContainer.classList.remove('active');
        resultsContainer.classList.add('active');

        // Display score
        document.querySelector('.score').textContent = score;
        document.querySelector('.total').textContent = quizData.quiz.length;

        // Display correct and incorrect answers
        const correctList = document.getElementById('correct-answers');
        const incorrectList = document.getElementById('incorrect-answers');
        correctList.innerHTML = '';
        incorrectList.innerHTML = '';

        quizData.quiz.forEach((question, index) => {
            const li = document.createElement('li');
            li.textContent = question.question;

            if (index < currentQuestionIndex) {
                // This question was answered
                if (selectedOption === question.answer) {
                    correctList.appendChild(li);
                } else {
                    incorrectList.appendChild(li);
                }
            }
        });
    }

    function restartQuiz() {
        resetQuiz();
    }

    // Flashcard Functions
    function resetFlashcards() {
        flashcards = [...quizData.flashcards];
        currentCardIndex = 0;
        onlyPracticeCards = false;
        updateFilterButton();
        showCurrentCard();
    }

    function showCurrentCard() {
        const cardData = getCurrentCard();
        if (!cardData) return;

        const front = document.querySelector('.flashcard-front h3');
        const back = document.querySelector('.flashcard-back h3');

        front.textContent = cardData.front;
        back.textContent = cardData.back;

        // Reset card state
        flashcard.classList.remove('flipped');

        // Update card count
        document.getElementById('card-count').textContent = `${currentCardIndex + 1}/${filteredCards.length || flashcards.length}`;
    }

    function flipCard() {
        flashcard.classList.toggle('flipped');
    }

    function getCurrentCard() {
        if (onlyPracticeCards && filteredCards.length > 0) {
            return filteredCards[currentCardIndex];
        }
        return flashcards[currentCardIndex];
    }

    function showNextCard() {
        if (onlyPracticeCards) {
            if (currentCardIndex < filteredCards.length - 1) {
                currentCardIndex++;
            } else {
                currentCardIndex = 0;
            }
        } else {
            if (currentCardIndex < flashcards.length - 1) {
                currentCardIndex++;
            } else {
                currentCardIndex = 0;
            }
        }
        showCurrentCard();
    }

    function showPreviousCard() {
        if (onlyPracticeCards) {
            if (currentCardIndex > 0) {
                currentCardIndex--;
            } else {
                currentCardIndex = filteredCards.length - 1;
            }
        } else {
            if (currentCardIndex > 0) {
                currentCardIndex--;
            } else {
                currentCardIndex = flashcards.length - 1;
            }
        }
        showCurrentCard();
    }

    function shuffleCards() {
        if (onlyPracticeCards) {
            filteredCards = shuffleArray(filteredCards);
        } else {
            flashcards = shuffleArray(flashcards);
        }
        currentCardIndex = 0;
        showCurrentCard();
    }

    function togglePracticeFilter() {
        onlyPracticeCards = !onlyPracticeCards;
        updateFilterButton();

        if (onlyPracticeCards) {
            filteredCards = flashcards.filter(card => !card.known);
            if (filteredCards.length === 0) {
                alert("No cards need practice! All cards are marked as known.");
                onlyPracticeCards = false;
                updateFilterButton();
                return;
            }
        }

        currentCardIndex = 0;
        showCurrentCard();
    }

    function updateFilterButton() {
        if (onlyPracticeCards) {
            filterCardsBtn.innerHTML = '<i class="fas fa-filter"></i> Show All';
            filterCardsBtn.style.backgroundColor = '#ff9800';
        } else {
            filterCardsBtn.innerHTML = '<i class="fas fa-filter"></i> Filter';
            filterCardsBtn.style.backgroundColor = '';
        }
    }

    function markCardAsKnown() {
        const card = getCurrentCard();
        if (card) {
            card.known = true;
            if (onlyPracticeCards) {
                filteredCards.splice(currentCardIndex, 1);
                if (filteredCards.length === 0) {
                    onlyPracticeCards = false;
                    updateFilterButton();
                    currentCardIndex = 0;
                } else if (currentCardIndex >= filteredCards.length) {
                    currentCardIndex = 0;
                }
            }
            showCurrentCard();
        }
    }

    function markCardForPractice() {
        const card = getCurrentCard();
        if (card) {
            card.known = false;
            showCurrentCard();
        }
    }

    // Utility Functions
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function shareResults() {
        const text = `I scored ${score}/${quizData.quiz.length} on the ${currentTopic} quiz on Brainy!`;

        if (navigator.share) {
            navigator.share({
                title: 'Brainy Quiz Results',
                text: text,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(text);
            });
        } else {
            fallbackShare(text);
        }
    }

    function fallbackShare(text) {
        // Copy to clipboard as a fallback
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.log('Could not copy text: ', err);
            prompt('Copy these results:', text);
        });
    }

    // Initialize the app
    init();
});

// Show preloader
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.querySelector('.preloader');
  const loadingProgress = document.querySelector('.loading-progress');
  
  // Simulate loading progress (replace with real loading if needed)
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    loadingProgress.style.width = `${Math.min(progress, 100)}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      // Add slight delay before hiding
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
          preloader.remove();
          // Initialize your app here
          init(); // Your existing app initialization
        }, 500);
      }, 300);
    }
  }, 200);
  
  // If you have actual assets to load, use this instead:
  /*
  window.addEventListener('load', function() {
    loadingProgress.style.width = '100%';
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
        init();
      }, 500);
    }, 300);
  });
  */
});