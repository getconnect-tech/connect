import OpenAI from 'openai';

const openAiAPIStr = process.env.OPENAI_API_KEY;
const AI_MODEL = 'gpt-4o';

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
