'use server';
/**
 * @fileOverview A flow for generating job post content using AI.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const GenerateJobPostInputSchema = z.object({
  title: z.string().describe('The job title.'),
  department: z.string().describe('The department for the job.'),
  skills: z.string().describe('A comma-separated or new-line separated list of key skills required for the job.'),
});
export type GenerateJobPostInput = z.infer<typeof GenerateJobPostInputSchema>;

export const GenerateJobPostOutputSchema = z.object({
    description: z.string().describe("A short, compelling description of the job role, optimized for job boards (2-3 sentences)."),
    whatYouWillDo: z.array(z.string()).describe("A list of 4-6 key responsibilities for the role as bullet points."),
    requiredSkills: z.array(z.string()).describe("A list of 5-7 essential skills and qualifications required for the role as bullet points."),
    kpis: z.array(z.string()).describe("A list of 3-4 key performance indicators (KPIs) to measure success in the role as bullet points."),
    benefits: z.array(z.string()).describe("A list of 4-5 compelling benefits offered for this position as bullet points."),
});
export type GenerateJobPostOutput = z.infer<typeof GenerateJobPostOutputSchema>;

const jobPostPrompt = ai.definePrompt({
    name: 'jobPostPrompt',
    input: { schema: GenerateJobPostInputSchema },
    output: { schema: GenerateJobPostOutputSchema },
    prompt: `You are an expert recruiter creating a job post for Talento, a talent agency.
    
    Your tone should be professional, engaging, and aligned with a modern tech company.

    Generate the content for a job posting with the following details:
    Job Title: {{{title}}}
    Department: {{{department}}}
    Key Skills: {{{skills}}}

    Based on these inputs, generate the following content sections. Be concise but comprehensive.
    1.  **description**: A short, compelling paragraph summarizing the role (2-3 sentences).
    2.  **whatYouWillDo**: A list of 4-6 key responsibilities for the role.
    3.  **requiredSkills**: A list of 5-7 essential qualifications and skills.
    4.  **kpis**: A list of 3-4 Key Performance Indicators.
    5.  **benefits**: A list of 4-5 compelling benefits.
    
    Ensure the output is in the specified JSON format.
    `,
});

const generateJobPostFlow = ai.defineFlow(
    {
        name: 'generateJobPostFlow',
        inputSchema: GenerateJobPostInputSchema,
        outputSchema: GenerateJobPostOutputSchema,
    },
    async (input) => {
        const {output} = await jobPostPrompt(input);
        if (!output) {
            throw new Error("AI failed to generate job post content.");
        }
        return output;
    }
);

export async function generateJobPost(input: GenerateJobPostInput): Promise<GenerateJobPostOutput> {
    return generateJobPostFlow(input);
}
