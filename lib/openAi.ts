import OpenAI from 'openai';

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openAi;
