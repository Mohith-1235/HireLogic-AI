
'use client';

import { useState } from 'react';
import { AiQuiz } from '@/components/ai-quiz';
import { QuizScoreboard, Score } from '@/components/quiz-scoreboard';

export default function AiQuizPage() {
  const [lastScore, setLastScore] = useState<Score | null>(null);

  const handleQuizFinish = (score: Score) => {
    setLastScore(score);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Trainee</h1>
          <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <AiQuiz onQuizFinish={handleQuizFinish} />
        </div>
        <div>
            <QuizScoreboard newScore={lastScore} />
        </div>
      </div>
    </>
  );
}
