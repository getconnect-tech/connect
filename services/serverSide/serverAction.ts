'use server';

import { TEAMCAMP_API_KEY, TEAMCAMP_PROJECT_ID } from '@/helpers/environment';

export async function getTeamcampCredential() {
  const apiKey = TEAMCAMP_API_KEY;
  const projectId = TEAMCAMP_PROJECT_ID;

  return typeof apiKey === 'string' && typeof projectId === 'string'
    ? { projectId }
    : null;
}
