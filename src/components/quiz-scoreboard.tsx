
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export type Score = {
    topic: string;
    score: string;
    difficulty: 'Starting' | 'Medium' | 'Hard';
    date: string;
};

interface QuizScoreboardProps {
    newScore: Score | null;
}

export function QuizScoreboard({ newScore }: QuizScoreboardProps) {
    const [scores, setScores] = useState<Score[]>([]);
    
    useEffect(() => {
        try {
            const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
            setScores(savedScores.sort((a: Score, b: Score) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
            console.error('Failed to parse scores from localStorage', error);
        }
    }, []);

    useEffect(() => {
        if (newScore) {
            setScores(prevScores => 
                [newScore, ...prevScores].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
        }
    }, [newScore]);

    const getDifficultyColor = (difficulty: 'Starting' | 'Medium' | 'Hard') => {
        switch (difficulty) {
            case 'Starting':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Hard':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default:
                return 'bg-secondary text-secondary-foreground';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scoreboard</CardTitle>
                <CardDescription>Your recent quiz performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    {scores.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Difficulty</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scores.map((s, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{s.topic}</TableCell>
                                        <TableCell>{s.score}</TableCell>
                                        <TableCell>
                                            <Badge className={cn('capitalize', getDifficultyColor(s.difficulty))}>
                                                {s.difficulty}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(s.date), 'MMM d, yyyy')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground text-center">No scores yet. Complete a quiz to see your results!</p>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
