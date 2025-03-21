import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ZodSchema } from 'zod';
import { OPENAI_API_KEY } from '@/helpers/environment';

const AI_MODEL = 'gpt-4o-mini';

if (!OPENAI_API_KEY) {
  throw new Error('Please define `OPENAI_API_KEY` in .env');
}
export const openAi = new OpenAI({
  apiKey: OPENAI_API_KEY,
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

export const chatWithOpenAiForStructuredOutput = async (
  systemMessage: string,
  messageData: string,
  outputSchema: ZodSchema,
) => {
  const chatCompletion = await openAi.beta.chat.completions.parse({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: `${systemMessage}` },
      { role: 'user', content: `${messageData}` },
    ],
    response_format: zodResponseFormat(outputSchema, 'output_schema'),
  });
  return chatCompletion.choices[0].message.parsed!;
};
