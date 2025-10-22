
'use server';

/**
 * @fileOverview Analyzes a job application, provides a match score, and sends an email to the hiring manager.
 *
 * @exported
 * - `applyForJob`: Function to trigger the job application flow.
 * @exported
 * - `JobApplicationInput`: Input type for the `applyForJob` function.
 * @exported
 * - `JobApplicationOutput`: Output type for the `applyForJob` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JobApplicationInputSchema = z.object({
  applicantName: z.string().describe('The name of the job applicant.'),
  applicantEmail: z.string().email().describe('The email address of the job applicant.'),
  resumeDataUri: z
    .string()
    .describe(
      "The applicant's resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobTitle: z.string().describe('The title of the job being applied for.'),
  jobDescription: z.string().describe('The full job description.'),
  coverLetter: z.string().optional().describe('The applicant\'s cover letter.'),
});
export type JobApplicationInput = z.infer<typeof JobApplicationInputSchema>;

const JobApplicationOutputSchema = z.object({
  matchScore: z.number().describe('A score from 0 to 100 indicating how well the resume matches the job description.'),
  summary: z.string().describe('A brief summary of the applicant\'s strengths and weaknesses for the role.'),
  confirmationId: z.string().describe('A confirmation ID for the application submission.'),
});
export type JobApplicationOutput = z.infer<typeof JobApplicationOutputSchema>;

const sendEmailTool = ai.defineTool(
    {
        name: 'sendEmail',
        description: 'Sends an email. The recipient is dawod.analyst@gmail.com.',
        inputSchema: z.object({
            subject: z.string(),
            body: z.string(),
            attachments: z.array(z.object({
                filename: z.string(),
                dataUri: z.string(),
            })).optional(),
        }),
        outputSchema: z.object({
            success: z.boolean(),
        }),
    },
    async (input) => {
        // In a real-world scenario, this would use an email service like SendGrid, Resend, or Nodemailer.
        // For this demo, we'll just log to the console to simulate sending an email.
        console.log('--- SENDING EMAIL ---');
        console.log('To: dawod.analyst@gmail.com');
        console.log(`Subject: ${input.subject}`);
        console.log('Body:');
        console.log(input.body);
        if (input.attachments && input.attachments.length > 0) {
            console.log(`Attachments: ${input.attachments.map(a => a.filename).join(', ')}`);
        }
        console.log('---------------------');
        
        // Let's pretend it's always successful for the demo.
        return { success: true };
    }
);


const applicationFlow = ai.defineFlow(
  {
    name: 'applicationFlow',
    inputSchema: JobApplicationInputSchema,
    outputSchema: JobApplicationOutputSchema,
  },
  async (input) => {
    const analysisPrompt = ai.definePrompt({
        name: 'jobMatchAnalysisPrompt',
        tools: [sendEmailTool],
        input: { schema: JobApplicationInputSchema },
        prompt: `You are an AI assistant for a hiring manager. Your tasks are:
    
    1.  **Analyze the Resume**: Carefully review the applicant's resume and cover letter (if provided) against the job description.
    2.  **Score the Applicant**: Generate a \`matchScore\` from 0 to 100 based on how well the applicant's skills and experience align with the job requirements.
    3.  **Summarize the Match**: Write a concise \`summary\` for the hiring manager, highlighting the candidate's key strengths, potential weaknesses, and overall fit for the role.
    4.  **Send an Email**: Use the \`sendEmail\` tool to send the applicant's information to the hiring manager at \`dawod.analyst@gmail.com\`. The email should have:
        *   A subject line: "New Application: {Job Title} - {Applicant Name}".
        *   A body containing the applicant's name, email, the generated match score, and the summary.
        *   The applicant's resume attached. The filename should be 'resume.pdf' or similar.
    
    Applicant Name: {{{applicantName}}}
    Applicant Email: {{{applicantEmail}}}
    Job Title: {{{jobTitle}}}
    
    Job Description:
    {{{jobDescription}}}
    
    {{#if coverLetter}}
    Cover Letter:
    {{{coverLetter}}}
    {{/if}}

    Resume:
    {{media url=resumeDataUri}}
    `,
    });

    const { output } = await analysisPrompt(input);
    return {
        ...output,
        confirmationId: new Date().getTime().toString(), // Generate a simple confirmation ID
    };
  }
);

export async function applyForJob(input: JobApplicationInput): Promise<JobApplicationOutput> {
    return applicationFlow(input);
}
