import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { AuthModal } from "./components/AuthModal";
import { QuizCreation } from "./components/QuizCreation";
import { QuizListing } from "./components/QuizListing";
import { QuizTaking } from "./components/QuizTaking";
import { QuizResults } from "./components/QuizResults";
import { Toaster } from "./components/ui/sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
  createdAt: string;
  language?: 'english' | 'telugu';
  category?: string;
}

interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    correctAnswer: number;
  }>;
  timeSpent: number;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(
    null,
  );
  const [quizResult, setQuizResult] =
    useState<QuizResult | null>(null);

  // Initialize with sample quizzes
  useEffect(() => {
    const sampleQuizzes: Quiz[] = [
      // English Language Quizzes
      {
        id: "english-1",
        title: "🌍 World Geography & General Knowledge",
        description: "Test your knowledge about world geography, countries, capitals, and general facts in English!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'english' as const,
        category: 'Geography & General Knowledge',
        questions: [
          {
            id: "q1",
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            question: "Which is the longest river in the world?",
            options: ["Amazon", "Nile", "Ganges", "Mississippi"],
            correctAnswer: 1,
          },
          {
            id: "q3",
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 2,
          },
          {
            id: "q4",
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "N2"],
            correctAnswer: 0,
          },
          {
            id: "q5",
            question: "Who invented the telephone?",
            options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
            correctAnswer: 1,
          },
          {
            id: "q6",
            question: "Which country has the highest population in the world?",
            options: ["India", "China", "USA", "Russia"],
            correctAnswer: 1,
          },
          {
            id: "q7",
            question: "What is the largest ocean in the world?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correctAnswer: 3,
          },
          {
            id: "q8",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
          },
          {
            id: "q9",
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2,
          },
          {
            id: "q10",
            question: "How long does it take for light to reach Earth from the Sun?",
            options: ["8 minutes", "8 hours", "8 days", "8 weeks"],
            correctAnswer: 0,
          }
        ],
      },
      {
        id: "english-2",
        title: "🎬 Movies & Entertainment",
        description: "Test your knowledge about movies, music, entertainment industry, and popular culture!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'english' as const,
        category: 'Entertainment & Movies',
        questions: [
          {
            id: "q1",
            question: "Who is known as the 'King of Bollywood'?",
            options: ["Aamir Khan", "Shah Rukh Khan", "Salman Khan", "Hrithik Roshan"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            question: "Which instrument has 88 keys?",
            options: ["Guitar", "Violin", "Piano", "Organ"],
            correctAnswer: 2,
          },
          {
            id: "q3",
            question: "What does 'Oscar' refer to in movies?",
            options: ["Movie theater", "Academy Award", "Movie genre", "Film camera"],
            correctAnswer: 1,
          },
          {
            id: "q4",
            question: "Which streaming platform is known for original series?",
            options: ["YouTube", "Netflix", "Facebook", "Instagram"],
            correctAnswer: 1,
          },
          {
            id: "q5",
            question: "What is the highest-grossing movie of all time?",
            options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"],
            correctAnswer: 1,
          },
          {
            id: "q6",
            question: "Who painted the famous 'Starry Night'?",
            options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
            correctAnswer: 1,
          },
          {
            id: "q7",
            question: "Which dance style originated in Argentina?",
            options: ["Salsa", "Flamenco", "Tango", "Samba"],
            correctAnswer: 2,
          },
          {
            id: "q8",
            question: "What does 'K-pop' stand for?",
            options: ["Korean pop", "King pop", "Karaoke pop", "Keyboard pop"],
            correctAnswer: 0,
          },
          {
            id: "q9",
            question: "Which country is famous for anime?",
            options: ["China", "South Korea", "Japan", "Thailand"],
            correctAnswer: 2,
          },
          {
            id: "q10",
            question: "Who composed 'The Four Seasons'?",
            options: ["Mozart", "Bach", "Vivaldi", "Beethoven"],
            correctAnswer: 2,
          }
        ],
      },
      {
        id: "english-3",
        title: "🧬 Science & Technology",
        description: "Explore the fascinating world of science, technology, inventions, and modern innovations!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'english' as const,
        category: 'Science & Technology',
        questions: [
          {
            id: "q1",
            question: "What does 'AI' stand for?",
            options: ["Automatic Intelligence", "Artificial Intelligence", "Advanced Interface", "Applied Information"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            question: "Which company created the iPhone?",
            options: ["Samsung", "Google", "Apple", "Microsoft"],
            correctAnswer: 2,
          },
          {
            id: "q3",
            question: "What does 'WWW' stand for?",
            options: ["World Wide Web", "World Wide Website", "World Web Works", "Wide World Web"],
            correctAnswer: 0,
          },
          {
            id: "q4",
            question: "Which social media platform has a bird as its logo?",
            options: ["Facebook", "Instagram", "Twitter/X", "TikTok"],
            correctAnswer: 2,
          },
          {
            id: "q5",
            question: "What is the most popular programming language for web development?",
            options: ["Python", "Java", "JavaScript", "C++"],
            correctAnswer: 2,
          },
          {
            id: "q6",
            question: "How many hearts does an octopus have?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2,
          },
          {
            id: "q7",
            question: "Which animal is known as the 'King of the Jungle'?",
            options: ["Tiger", "Lion", "Elephant", "Leopard"],
            correctAnswer: 1,
          },
          {
            id: "q8",
            question: "What is the fastest land animal?",
            options: ["Lion", "Cheetah", "Horse", "Deer"],
            correctAnswer: 1,
          },
          {
            id: "q9",
            question: "Which bird cannot fly but can run very fast?",
            options: ["Penguin", "Ostrich", "Chicken", "Peacock"],
            correctAnswer: 1,
          },
          {
            id: "q10",
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
            correctAnswer: 1,
          }
        ],
      },
      // Telugu Language Quizzes
      {
        id: "telugu-1",
        title: "🏛️ తెలుగు సాధారణ జ్ఞానం",
        description: "తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు భారతదేశం గురించి మీ జ్ఞానాన్ని పరీక్షించుకోండి!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'telugu' as const,
        category: 'సాధారణ జ్ఞానం',
        questions: [
          {
            id: "q1",
            question: "తెలంగాణ రాష్ట్ర రాజధాని ఎక్కడ?",
            options: ["హైదరాబాద్", "వరంగల్", "కరీంనగర్", "నిజామాబాద్"],
            correctAnswer: 0,
          },
          {
            id: "q2",
            question: "ప్రపంచంలో అత్యధిక జనాభా ఉన్న దేశం?",
            options: ["భారతదేశం", "చైనా", "అమెరికా", "రష్యా"],
            correctAnswer: 1,
          },
          {
            id: "q3",
            question: "సూర్యుడి నుండి భూమికి కాంతి చేరుకోవడానికి ఎంత సమయం పడుతుంది?",
            options: ["8 నిమిషాలు", "8 గంటలు", "8 రోజులు", "8 వారాలు"],
            correctAnswer: 0,
          },
          {
            id: "q4",
            question: "భారతదేశపు జాతీయ పక్షి?",
            options: ["గద్ద", "నెమలి", "కోకిల", "గువ్వ"],
            correctAnswer: 1,
          },
          {
            id: "q5",
            question: "తెలుగు భాష ఎంత మంది మాట్లాడుతారు?",
            options: ["5 కోట్లు", "8 కోట్లు", "10 కోట్లు", "12 కోట్లు"],
            correctAnswer: 1,
          },
          {
            id: "q6",
            question: "భారతదేశపు జాతీయ జంతువు ఏది?",
            options: ["సింహం", "పులి", "ఏనుగు", "చిరుత"],
            correctAnswer: 1,
          },
          {
            id: "q7",
            question: "నీటిలో బతికే అతిపెద్ద జంతువు ఏది?",
            options: ["షార్క్", "తిమింగలం", "డాల్ఫిన్", "కత్తి చేప"],
            correctAnswer: 1,
          },
          {
            id: "q8",
            question: "మనిషికి ఎన్ని దంతాలు ఉంటాయి?",
            options: ["28", "30", "32", "34"],
            correctAnswer: 2,
          },
          {
            id: "q9",
            question: "భూమి చుట్టూ తిరిగేదేమిటి?",
            options: ["సూర్యుడు", "చంద్రుడు", "మంగళ గ్రహం", "శుక్ర గ్రహం"],
            correctAnswer: 1,
          },
          {
            id: "q10",
            question: "మనిషి శరీరంలో అతిపెద్ద అవయవం ఏది?",
            options: ["గుండె", "కాలేయం", "చర్మం", "ఊపిరితిత్తులు"],
            correctAnswer: 2,
          }
        ],
      },
      {
        id: "telugu-2",
        title: "🍛 తెలుగు వంటకాలు మరియు సంస్కృతి",
        description: "తెలుగు వంటకాలు, పండుగలు మరియు సంస్కృతి గురించి మీ జ్ఞానాన్ని పరీక్షించుకోండి!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'telugu' as const,
        category: 'వంటకాలు మరియు సంస్కృతి',
        questions: [
          {
            id: "q1",
            question: "హైదరాబాదీ బిర్యానీలో ప్రధాన మసాలా ఏది?",
            options: ["కాలిమిర్చి", "జీలకర్ర", "కేసరి", "ఏలకులు"],
            correctAnswer: 2,
          },
          {
            id: "q2",
            question: "పెసరట్టు దేనితో తయారు చేస్తారు?",
            options: ["అరిసి", "పెసలు", "వేప", "రవ్వ"],
            correctAnswer: 1,
          },
          {
            id: "q3",
            question: "గోంగూర అనేది ఏ రకం ఆకు?",
            options: ["పుదీనా", "కొత్తిమీర", "రోసెల్లె", "కరివేపాకు"],
            correctAnswer: 2,
          },
          {
            id: "q4",
            question: "తెలుగు సినిమా పరిశ్రమను ఏ పేరుతో పిలుస్తారు?",
            options: ["బాలీవుడ్", "కొల్లీవుడ్", "టాలీవుడ్", "సాండల్‌వుడ్"],
            correctAnswer: 2,
          },
          {
            id: "q5",
            question: "కలమ్కారీ కళ ఎక్కడికి ప్రసిద్ధం?",
            options: ["శ్రీకాళహస్తి", "మచిలీపట్నం", "రెండూ", "ఏదీ కాదు"],
            correctAnswer: 2,
          },
          {
            id: "q6",
            question: "తెలుగు న్యూ ఇయర్ పేరు ఏమిటి?",
            options: ["ఉగాది", "దీపావళి", "హోలీ", "సంక్రాంతి"],
            correctAnswer: 0,
          },
          {
            id: "q7",
            question: "తెలుగు ప్రజల ప్రధాన ఆహారం ఏది?",
            options: ["గోధుమలు", "అన్నం", "మొక్కజొన్న", "రాగులు"],
            correctAnswer: 1,
          },
          {
            id: "q8",
            question: "ఆంధ్రప్రదేశ్ నుండి వచ్చిన ప్రసిద్ధ మిఠాయి ఏది?",
            options: ["లడ్డు", "పూతరేకులు", "మైసూర్ పాక్", "జలేబీ"],
            correctAnswer: 1,
          },
          {
            id: "q9",
            question: "ఆంధ్రప్రదేశ్ నుండి ఉద్భవించిన శాస్త్రీయ నృత్యం ఏది?",
            options: ["భరతనాట్యం", "కుచిపూడి", "కథక్", "ఒడిస్సీ"],
            correctAnswer: 1,
          },
          {
            id: "q10",
            question: "తిరుపతిలో ఉన్న ప్రసిద్ధ ఆలయం ఏది?",
            options: ["వెంకటేశ్వర స్వామి ఆలయం", "మల్లికార్జున ఆలయం", "శ్రీకాళహస్తి ఆలయం", "భద్రాచలం ఆలయం"],
            correctAnswer: 0,
          }
        ],
      },
      {
        id: "telugu-3",
        title: "🎬 తెలుగు సినిమా మరియు వినోదం",
        description: "తెలుగు సినిమా, నటులు మరియు వినోద పరిశ్రమ గురించి మీ జ్ఞానాన్ని పరీక్షించుకోండి!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'telugu' as const,
        category: 'సినిమా మరియు వినోదం',
        questions: [
          {
            id: "q1",
            question: "మొదటి తెలుగు చలనచిత్రం ఏది?",
            options: ["భక్త ప్రహ్లాద", "లవకుశ", "శ్రీ కృష్ణ తులాభారం", "మల్లీశ్వరి"],
            correctAnswer: 0,
          },
          {
            id: "q2",
            question: "ఎన్టీఆర్ జూనియర్ అసలు పేరు ఏమిటి?",
            options: ["తారక రామారావు", "కళ్యాణ్ రామ్", "నందమూరి తారక రామారావు", "జూనియర్ ఎన్టీఆర్"],
            correctAnswer: 2,
          },
          {
            id: "q3",
            question: "బాహుబలి సినిమాకు దర్శకుడు ఎవరు?",
            options: ["రాజమౌళి", "త్రివిక్రమ్", "గుణశేఖర్", "కోరటాల శివ"],
            correctAnswer: 0,
          },
          {
            id: "q4",
            question: "ఆర్ఆర్ఆర్ సినిమాలో రామ్ పాత్రధారి ఎవరు?",
            options: ["రామ్ చరణ్", "ఎన్టీఆర్", "అల్లు అర్జున్", "మహేశ్ బాబు"],
            correctAnswer: 0,
          },
          {
            id: "q5",
            question: "తెలుగు సినిమాల్లో 'మెగాస్టార్' అని ఎవరిని పిలుస్తారు?",
            options: ["చిరంజీవి", "బాలకృష్ణ", "వెంకటేష్", "నాగార్జున"],
            correctAnswer: 0,
          },
          {
            id: "q6",
            question: "తెలుగు సినిమా పరిశ్రమ ఎక్కడ ఉంది?",
            options: ["చెన్నై", "హైదరాబాద్", "బెంగళూరు", "ముంబై"],
            correctAnswer: 1,
          },
          {
            id: "q7",
            question: "'నేను లోకల్' అని ఏ సినిమాలో పాట ఉంది?",
            options: ["జనతా గేరేజ్", "టెంపర్", "రేస్ గుర్రం", "అత్తారింటికి దారేది"],
            correctAnswer: 0,
          },
          {
            id: "q8",
            question: "తెలుగు సినిమాల్లో 'రెబల్ స్టార్' అని ఎవరిని పిలుస్తారు?",
            options: ["ప్రభాస్", "అల్లు అర్జున్", "రామ్ చరణ్", "విజయ్ దేవరకొండ"],
            correctAnswer: 0,
          },
          {
            id: "q9",
            question: "'పువ్వు లేని పలుల లేనిది' అని ఏ సినిమాలో పాట ఉంది?",
            options: ["శంకరాభరణం", "సాగర సంగమం", "స్వాతి మొనగా", "గీతాంజలి"],
            correctAnswer: 0,
          },
          {
            id: "q10",
            question: "తెలుగు సినిమాల్లో 'సూపర్ స్టార్' అని ఎవరిని పిలుస్తారు?",
            options: ["కృష్ణ", "సోబన్ బాబు", "అక్కినేని నాగేశ్వర రావు", "కృష్ణం రాజు"],
            correctAnswer: 0,
          }
        ],
      },
      {
        id: "telugu-4",
        title: "💻 తెలుగు టెక్నాలజీ మరియు ఆధునిక జీవితం",
        description: "ఆధునిక టెక్నాలజీ మరియు డిజిటల్ లైఫ్ గురించి తెలుగులో తెలుసుకోండి!",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        language: 'telugu' as const,
        category: 'టెక్నాలజీ మరియు ఆధునిక జీవితం',
        questions: [
          {
            id: "q1",
            question: "ఇంటర్నెట్ యొక్క పూర్తి పేరు ఏమిటి?",
            options: ["ఇంటర్నేషనల్ నెట్‌వర్క్", "ఇంటర్‌కనెక్టెడ్ నెట్‌వర్క్", "ఇంటర్నల్ నెట్‌వర్క్", "ఇన్‌ఫర్మేషన్ నెట్‌వర్క్"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            question: "WhatsApp ను ఎవరు కనిపెట్టారు?",
            options: ["మార్క్ జకర్‌బర్గ్", "బ్రియాన్ ఆక్టన్ & జాన్ కౌమ్", "బిల్ గేట్స్", "లారీ పేజ్"],
            correctAnswer: 1,
          },
          {
            id: "q3",
            question: "యూట్యూబ్ ఎప్పుడు ప్రారంభమైంది?",
            options: ["2004", "2005", "2006", "2007"],
            correctAnswer: 1,
          },
          {
            id: "q4",
            question: "Google యొక్క CEO ఎవరు?",
            options: ["సుందర్ పిచై", "సత్య నాదెళ్ళ", "ఎలాన్ మస్క్", "జెఫ్ బెజోస్"],
            correctAnswer: 0,
          },
          {
            id: "q5",
            question: "జియో సిమ్ కార్డులు ఎవరు తీసుకొచ్చారు?",
            options: ["రతన్ టాటా", "ముకేష్ అంబానీ", "అనిల్ అంబానీ", "అజీమ్ ప్రేమ్‌జీ"],
            correctAnswer: 1,
          },
          {
            id: "q6",
            question: "మొబైల్ ఫోన్‌లో వేలిముద్ర సెన్సార్ ఎందుకు ఉపయోగిస్తారు?",
            options: ["ఆట ఆడడానికి", "భద్రత కోసం", "ఫోటో తీయడానికి", "చార్జ్ చేయడానికి"],
            correctAnswer: 1,
          },
          {
            id: "q7",
            question: "QR కోడ్ అంటే ఏమిటి?",
            options: ["క్వాలిటీ రేట్", "క్వైక్ రెస్పాన్స్", "క్వీన్ రూల్", "క్వైట్ రన్"],
            correctAnswer: 1,
          },
          {
            id: "q8",
            question: "UPI అంటే ఏమిటి?",
            options: ["యూనిఫైడ్ పేమెంట్ ఇంటర్‌ఫేస్", "అల్ట్రా పర్సనల్ ఐడెంటిటీ", "యూనివర్సల్ పబ్లిక్ ఇన్ఫర్మేషన్", "అప్‌డేట్ పర్సనల్ ఇన్ఫర్మేషన్"],
            correctAnswer: 0,
          },
          {
            id: "q9",
            question: "Wi-Fi యొక్క పూర్తి పేరు ఏమిటి?",
            options: ["వైర్‌లెస్ ఫిడేలిటీ", "వైడ్ ఫైల్", "విన్ ఫాస్ట్", "వైర్ ఫ్రీ"],
            correctAnswer: 0,
          },
          {
            id: "q10",
            question: "భారతదేశంలో అత్యధికంగా ఉపయోగించే సోషల్ మీడియా యాప్ ఏది?",
            options: ["ఫేస్‌బుక్", "ఇన్‌స్టాగ్రామ్", "WhatsApp", "ట్విట్టర్"],
            correctAnswer: 2,
          }
        ],
      }
    ];
    setQuizzes(sampleQuizzes);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleNavigate = (page: string) => {
    if (page.startsWith("take-")) {
      const quizId = page.replace("take-", "");
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        setCurrentQuiz(quiz);
        setCurrentPage("taking");
      }
    } else {
      setCurrentPage(page);
      setCurrentQuiz(null);
      setQuizResult(null);
    }
  };

  const handleSaveQuiz = (quizData: {
    title: string;
    description: string;
    questions: Question[];
    createdBy: string;
  }) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      ...quizData,
      createdAt: new Date().toISOString(),
    };
    setQuizzes([newQuiz, ...quizzes]);
  };

  const handleTakeQuiz = (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentPage("taking");
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentPage("results");
  };

  const handleRetakeQuiz = (quizId: string) => {
    handleTakeQuiz(quizId);
  };

  const requireAuth = (callback: () => void) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    callback();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onShowAuth={() => setShowAuthModal(true)}
            quizzes={quizzes}
          />
        );

      case "create":
        if (!currentUser) {
          setShowAuthModal(true);
          return (
            <HomePage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onShowAuth={() => setShowAuthModal(true)}
              quizzes={quizzes}
            />
          );
        }
        return (
          <QuizCreation
            onNavigate={handleNavigate}
            onSaveQuiz={handleSaveQuiz}
            currentUser={currentUser}
          />
        );

      case "browse":
        if (!currentUser) {
          setShowAuthModal(true);
          return (
            <HomePage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onShowAuth={() => setShowAuthModal(true)}
              quizzes={quizzes}
            />
          );
        }
        return (
          <QuizListing
            quizzes={quizzes}
            onNavigate={handleNavigate}
            onTakeQuiz={handleTakeQuiz}
            currentUser={currentUser}
          />
        );

      case "taking":
        if (!currentUser || !currentQuiz) {
          setCurrentPage("home");
          return (
            <HomePage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onShowAuth={() => setShowAuthModal(true)}
              quizzes={quizzes}
            />
          );
        }
        return (
          <QuizTaking
            quiz={currentQuiz}
            onNavigate={handleNavigate}
            onComplete={handleQuizComplete}
          />
        );

      case "results":
        if (!currentUser || !currentQuiz || !quizResult) {
          setCurrentPage("home");
          return (
            <HomePage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onShowAuth={() => setShowAuthModal(true)}
              quizzes={quizzes}
            />
          );
        }
        return (
          <QuizResults
            quiz={currentQuiz}
            result={quizResult}
            onNavigate={handleNavigate}
            onRetakeQuiz={handleRetakeQuiz}
          />
        );

      default:
        return (
          <HomePage
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onShowAuth={() => setShowAuthModal(true)}
            quizzes={quizzes}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === "create" || page === "browse") {
            requireAuth(() => handleNavigate(page));
          } else {
            handleNavigate(page);
          }
        }}
        onLogout={handleLogout}
        onShowAuth={() => setShowAuthModal(true)}
      />

      {renderCurrentPage()}

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <Toaster position="top-right" />
    </div>
  );
}