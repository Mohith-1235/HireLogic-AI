
'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

export function NotebookLMBlock() {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <Textarea
          placeholder="Untitled Note"
          className="text-2xl font-bold border-none focus-visible:ring-0 shadow-none resize-none p-0 bg-transparent"
          rows={1}
        />
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Start writing your notes here..."
          className="border-none focus-visible:ring-0 shadow-none resize-y min-h-[300px] p-0 bg-transparent"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Actions
        </Button>
      </CardFooter>
    </Card>
  );
}
