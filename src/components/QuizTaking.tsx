import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react@0.487.0";

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
}

interface QuizTakingProps {
  quiz: Quiz;
  onNavigate: (page: string) => void;
  onComplete: (results: {
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: Array<{ questionId: string; selectedAnswer: number; isCorrect: boolean; correctAnswer: number }>;
    timeSpent: number;
  }) => void;
}

export function QuizTaking({ quiz, onNavigate, onComplete }: QuizTakingProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{ show: boolean; isCorrect: boolean } | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value: string) => {
    const selectedAnswer = parseInt(value);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedAnswer
    });
    
    // Show feedback
    setShowFeedback({ show: true, isCorrect });
    
    // Hide feedback after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(null);
    }, 1500);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    const results = quiz.questions.map(question => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.correctAnswer;
      return {
        questionId: question.id,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect,
        correctAnswer: question.correctAnswer
      };
    });

    const score = results.filter(r => r.isCorrect).length;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    onComplete({
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      answers: results,
      timeSpent
    });
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-400 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white/20 backdrop-blur-lg rounded-2xl p-6 glass-effect">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => onNavigate('browse')} className="mr-4 bg-white/20 hover:bg-white/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">{quiz.title}</h1>
              <p className="text-white/80">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white bg-white/20 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="bg-white/20 rounded-full p-1 backdrop-blur-lg">
            <Progress value={progress} className="h-3 bg-white/30" />
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <span>Progress: {Math.round(progress)}%</span>
            <span>{quiz.questions.filter((_, i) => answers[quiz.questions[i].id] !== undefined).length} / {quiz.questions.length} answered</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigation (Desktop) */}
          <div className="hidden lg:block">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-sm text-white">Question Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.questions.map((_, index) => {
                    const isAnswered = answers[quiz.questions[index].id] !== undefined;
                    const isCurrent = index === currentQuestionIndex;
                    
                    return (
                      <Button
                        key={index}
                        variant={isCurrent ? 'default' : 'outline'}
                        size="sm"
                        className={`w-8 h-8 p-0 transition-all duration-300 ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-110' 
                            : isAnswered 
                              ? 'bg-green-500 text-white border-green-400 hover:bg-green-600' 
                              : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                        }`}
                        onClick={() => jumpToQuestion(index)}
                      >
                        {isAnswered && !isCurrent ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-white/80">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-white/90">
                  {currentQuestion.question}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ''}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = answers[currentQuestion.id] === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showSelectedResult = showFeedback?.show && isSelected;
                    const showCorrectAnswer = showFeedback?.show && !showFeedback.isCorrect && isCorrect;
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          showSelectedResult
                            ? showFeedback.isCorrect
                              ? 'answer-correct border-green-400 bg-green-50'
                              : 'answer-incorrect border-red-400 bg-red-50'
                            : showCorrectAnswer
                              ? 'answer-correct border-green-400 bg-green-50'
                            : isSelected
                              ? 'answer-selected border-purple-400 bg-gradient-to-r from-purple-50 to-indigo-50'
                              : 'border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`option-${index}`}
                          className={isSelected ? 'border-white' : ''}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer text-base font-medium"
                        >
                          {option}
                        </Label>
                        {showSelectedResult && (
                          <div className="text-lg">
                            {showFeedback.isCorrect ? '✅' : '❌'}
                          </div>
                        )}
                        {showCorrectAnswer && (
                          <div className="text-lg">
                            ✅
                          </div>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>

                {/* Feedback Message */}
                {showFeedback?.show && (
                  <div className={`text-center p-4 rounded-lg font-medium text-lg ${
                    showFeedback.isCorrect 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {showFeedback.isCorrect 
                      ? '🎉 Correct! Great job!' 
                      : `❌ Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                    }
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="bg-white/80 border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!hasAnswered}
                    className={`${
                      isLastQuestion 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                    } text-white font-medium transition-all duration-300 transform hover:scale-105`}
                  >
                    {isLastQuestion ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        🎯 Complete Quiz
                      </>
                    ) : (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Navigation */}
            <div className="lg:hidden mt-4">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="text-sm text-white font-medium mb-2">Progress</div>
                  <div className="flex flex-wrap gap-1">
                    {quiz.questions.map((_, index) => {
                      const isAnswered = answers[quiz.questions[index].id] !== undefined;
                      const isCurrent = index === currentQuestionIndex;
                      
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className={`w-8 h-8 p-0 text-xs transition-all duration-300 ${
                            isCurrent 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-110' 
                              : isAnswered 
                                ? 'bg-green-500 text-white border-green-400' 
                                : 'bg-white/20 text-white border-white/30'
                          }`}
                          onClick={() => jumpToQuestion(index)}
                        >
                          {index + 1}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}