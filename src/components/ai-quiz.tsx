
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { generateQuiz, GenerateQuizOutput, GenerateQuizInput } from '@/ai/flows/generate-quiz';
import { Loader2, BrainCircuit, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Score } from './quiz-scoreboard';

type QuizState = 'idle' | 'loading' | 'active' | 'finished';
type QuizQuestion = GenerateQuizOutput['questions'][0];
type QuizDifficulty = GenerateQuizInput['difficulty'];

interface AiQuizProps {
    onQuizFinish: (score: Score) => void;
}

export function AiQuiz({ onQuizFinish }: AiQuizProps) {
    const [topic, setTopic] = useState('React');
    const [subTopic, setSubTopic] = useState('');
    const [difficulty, setDifficulty] = useState<QuizDifficulty>('Medium');
    const [quizState, setQuizState] = useState<QuizState>('idle');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const { toast } = useToast();

    const handleStartQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            toast({
                variant: 'destructive',
                title: 'Topic Required',
                description: 'Please enter a topic for the quiz.',
            });
            return;
        }

        setQuizState('loading');
        setUserAnswers([]);
        setScore(0);
        setCurrentQuestionIndex(0);

        const result = await generateQuiz({ topic, subTopic, difficulty });

        if (result && result.questions) {
            setQuestions(result.questions);
            setQuizState('active');
        } else {
            toast({
                variant: 'destructive',
                title: 'Failed to Generate Quiz',
                description: 'Could not generate a quiz for this topic. Please try another one.',
            });
            setQuizState('idle');
        }
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) {
            toast({
                variant: 'destructive',
                title: 'No Answer Selected',
                description: 'Please select an answer before proceeding.',
            });
            return;
        }

        const newAnswers = [...userAnswers, selectedAnswer];
        setUserAnswers(newAnswers);

        // Check if the answer is correct
        const currentScore = selectedAnswer === questions[currentQuestionIndex].answer ? score + 1 : score;
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            setScore(currentScore);
        }

        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizState('finished');
            const finalScore = {
                topic: subTopic ? `${topic}: ${subTopic}` : topic,
                score: `${currentScore}/${questions.length}`,
                difficulty: difficulty,
                date: new Date().toISOString(),
            };

            // Save to local storage
            const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
            savedScores.push(finalScore);
            localStorage.setItem('quizScores', JSON.stringify(savedScores));

            // Notify parent
            onQuizFinish(finalScore);
        }
    };
    
    const handleRestart = () => {
        setQuizState('idle');
        setTopic('React');
        setSubTopic('');
        setQuestions([]);
        setUserAnswers([]);
    };

    const handleGoBack = () => {
        handleRestart();
    };

    const renderQuizContent = () => {
        switch (quizState) {
            case 'idle':
            case 'loading':
                return (
                    <form onSubmit={handleStartQuiz}>
                        <CardHeader>
                            <CardTitle>Create Your Quiz</CardTitle>
                            <CardDescription>Enter a topic and difficulty to start a new quiz.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="topic">Topic</Label>
                                <Input
                                    id="topic"
                                    placeholder="e.g., 'JavaScript'"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    disabled={quizState === 'loading'}
                                />
                            </div>
                            <div>
                                <Label htmlFor="subtopic">Sub-topic (Optional)</Label>
                                <Input
                                    id="subtopic"
                                    placeholder="e.g., 'ES6 Promises'"
                                    value={subTopic}
                                    onChange={(e) => setSubTopic(e.target.value)}
                                    disabled={quizState === 'loading'}
                                />
                            </div>
                            <div>
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select
                                    value={difficulty}
                                    onValueChange={(value: QuizDifficulty) => setDifficulty(value)}
                                    disabled={quizState === 'loading'}
                                >
                                    <SelectTrigger id="difficulty">
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Starting">Starting</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={quizState === 'loading'}>
                                {quizState === 'loading' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Quiz...
                                    </>
                                ) : (
                                     <>
                                        <BrainCircuit className="mr-2 h-4 w-4" />
                                        Start Quiz
                                     </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                );

            case 'active':
                const question = questions[currentQuestionIndex];
                return (
                    <>
                        <CardHeader>
                            <div className='flex justify-between items-center'>
                                <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{difficulty}</Badge>
                                </div>
                            </div>
                            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mt-2" />
                            <CardDescription className="pt-4 text-lg font-semibold text-foreground">{question.question}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                value={selectedAnswer || ''}
                                onValueChange={setSelectedAnswer}
                                className="space-y-3"
                            >
                                {question.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`option-${index}`} />
                                        <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleNextQuestion} className="w-full">
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                            </Button>
                        </CardFooter>
                    </>
                );
            
            case 'finished':
                return (
                     <>
                        <CardHeader className="items-center text-center">
                            <CardTitle>Quiz Complete!</CardTitle>
                            <CardDescription>You scored {score} out of {questions.length}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <ul className="space-y-4">
                                {questions.map((q, index) => (
                                    <li key={index} className="p-3 rounded-md border">
                                        <p className="font-semibold">{index + 1}. {q.question}</p>
                                        <p className={cn(
                                            "mt-2 text-sm",
                                            userAnswers[index] === q.answer ? "text-green-600" : "text-red-600"
                                        )}>
                                            Your answer: {userAnswers[index]}
                                        </p>
                                        {userAnswers[index] !== q.answer && (
                                            <p className="text-sm text-green-600">Correct answer: {q.answer}</p>
                                        )}
                                    </li>
                                ))}
                           </ul>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button onClick={handleGoBack} className="w-full" variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                            </Button>
                            <Button onClick={handleRestart} className="w-full">
                                Take Another Quiz
                            </Button>
                        </CardFooter>
                    </>
                );
        }
    };

    return (
        <Card>
            {renderQuizContent()}
        </Card>
    );
}
