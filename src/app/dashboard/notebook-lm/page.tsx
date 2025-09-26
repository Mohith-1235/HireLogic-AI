
'use client';

import { NotebookLMBlock } from "@/components/notebook-lm-block";

export default function NoteBookLMPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NoteBook LM</h1>
          <p className="text-muted-foreground">Your personal space for notes and ideas.</p>
        </div>
      </div>
      <div className="grid gap-6">
        <NotebookLMBlock />
      </div>
    </>
  );
}
