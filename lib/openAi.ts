import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { TicketAnalysisSchema } from './zod/ticket';

const openAiAPIStr = process.env.OPENAI_API_KEY;
const AI_MODEL = 'gpt-4o-mini';

if (!openAiAPIStr) {
  throw new Error('Please define `OPENAI_API_KEY` in .env');
}
export const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
  systemMessage: string,
  messageData: string,
) => {
  const chatCompletion = await openAi.beta.chat.completions.parse({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: `${systemMessage}` },
      { role: 'user', content: `${messageData}` },
    ],
    response_format: zodResponseFormat(TicketAnalysisSchema, 'ticketAnalysis'),
  });
  return chatCompletion.choices[0].message.parsed!;
};
