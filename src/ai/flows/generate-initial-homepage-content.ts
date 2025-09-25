'use server';

/**
 * @fileOverview A GenAI-powered tool to generate initial content for the homepage of a website.
 *
 * - generateInitialHomepageContent - A function that generates content for the homepage.
 * - GenerateInitialHomepageContentInput - The input type for the generateInitialHomepageContent function.
 * - GenerateInitialHomepageContentOutput - The return type for the generateInitialHomepageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialHomepageContentInputSchema = z.object({
  prompt: z
    .string()
    .describe("A prompt describing the purpose of the website to generate content for."),
});
export type GenerateInitialHomepageContentInput = z.infer<typeof GenerateInitialHomepageContentInputSchema>;

const GenerateInitialHomepageContentOutputSchema = z.object({
  headline: z.string().describe("The main headline for the homepage."),
  subtext: z.string().describe("A one-sentence subtext describing the website's purpose."),
  aboutUsMission: z.string().describe("A brief description of the company's mission for the About Us section."),
  aboutUsScreening: z.string().describe("A brief description of the AI-driven screening process for the About Us section."),
  aboutUsHiring: z.string().describe("A brief statement on trusted hiring for the About Us section."),
});
export type GenerateInitialHomepageContentOutput = z.infer<typeof GenerateInitialHomepageContentOutputSchema>;

export async function generateInitialHomepageContent(input: GenerateInitialHomepageContentInput): Promise<GenerateInitialHomepageContentOutput> {
  return generateInitialHomepageContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialHomepageContentPrompt',
  input: {schema: GenerateInitialHomepageContentInputSchema},
  output: {schema: GenerateInitialHomepageContentOutputSchema},
  prompt: `You are a marketing expert specializing in creating compelling homepage content for startups. Based on the description of the website's purpose that I provide, you will generate a main headline, a one-sentence subtext, and content for the about us section.

Website Description: {{{prompt}}}

Headline: {{headline}}
Subtext: {{subtext}}
About Us Mission: {{aboutUsMission}}
About Us AI Screening: {{aboutUsScreening}}
About Us Trusted Hiring: {{aboutUsHiring}}`,
});

const generateInitialHomepageContentFlow = ai.defineFlow(
  {
    name: 'generateInitialHomepageContentFlow',
    inputSchema: GenerateInitialHomepageContentInputSchema,
    outputSchema: GenerateInitialHomepageContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
