import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { deleteLabelById, updateLabel } from '@/services/serverSide/label';
import { nameSchema } from '@/lib/zod/common';
import { iconSchema, colorSchema } from '@/lib/zod/label';

const RequestBody = z.object({
  name: nameSchema.optional(),
  icon: iconSchema.optional(),
  color: colorSchema.optional(),
});
export const PUT = withWorkspaceAuth(async (req, { labelId }) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const labelUpdates = requestBody as z.infer<typeof RequestBody>;

    const updatedLabel = await updateLabel(labelId, labelUpdates);

    return Response.json(updatedLabel, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const DELETE = withWorkspaceAuth(async (req, { labelId }) => {
  try {
    const deleltedLabel = await deleteLabelById(labelId);

    return Response.json(deleltedLabel, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
