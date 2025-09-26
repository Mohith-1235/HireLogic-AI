
'use server';

/**
 * @fileOverview A flow to analyze a resume file and extract key information.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AnalyzeResumeInputSchema = z.object({
  resumeFile: z.object({
      url: z.string().describe("A data URI of the resume file. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
      contentType: z.string().describe("The MIME type of the file, e.g., 'application/pdf'.")
  })
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

export const AnalyzeResumeOutputSchema = z.object({
  domains: z.array(z.object({
    name: z.string().describe("The name of the professional domain, e.g., 'Frontend Development'."),
    confidence: z.enum(['High', 'Medium', 'Low']).describe("The confidence level of the domain match.")
  })).describe("A list of inferred professional domains from the resume."),
  skills: z.array(z.string()).describe("A list of the top technical skills identified in the resume."),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput | null> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyst for a tech recruiting firm. Your task is to extract key information from the provided resume file.

Analyze the following resume:
{{media url=resumeFile.url}}

Based on the content, identify the candidate's primary professional domains (e.g., 'Backend Development', 'UI/UX Design', 'Data Science') and your confidence level for each. Also, list their top technical skills (e.g., 'React', 'Python', 'Figma').`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema.nullable(),
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // In case of an external service error, return null to allow the frontend to handle it.
      return null;
    }
  }
);
