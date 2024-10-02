import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openAiAPIStr = process.env.OPENAI_API_KEY;
const AI_MODEL = 'gpt-4o-mini';

if (!openAiAPIStr) {
  throw new Error('Please define `OPENAI_API_KEY` in .env');
}
export const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TicketAnalysisSchema = z.object({
  ticketSummary: z.string(),
  ticketSentiment: z.string(),
});

export const chatWithOpenAi = async (content: string) => {
  const chatCompletion = await openAi.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `${content}`,
      },
    ],
    model: AI_MODEL,
  });
  return chatCompletion.choices[0].message.content!;
};

export const getParsedTicketAnalysis = async (
  content: string,
  prompt: string,
) => {
  const chatCompletion = await openAi.beta.chat.completions.parse({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: `${content}` },
      { role: 'user', content: `${prompt}` },
    ],
    response_format: zodResponseFormat(TicketAnalysisSchema, 'ticketAnalysis'),
  });
  return chatCompletion.choices[0].message.parsed!;
};
