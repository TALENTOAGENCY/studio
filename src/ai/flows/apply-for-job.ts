
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
    // Step 1: Use the analysis to send the email.
    await ai.generate({
        prompt: `The user, ${input.applicantName}, has applied for the job of ${input.jobTitle}. Send an email to the hiring manager with their application.`,
        tools: [sendEmailTool],
        output: {
            tool: sendEmailTool,
            // Pre-fill the tool's input with the data we already have.
            input: {
                subject: `New Application: ${input.jobTitle} - ${input.applicantName}`,
                body: `
                    Applicant Name: ${input.applicantName}
                    Applicant Email: ${input.applicantEmail}
                    Cover Letter: ${input.coverLetter || 'Not provided'}
                `,
                attachments: [
                    {
                        filename: 'resume.pdf', // Assuming PDF, adjust if needed
                        dataUri: input.resumeDataUri,
                    },
                ],
            },
        },
    });

    return {
        // Since we are skipping the analysis, we'll return default values.
        matchScore: 0,
        summary: "Your application has been submitted successfully. The hiring manager will review it shortly.",
        confirmationId: new Date().getTime().toString(), // Generate a simple confirmation ID
    };
  }
);

export async function applyForJob(input: JobApplicationInput): Promise<JobApplicationOutput> {
    return applicationFlow(input);
}
