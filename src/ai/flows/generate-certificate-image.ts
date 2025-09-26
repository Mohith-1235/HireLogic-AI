
'use server';

/**
 * @fileOverview A GenAI-powered tool to generate a certificate image.
 *
 * - generateCertificateImage - A function that generates a certificate image.
 * - GenerateCertificateImageInput - The input type for the generateCertificateImage function.
 * - GenerateCertificateImageOutput - The return type for the generateCertificateImage function.
 */

import {ai} from '@/ai/genkit';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {z} from 'genkit';

const GenerateCertificateImageInputSchema = z.object({
  title: z.string().describe("The title of the certification or course."),
  issuer: z.string().describe("The name of the organization that issued the certificate."),
  userName: z.string().describe("The full name of the person receiving the certificate."),
});
export type GenerateCertificateImageInput = z.infer<typeof GenerateCertificateImageInputSchema>;

const GenerateCertificateImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated certificate image as a data URI."),
});
export type GenerateCertificateImageOutput = z.infer<typeof GenerateCertificateImageOutputSchema>;

export async function generateCertificateImage(input: GenerateCertificateImageInput): Promise<GenerateCertificateImageOutput> {
  return generateCertificateImageFlow(input);
}

const generateCertificateImageFlow = ai.defineFlow(
  {
    name: 'generateCertificateImageFlow',
    inputSchema: GenerateCertificateImageInputSchema,
    outputSchema: GenerateCertificateImageOutputSchema,
  },
  async (input) => {
    const certificateTemplate = PlaceHolderImages.find(p => p.id === 'certificate-template');
    if (!certificateTemplate) {
        throw new Error('Certificate template image not found.');
    }

    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            { media: { url: certificateTemplate.imageUrl } },
            {
              text: `Using the provided certificate template, add the following text to it:
              - Recipient's Name: "${input.userName}" (in a large, elegant script font in the center)
              - Course Title: "${input.title}" (in a bold font below the recipient's name)
              - Issuing Organization: "Issued by ${input.issuer}" (in a smaller font below the course title)
              Do not change any other part of the template.`,
            },
        ],
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        }
    });
    
    if (!media.url) {
        throw new Error('Image generation failed to produce a result.');
    }

    return { imageDataUri: media.url };
  }
);
