'use server';

/**
 * @fileOverview Matches job seekers to job openings based on their resume and other details using GenAI.
 *
 * @exported
 * - `matchJob`: Function to trigger the job matching flow.
 * @exported
 * - `JobMatchingInput`: Input type for the `matchJob` function.
 * @exported
 * - `JobMatchingOutput`: Output type for the `matchJob` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobMatchingInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "Resume data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description to match against.'),
  additionalDetails: z.string().optional().describe('Any additional details about the job seeker.'),
});
export type JobMatchingInput = z.infer<typeof JobMatchingInputSchema>;

const JobMatchingOutputSchema = z.object({
  matchScore: z.number().describe('A score indicating how well the resume matches the job description (0-100).'),
  summary: z.string().describe('A brief summary of why the resume is a good or bad match for the job.'),
});
export type JobMatchingOutput = z.infer<typeof JobMatchingOutputSchema>;

export async function matchJob(input: JobMatchingInput): Promise<JobMatchingOutput> {
  return jobMatchingFlow(input);
}

const jobMatchingPrompt = ai.definePrompt({
  name: 'jobMatchingPrompt',
  input: {schema: JobMatchingInputSchema},
  output: {schema: JobMatchingOutputSchema},
  prompt: `You are an AI job matching expert. Analyze the job seeker's resume and
  any additional details provided, and determine how well they match the provided
  job description.

  Provide a match score between 0 and 100 (inclusive), where 100 is a perfect match.
  Also provide a brief summary explaining the match score.

  Job Description: {{{jobDescription}}}

  Resume:
  {{media url=resumeDataUri}}

  {{#if additionalDetails}}
  Additional Details: {{{additionalDetails}}}
  {{/if}}
  `,
});

const jobMatchingFlow = ai.defineFlow(
  {
    name: 'jobMatchingFlow',
    inputSchema: JobMatchingInputSchema,
    outputSchema: JobMatchingOutputSchema,
  },
  async input => {
    const {output} = await jobMatchingPrompt(input);
    return output!;
  }
);
