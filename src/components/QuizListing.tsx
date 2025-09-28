import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Search, Play, User, Calendar } from "lucide-react@0.487.0";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Array<{ id: string; question: string; options: string[]; correctAnswer: number }>;
  createdBy: string;
  createdAt?: string;
}

interface QuizListingProps {
  quizzes: Quiz[];
  onNavigate: (page: string) => void;
  onTakeQuiz: (quizId: string) => void;
  currentUser: { id: string; name: string; email: string };
}

export function QuizListing({ quizzes, onNavigate, onTakeQuiz, currentUser }: QuizListingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'english' | 'telugu'>('all');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || quiz.createdBy === currentUser.id;
    
    const matchesLanguage = languageFilter === 'all' || quiz.language === languageFilter;
    
    return matchesSearch && matchesFilter && matchesLanguage;
  });

  // Group quizzes by language for better organization
  const englishQuizzes = filteredQuizzes.filter(quiz => quiz.language === 'english');
  const teluguQuizzes = filteredQuizzes.filter(quiz => quiz.language === 'telugu');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')} 
            className="mr-4 bg-white/20 hover:bg-white/30 text-white font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            🔙 Back
          </Button>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">🔍 Browse Amazing Quizzes 📚</h1>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 glass-effect">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
            <Input
              placeholder="🔍 Search for amazing quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/90 border-white/30 placeholder:text-gray-500 font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold shadow-lg' 
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
              }
            >
              🌟 All Quizzes
            </Button>
            <Button
              variant={filter === 'mine' ? 'default' : 'outline'}
              onClick={() => setFilter('mine')}
              className={filter === 'mine' 
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg' 
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
              }
            >
              👤 My Quizzes
            </Button>
            
            {/* Language Filter Buttons */}
            <div className="flex space-x-2 ml-4">
              <Button
                variant={languageFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setLanguageFilter('all')}
                className={languageFilter === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
                }
              >
                🌐 All Languages
              </Button>
              <Button
                variant={languageFilter === 'english' ? 'default' : 'outline'}
                onClick={() => setLanguageFilter('english')}
                className={languageFilter === 'english' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
                }
              >
                🇬🇧 English
              </Button>
              <Button
                variant={languageFilter === 'telugu' ? 'default' : 'outline'}
                onClick={() => setLanguageFilter('telugu')}
                className={languageFilter === 'telugu' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium'
                }
              >
                🇮🇳 తెలుగు
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Count */}
        <div className="mb-6">
          <p className="text-white font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm inline-block">
            {filteredQuizzes.length === 0 
              ? '❌ No quizzes found' 
              : `🎯 ${filteredQuizzes.length} amazing quiz${filteredQuizzes.length !== 1 ? 'es' : ''} found!`
            }
          </p>
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-2xl glass-effect">
            <div className="text-white/60 mb-4">
              <Search className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">🔍 No quizzes found</h3>
            <p className="text-white/80 mb-6 text-lg">
              {searchTerm 
                ? '🔧 Try adjusting your search terms or filters'
                : filter === 'mine' 
                  ? "🎨 You haven't created any quizzes yet"
                  : '📚 No quizzes available'
              }
            </p>
            {filter === 'mine' && (
              <Button 
                onClick={() => onNavigate('create')}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                ✨ Create Your First Quiz ✨
              </Button>
            )}
          </div>
        )}

        {/* Language-Organized Quiz Sections */}
        {languageFilter === 'all' && (
          <div className="space-y-12">
            {/* English Quizzes Section */}
            {englishQuizzes.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-500 to-indigo-600 py-4 rounded-2xl backdrop-blur-lg">
                  🇬🇧 English Quizzes 📚
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {englishQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} currentUser={currentUser} onTakeQuiz={onTakeQuiz} language="english" />
                  ))}
                </div>
              </div>
            )}

            {/* Telugu Quizzes Section */}
            {teluguQuizzes.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 py-4 rounded-2xl backdrop-blur-lg">
                  🇮🇳 తెలుగు క్విజ్‌లు 📖
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teluguQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} currentUser={currentUser} onTakeQuiz={onTakeQuiz} language="telugu" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Single Language View */}
        {languageFilter !== 'all' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center bg-white/10 backdrop-blur-lg py-4 rounded-2xl">
              {languageFilter === 'english' ? '🇬🇧 English Quizzes 📚' : '🇮🇳 తెలుగు క్విజ్‌లు 📖'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} currentUser={currentUser} onTakeQuiz={onTakeQuiz} language={quiz.language} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Action */}
        {filteredQuizzes.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 border-2 border-yellow-400 shadow-2xl backdrop-blur-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-3">🎨 Ready to create your own amazing quiz? ✨</h3>
              <p className="text-purple-800 mb-6 text-lg">
                🌟 Share your knowledge with the community by creating engaging quizzes in English & Telugu! 📚
              </p>
              <Button 
                onClick={() => onNavigate('create')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                ➕ Create New Quiz 🚀
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// QuizCard Component
interface QuizCardProps {
  quiz: any;
  currentUser: { id: string; name: string; email: string };
  onTakeQuiz: (quizId: string) => void;
  language?: string;
}

function QuizCard({ quiz, currentUser, onTakeQuiz, language }: QuizCardProps) {
  const getLanguageGradient = (lang?: string) => {
    if (lang === 'english') return 'from-blue-500 to-indigo-600';
    if (lang === 'telugu') return 'from-orange-500 to-red-500';
    return 'from-purple-500 to-pink-500';
  };

  const getLanguageBadge = (lang?: string) => {
    if (lang === 'english') return '🇬🇧 EN';
    if (lang === 'telugu') return '🇮🇳 తె';
    return '🌐';
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/95 backdrop-blur-lg border-white/20 shadow-xl">
      <CardHeader className={`bg-gradient-to-r ${getLanguageGradient(language)} text-white rounded-t-lg`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 mb-2 text-white drop-shadow-lg">{quiz.title}</CardTitle>
            <CardDescription className="line-clamp-3 text-white/90">
              {quiz.description}
            </CardDescription>
          </div>
          <div className="flex flex-col space-y-2 ml-2">
            {quiz.createdBy === currentUser.id && (
              <Badge className="bg-yellow-400 text-purple-900 font-bold">
                👤 Mine
              </Badge>
            )}
            <Badge className="bg-white/20 text-white font-bold">
              {getLanguageBadge(language)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <Play className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">📝 {quiz.questions.length} questions</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <User className="w-4 h-4 text-green-600" />
              <span className="text-green-800">
                {quiz.createdBy === currentUser.id ? '👨‍💻 You' : '👤 Community'}
              </span>
            </div>
          </div>
          
          {quiz.category && (
            <div className="flex items-center space-x-2 text-sm bg-indigo-50 px-3 py-1 rounded-full">
              <span className="text-indigo-800 font-medium">🏷️ {quiz.category}</span>
            </div>
          )}
          
          {quiz.createdAt && (
            <div className="flex items-center space-x-2 text-sm bg-purple-50 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-purple-800 font-medium">📅 {new Date(quiz.createdAt).toLocaleDateString()}</span>
            </div>
          )}

          <Button 
            className={`w-full bg-gradient-to-r ${getLanguageGradient(language)} hover:opacity-90 text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
            onClick={() => onTakeQuiz(quiz.id)}
          >
            <Play className="w-4 h-4 mr-2" />
            🚀 Start Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}