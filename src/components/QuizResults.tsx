import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Clock, Target, Home, RotateCcw, Share2, CheckCircle, XCircle } from "lucide-react@0.487.0";
import { toast } from "sonner@2.0.3";

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

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  createdBy: string;
}

interface QuizResultsProps {
  quiz: Quiz;
  result: QuizResult;
  onNavigate: (page: string) => void;
  onRetakeQuiz: (quizId: string) => void;
}

export function QuizResults({ quiz, result, onNavigate, onRetakeQuiz }: QuizResultsProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return { text: 'Excellent!', variant: 'default' as const, color: 'bg-green-600' };
    if (percentage >= 80) return { text: 'Great Job!', variant: 'secondary' as const, color: 'bg-blue-600' };
    if (percentage >= 70) return { text: 'Good Work', variant: 'secondary' as const, color: 'bg-yellow-600' };
    if (percentage >= 60) return { text: 'Not Bad', variant: 'outline' as const, color: 'bg-orange-600' };
    return { text: 'Keep Trying', variant: 'outline' as const, color: 'bg-red-600' };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleShare = async () => {
    const shareText = `I just scored ${result.score}/${result.totalQuestions} (${percentage}%) on "${quiz.title}" quiz! 🎯`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Results',
          text: shareText,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Results copied to clipboard!');
    }
  };

  const scoreBadge = getScoreBadge(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full ${scoreBadge.color} flex items-center justify-center shadow-2xl animate-bounce`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">🎉 Quiz Complete! 🎉</h1>
          <p className="text-white/90 text-lg">{quiz.title}</p>
        </div>

        {/* Score Overview */}
        <Card className="mb-6 bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-5xl font-bold mb-2">
              {result.score}/{result.totalQuestions}
            </CardTitle>
            <div className="flex justify-center mb-4">
              <Badge className={`${scoreBadge.color} text-white text-lg px-4 py-2 shadow-lg`}>
                {scoreBadge.text}
              </Badge>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-white/20 rounded-full p-1 backdrop-blur-lg">
                <Progress value={percentage} className="h-4 bg-white/30" />
              </div>
              <p className="text-3xl font-bold text-white mt-2">{percentage}% Correct</p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <Target className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">✅ {result.score}</div>
                  <div className="text-sm font-medium text-green-800">Correct</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">❌ {result.totalQuestions - result.score}</div>
                  <div className="text-sm font-medium text-red-800">Incorrect</div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Clock className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">⏱️ {formatTime(result.timeSpent)}</div>
                  <div className="text-sm font-medium text-blue-800">Time Taken</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={() => onRetakeQuiz(quiz.id)} 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            🔄 Retake Quiz
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare} 
            size="lg"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            📤 Share Results
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('browse')} 
            size="lg"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            🔍 Browse More Quizzes
          </Button>
        </div>

        {/* Detailed Results */}
        <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">📋 Detailed Results</CardTitle>
            <CardDescription className="text-white/90">Review your answers and see the correct solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = result.answers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect || false;
              const selectedOption = userAnswer?.selectedAnswer ?? -1;
              const correctOption = question.correctAnswer;

              return (
                <div key={question.id} className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                  isCorrect 
                    ? 'bg-green-50 border-green-200 shadow-green-100' 
                    : 'bg-red-50 border-red-200 shadow-red-100'
                } shadow-lg`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex-1 text-lg">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="ml-4">
                      {isCorrect ? (
                        <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span className="text-green-800 font-medium">✅ Correct</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-full">
                          <XCircle className="w-6 h-6 text-red-600" />
                          <span className="text-red-800 font-medium">❌ Incorrect</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedOption === optionIndex;
                      const isCorrectOption = correctOption === optionIndex;
                      
                      let optionClass = 'p-4 rounded-lg border-2 transition-all duration-300 ';
                      
                      if (isCorrectOption) {
                        optionClass += 'bg-green-100 border-green-400 text-green-900 shadow-lg';
                      } else if (isSelected && !isCorrect) {
                        optionClass += 'bg-red-100 border-red-400 text-red-900 shadow-lg';
                      } else {
                        optionClass += 'bg-gray-50 border-gray-200 text-gray-700';
                      }

                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            <div className="flex items-center space-x-2">
                              {isSelected && (
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs font-medium ${
                                    isCorrect ? 'bg-green-200 text-green-800 border-green-400' : 'bg-red-200 text-red-800 border-red-400'
                                  }`}
                                >
                                  Your Answer
                                </Badge>
                              )}
                              {isCorrectOption && (
                                <Badge className="text-xs bg-green-600 text-white font-medium">
                                  ✅ Correct Answer
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm font-medium"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            🏠 Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}