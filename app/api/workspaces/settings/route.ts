import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { updateWorkspaceConfig } from '@/services/serverSide/workspace';
import { WorkspaceConfig } from '@/utils/dataTypes';

const UpdateRequestBody = z.object({
  emailChannel: z
    .object({
      primaryEmail: createStringSchema('primaryEmail', {
        email: true,
      }).optional(),
    })
    .optional(),
  webhooks: z
    .object({
      contactRefresh: createStringSchema('contactRefresh', {
        url: true,
      }).optional(),
    })
    .optional(),
  timeZone: createStringSchema('timeZone').optional(),
  startTime: createStringSchema('startTime').optional(),
  endTime: createStringSchema('endTime').optional(),
});

export const PUT = withWorkspaceAuth(async (req) => {
  try {
    const requestBody: Partial<WorkspaceConfig> = await parseAndValidateRequest(
      req,
      UpdateRequestBody,
    );

    const updatedWorkspaceConfig = await updateWorkspaceConfig(
      req.workspace.id,
      requestBody,
    );

    return Response.json(updatedWorkspaceConfig, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
