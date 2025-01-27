'use server';

export async function getTeamcampCredential() {
  const apiKey = process.env.TEAMCAMP_API_KEY;
  const projectId = process.env.TEAMCAMP_PROJECT_ID;

  return !!(typeof apiKey === 'string' && typeof projectId === 'string');
}
