
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Separator } from './ui/separator';

export function NotebookLMBlock() {
  const [title, setTitle] = useState('Untitled Note');
  const [content, setContent] = useState('');

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0 h-auto"
          aria-label="Note title"
        />
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <Textarea
          placeholder="Start writing your thoughts, ideas, or meeting notes here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[40vh] border-none shadow-none focus-visible:ring-0 p-0 text-base"
          aria-label="Note content"
        />
      </CardContent>
      <Separator />
      <CardFooter className="justify-between p-4">
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">AI suggestions will appear here.</span>
        </div>
        <Button variant="ghost">
          <Sparkles className="mr-2 h-4 w-4" />
          Enhance with AI
        </Button>
      </CardFooter>
    </Card>
  );
}
