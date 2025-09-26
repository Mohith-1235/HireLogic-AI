
'use client';

import { AiQuiz } from '@/components/ai-quiz';

export default function AiQuizPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Quiz</h1>
          <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes.</p>
        </div>
      </div>
      <AiQuiz />
    </>
  );
}
