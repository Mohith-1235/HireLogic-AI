'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Bot, User, Send } from 'lucide-react';

type Message = {
    sender: 'user' | 'ai';
    text: string;
    feedback?: string;
};

type InterviewMode = 'hr-basics' | 'behavioral' | 'role-specific';

export function AiHrInterviewTrainer() {
    const [mode, setMode] = useState<InterviewMode>('hr-basics');
    const [conversation, setConversation] = useState<Message[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleStartInterview = () => {
        setConversation([{ sender: 'ai', text: "Hello! I'm your AI HR Interview Trainer. To begin, tell me a little about yourself." }]);
        setCurrentAnswer('');
    };

    const handleSendMessage = () => {
        if (!currentAnswer.trim()) return;

        const newUserMessage: Message = { sender: 'user', text: currentAnswer };
        setConversation(prev => [...prev, newUserMessage]);
        setCurrentAnswer('');
        setIsLoading(true);

        // Mock AI generating next question
        setTimeout(() => {
            const aiResponse: Message = {
                sender: 'ai',
                text: 'That\'s interesting. Can you describe a challenging situation you faced at work and how you handled it?'
            };
            setConversation(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    const handleGetFeedback = () => {
        const lastUserMessageIndex = conversation.slice().reverse().findIndex(m => m.sender === 'user');
        if (lastUserMessageIndex === -1) return;

        const lastMessage = conversation[conversation.length - 1 - lastUserMessageIndex];
        
        let feedback = "This is a solid answer.";
        if (lastMessage.text.length < 20) {
            feedback = "Your answer is a bit short. Could you please elaborate more to provide a clearer picture?";
        } else if (lastMessage.text.toLowerCase().includes('team') || lastMessage.text.toLowerCase().includes('impact') || lastMessage.text.toLowerCase().includes('metric')) {
            feedback = "Excellent! You've provided concrete evidence and mentioned teamwork, which is great to see.";
        }

        const updatedConversation = [...conversation];
        updatedConversation[conversation.length - 1 - lastUserMessageIndex].feedback = feedback;
        setConversation(updatedConversation);
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [conversation]);


    return (
        <Card className="w-full h-[calc(100vh-4rem-4rem)] flex flex-col">
            <CardHeader>
                <CardTitle>AI HR Interview Trainer</CardTitle>
                <CardDescription>Practice your interview skills with our AI. Choose a mode to get started.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                {conversation.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                        <div className='space-y-2'>
                            <h3 className="text-xl font-semibold">Select Interview Mode</h3>
                            <Select onValueChange={(value: InterviewMode) => setMode(value)} defaultValue={mode}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hr-basics">HR Basics</SelectItem>
                                    <SelectItem value="behavioral">Behavioral Questions</SelectItem>
                                    <SelectItem value="role-specific">Role-Specific (e.g., Frontend)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleStartInterview}>Start Interview</Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 w-full p-4 border rounded-md" ref={scrollAreaRef}>
                            <div className="space-y-6">
                                {conversation.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'ai' && <AvatarIcon><Bot className="h-6 w-6" /></AvatarIcon>}
                                        <div className={`rounded-lg p-3 max-w-[75%] ${msg.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            {msg.feedback && (
                                                <div className="mt-2 p-2 text-xs bg-blue-100 dark:bg-blue-900/50 rounded-md">
                                                    <p className="font-semibold text-blue-800 dark:text-blue-300">Feedback:</p>
                                                    <p className='text-blue-700 dark:text-blue-200'>{msg.feedback}</p>
                                                </div>
                                            )}
                                        </div>
                                        {msg.sender === 'user' && <AvatarIcon><User className="h-6 w-6" /></AvatarIcon>}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <AvatarIcon><Bot className="h-6 w-6" /></AvatarIcon>
                                        <div className="rounded-lg p-3 bg-muted">
                                            <p className="text-sm italic">typing...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="flex flex-col gap-2">
                             <div className="relative">
                                <Textarea
                                    placeholder="Type your answer here..."
                                    value={currentAnswer}
                                    onChange={(e) => setCurrentAnswer(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    className="pr-12"
                                    rows={3}
                                />
                                <Button size="icon" className="absolute right-2 bottom-2" onClick={handleSendMessage} disabled={isLoading || !currentAnswer.trim()}>
                                    <Send className="h-4 w-4"/>
                                </Button>
                             </div>
                            <div className="flex gap-2">
                                <Button onClick={handleGetFeedback} disabled={isLoading} variant="outline">Get Feedback on Last Answer</Button>
                                <Button onClick={() => setConversation([])} variant="destructive">End Interview</Button>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}


const AvatarIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground shrink-0">
        {children}
    </div>
);
