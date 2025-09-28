import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, BookOpen, Trophy, Users } from "lucide-react@0.487.0";

interface HomePageProps {
  currentUser: { id: string; name: string; email: string } | null;
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  quizzes: Array<{ id: string; title: string; description: string; questions: any[]; createdBy: string; }>;
}

export function HomePage({ currentUser, onNavigate, onShowAuth, quizzes }: HomePageProps) {
  const userQuizzes = currentUser ? quizzes.filter(q => q.createdBy === currentUser.id) : [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            🎯 Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
              QuizMaster
            </span>
            {" "}🌟
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 backdrop-blur-sm bg-white/10 p-4 rounded-2xl">
            🚀 Create engaging quizzes, challenge your knowledge, and learn with our interactive quiz platform.
            Perfect for educators, trainers, and curious minds! 🧠✨
          </p>
          
          {!currentUser ? (
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={onShowAuth} 
                className="px-12 py-4 text-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-full"
              >
                🎉 Get Started - It's Free! 🎉
              </Button>
              <p className="text-sm text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">✨ Join thousands of quiz creators and learners ✨</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate('create')} 
                className="px-8 py-4 text-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                ➕ Create New Quiz
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onNavigate('browse')} 
                className="px-8 py-4 text-lg bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm font-bold shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                📚 Browse Quizzes
              </Button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <Plus className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-bounce" />
              <CardTitle className="text-white text-xl">✨ Create Quizzes</CardTitle>
              <CardDescription className="text-white/80">
                🎨 Build engaging multiple-choice quizzes with our intuitive quiz creator
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <Trophy className="w-16 h-16 text-green-300 mx-auto mb-4 animate-bounce" />
              <CardTitle className="text-white text-xl">⚡ Instant Results</CardTitle>
              <CardDescription className="text-white/80">
                🎯 Get immediate feedback and see detailed results after completing quizzes
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <Users className="w-16 h-16 text-pink-300 mx-auto mb-4 animate-bounce" />
              <CardTitle className="text-white text-xl">🤝 Share & Collaborate</CardTitle>
              <CardDescription className="text-white/80">
                📤 Share your quizzes with others and discover amazing content from the community
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* User Dashboard */}
        {currentUser && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">📊 Your Stats</CardTitle>
                <CardDescription className="text-white/80">Your quiz creation and participation overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-white">{userQuizzes.length}</div>
                    <div className="text-sm text-white/90 font-medium">🎯 Quizzes Created</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-white">{quizzes.length}</div>
                    <div className="text-sm text-white/90 font-medium">🌟 Total Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into creating or taking quizzes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onNavigate('create')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Quiz
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onNavigate('browse')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Quizzes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Language-Organized Quiz Sections */}
        {quizzes.length > 0 && (
          <div className="mt-12 space-y-12">
            {/* English Quizzes Section */}
            {quizzes.filter(quiz => quiz.language === 'english').length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-2xl">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">🇬🇧 Featured English Quizzes 📚</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('browse')}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium"
                  >
                    🔍 View All English
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {quizzes.filter(quiz => quiz.language === 'english').slice(0, 3).map((quiz) => (
                    <HomeQuizCard 
                      key={quiz.id} 
                      quiz={quiz} 
                      currentUser={currentUser} 
                      onNavigate={onNavigate} 
                      language="english"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Telugu Quizzes Section */}
            {quizzes.filter(quiz => quiz.language === 'telugu').length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl shadow-2xl">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">🇮🇳 ప్రత్యేక తెలుగు క్విజ్‌లు 📖</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('browse')}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium"
                  >
                    🔍 అన్నీ చూడండి
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {quizzes.filter(quiz => quiz.language === 'telugu').slice(0, 3).map((quiz) => (
                    <HomeQuizCard 
                      key={quiz.id} 
                      quiz={quiz} 
                      currentUser={currentUser} 
                      onNavigate={onNavigate} 
                      language="telugu"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// HomeQuizCard Component
interface HomeQuizCardProps {
  quiz: any;
  currentUser: { id: string; name: string; email: string } | null;
  onNavigate: (page: string) => void;
  language?: string;
}

function HomeQuizCard({ quiz, currentUser, onNavigate, language }: HomeQuizCardProps) {
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
          <Badge className="ml-2 bg-white/20 text-white font-bold">
            {getLanguageBadge(language)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-800">📝 {quiz.questions.length} questions</span>
            </div>
            {quiz.category && (
              <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
                <span className="text-indigo-800 font-medium">🏷️ {quiz.category}</span>
              </div>
            )}
          </div>
          
          <Button 
            className={`w-full bg-gradient-to-r ${getLanguageGradient(language)} hover:opacity-90 text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
            onClick={() => onNavigate(`take-${quiz.id}`)}
            disabled={!currentUser}
          >
            {currentUser ? '🚀 Start Quiz' : '🔐 Sign in to play'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}