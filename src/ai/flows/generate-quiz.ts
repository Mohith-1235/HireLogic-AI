
'use server';

/**
 * @fileOverview A flow to generate a multiple-choice quiz on a given topic and difficulty.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The main topic for the quiz.'),
  subTopic: z.string().optional().describe('An optional, more specific sub-topic for the quiz.'),
  difficulty: z.enum(['Starting', 'Medium', 'Hard']).describe('The difficulty level of the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe('The quiz question.'),
    options: z.array(z.string()).describe('A list of 4 multiple-choice options.'),
    answer: z.string().describe('The correct answer from the options list.'),
});

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).length(5).describe('A list of 5 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput | null> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz master. Generate a 5-question multiple-choice quiz based on the following criteria. Each question should have 4 options, and you must provide the correct answer.

Topic: {{{topic}}}
{{#if subTopic}}
Sub-topic: {{{subTopic}}}
{{/if}}
Difficulty: {{{difficulty}}}

The questions should be theoretical, focusing on concepts and definitions.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema.nullable(),
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output;
    } catch (error) {
      console.error('Error generating quiz:', error);
      return null;
    }
  }
);
