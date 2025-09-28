import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react@0.487.0";
import { toast } from "sonner@2.0.3";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCreationProps {
  onNavigate: (page: string) => void;
  onSaveQuiz: (quiz: { 
    title: string; 
    description: string; 
    questions: Question[];
    createdBy: string;
  }) => void;
  currentUser: { id: string; name: string; email: string };
}

export function QuizCreation({ onNavigate, onSaveQuiz, currentUser }: QuizCreationProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (!description.trim()) {
      toast.error('Please enter a quiz description');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        toast.error(`Please enter question ${i + 1}`);
        return;
      }
      
      const filledOptions = q.options.filter(opt => opt.trim());
      if (filledOptions.length < 2) {
        toast.error(`Question ${i + 1} needs at least 2 options`);
        return;
      }

      if (!q.options[q.correctAnswer]?.trim()) {
        toast.error(`Please select a valid correct answer for question ${i + 1}`);
        return;
      }
    }

    const quiz = {
      title: title.trim(),
      description: description.trim(),
      questions: questions.map(q => ({
        ...q,
        question: q.question.trim(),
        options: q.options.filter(opt => opt.trim())
      })),
      createdBy: currentUser.id
    };

    onSaveQuiz(quiz);
    toast.success('Quiz created successfully!');
    onNavigate('browse');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        </div>

        <div className="space-y-6">
          {/* Quiz Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>Basic details about your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  placeholder="Enter an engaging title for your quiz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this quiz is about"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Questions</h2>
              <Button onClick={addQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Question {questionIndex + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Textarea
                      placeholder="Enter your question here"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Answer Options (mark the correct one)</Label>
                    <RadioGroup
                      value={question.correctAnswer.toString()}
                      onValueChange={(value) => updateQuestion(question.id, 'correctAnswer', parseInt(value))}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          <RadioGroupItem value={optionIndex.toString()} />
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4 pb-8">
            <Button variant="outline" onClick={() => onNavigate('home')}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}