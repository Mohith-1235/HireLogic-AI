
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NoteBookLMPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">NoteBook LM</h1>
                <p className="text-muted-foreground">Your intelligent notebook for thoughts and ideas.</p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>My Notebook</CardTitle>
                <CardDescription>Jot down your thoughts, and let the AI help you organize and expand on them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Start writing here..."
                    className="min-h-[400px] text-base"
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline">Summarize</Button>
                    <Button>Save</Button>
                </div>
            </CardContent>
        </Card>
    </>
  );
}
