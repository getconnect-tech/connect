import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { nameSchema } from '@/lib/zod/common';
import { colorSchema, iconSchema } from '@/lib/zod/label';
import { createLabel } from '@/services/serverSide/label';

const RequestBody = z.object({
  name: nameSchema,
  icon: iconSchema,
  color: colorSchema.optional(),
});
export const POST = withWorkspaceAuth(async (req) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const workspaceId = req.workspace.id;
    const newLabelPayload = requestBody as z.infer<typeof RequestBody>;

    const newLabel = await createLabel({ workspaceId, ...newLabelPayload });

    return Response.json(newLabel, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
