
'use client';

import { NotebookLMBlock } from '@/components/notebook-lm-block';

export default function NoteBookLMPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NoteBook LM</h1>
          <p className="text-muted-foreground">Your intelligent notebook for capturing and connecting ideas.</p>
        </div>
      </div>
      <NotebookLMBlock />
    </>
  );
}
