
'use server';

/**
 * @fileOverview A GenAI-powered tool to generate a certificate image.
 *
 * - generateCertificateImage - A function that generates a certificate image.
 * - GenerateCertificateImageInput - The input type for the generateCertificateImage function.
 * - GenerateCertificateImageOutput - The return type for the generateCertificateImage function.
 */

import {ai} from '@/ai/genkit';
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
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate a professional certificate of completion with a formal, elegant border.
        The certificate must have the following text elements, clearly legible:
        - Main heading: "Certificate of Completion"
        - Sub-heading: "This certifies that"
        - Recipient Name (in a large, elegant script font): "${input.userName}"
        - Completion statement: "has successfully completed"
        - Course Title (in a bold, prominent font): "${input.title}"
        - Issuing body: "Issued by ${input.issuer}"
        - In the bottom right corner, include a realistic but fictional, generated signature.
        - In the bottom left corner, include today's date.
        
        The overall design should be clean, prestigious, and professional, suitable for printing. Use a classic color palette such as cream, gold, and dark navy blue. The layout should be balanced and centered. Do not include any other text or logos.`,
    });
    
    if (!media.url) {
        throw new Error('Image generation failed to produce a result.');
    }

    return { imageDataUri: media.url };
  }
);
