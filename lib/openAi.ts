import OpenAI from 'openai';

const openAiAPIStr = process.env.OPENAI_API_KEY;

if (!openAiAPIStr) {
  throw new Error('Please define `OPENAI_API_KEY` in .env');
}
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openAi;
