import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { deleteLabelById, updateLabel } from '@/services/serverSide/label';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

const UpdateRequestBody = z.object({
  name: createStringSchema('name', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }).optional(),
  icon: createStringSchema('icon').optional(),
  color: createStringSchema('color').optional(),
});
export const PUT = withWorkspaceAuth(async (req, { labelId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    const updatedLabel = await updateLabel(labelId, requestBody);

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
