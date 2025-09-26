
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

export function NotebookLMBlock() {
    const [title, setTitle] = useState('Untitled Note');
    const [content, setContent] = useState('');

    return (
        <Card className="w-full max-w-3xl mx-auto mt-6 shadow-lg border-border/60">
            <CardHeader className="border-b border-border/60 p-4">
                <Input
                    className="text-lg font-bold border-none focus-visible:ring-0 shadow-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Untitled Note"
                />
            </CardHeader>
            <CardContent className="p-0">
                <Textarea
                    className="min-h-[400px] w-full border-none resize-none focus-visible:ring-0 shadow-none text-base"
                    placeholder="Start writing your notes here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </CardContent>
            <CardFooter className="p-4 border-t border-border/60">
                <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask AI
                </Button>
            </CardFooter>
        </Card>
    );
}
