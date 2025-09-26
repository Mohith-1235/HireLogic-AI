
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';

export function NotebookLMBlock() {
    const [title, setTitle] = useState('Untitled Note');
    const [content, setContent] = useState('');

    return (
        <Card className="w-full">
            <CardHeader>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                />
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Start writing your notes here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[300px] border-none focus:outline-none focus:ring-0 p-0 text-base resize-none"
                />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="ghost">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    AI Actions
                </Button>
            </CardFooter>
        </Card>
    );
}
