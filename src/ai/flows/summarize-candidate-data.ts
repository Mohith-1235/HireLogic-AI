'use server';

/**
 * @fileOverview A flow to summarize candidate data from a resume or profile.
 *
 * - summarizeCandidateData - A function that handles the summarization process.
 * - SummarizeCandidateDataInput - The input type for the summarizeCandidateData function.
 * - SummarizeCandidateDataOutput - The return type for the summarizeCandidateData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCandidateDataInputSchema = z.object({
  candidateData: z
    .string()
    .describe('The candidate data, such as resume text or profile information.'),
});
export type SummarizeCandidateDataInput = z.infer<typeof SummarizeCandidateDataInputSchema>;

const SummarizeCandidateDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the candidate\u2019s skills and experience.'),
});
export type SummarizeCandidateDataOutput = z.infer<typeof SummarizeCandidateDataOutputSchema>;

export async function summarizeCandidateData(input: SummarizeCandidateDataInput): Promise<SummarizeCandidateDataOutput> {
  return summarizeCandidateDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCandidateDataPrompt',
  input: {schema: SummarizeCandidateDataInputSchema},
  output: {schema: SummarizeCandidateDataOutputSchema},
  prompt: `You are an expert recruiter. Please summarize the following candidate data, focusing on skills and experience relevant to potential job opportunities. Be concise.

Candidate Data: {{{candidateData}}}`,
});

const summarizeCandidateDataFlow = ai.defineFlow(
  {
    name: 'summarizeCandidateDataFlow',
    inputSchema: SummarizeCandidateDataInputSchema,
    outputSchema: SummarizeCandidateDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
