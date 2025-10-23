
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
        name: 'jobApplicationAnalysis',
        input: { schema: JobApplicationInputSchema },
        output: { schema: z.object({
            matchScore: z.number(),
            summary: z.string(),
        }) },
        prompt: `
            Analyze the following resume and cover letter for the job of "{{jobTitle}}".
            
            Job Description:
            ---
            {{jobDescription}}
            ---
            
            Resume:
            ---
            {{media url=resumeDataUri}}
            ---
            
            Cover Letter:
            ---
            {{coverLetter}}
            ---
            
            Based on the information, provide a match score from 0-100 and a brief summary of the candidate's fitness for the role.
        `,
    });

    const analysis = await analysisPrompt.generate({
        input: {
            ...input,
        }
    });

    const { matchScore, summary } = analysis.output()!;

    await ai.generate({
        prompt: `The user, ${input.applicantName}, has applied for the job of ${input.jobTitle}. Their match score is ${matchScore}. Send an email to the hiring manager with their application details, the AI-generated summary, and their resume attached.`,
        tools: [sendEmailTool],
        output: {
            tool: sendEmailTool,
            input: {
                subject: `New Application: ${input.jobTitle} - ${input.applicantName}`,
                body: `
                    A new application has been submitted.

                    Applicant Name: ${input.applicantName}
                    Applicant Email: ${input.applicantEmail}
                    
                    AI Match Score: ${matchScore}%
                    AI Summary: ${summary}
                    
                    Cover Letter: 
                    ${input.coverLetter || 'Not provided'}
                `,
                attachments: [
                    {
                        filename: 'resume.pdf',
                        dataUri: input.resumeDataUri,
                    },
                ],
            },
        },
    });

    return {
        matchScore,
        summary,
        confirmationId: new Date().getTime().toString(),
    };
  }
);

export async function applyForJob(input: JobApplicationInput): Promise<JobApplicationOutput> {
    return applicationFlow(input);
}
