import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createStringSchema } from '@/lib/zod';
import { getFirstResponseTimeInsights } from '@/services/serverSide/report';

const QueryParamsSchema = z.object({
  startDate: createStringSchema('startDate', { datetime: true }).optional(),
  endDate: createStringSchema('endDate', { datetime: true }).optional(),
});

export const GET = withWorkspaceAuth(async (req) => {
  try {
    // Get query parameters from URL
    const searchParams = req.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') ?? undefined;
    const endDate = searchParams.get('endDate') ?? undefined;

    // Validate query parameters
    const validatedParams = QueryParamsSchema.parse({
      startDate,
      endDate,
    });

    const insights = await getFirstResponseTimeInsights(
      req.workspace.id,
      validatedParams.startDate
        ? new Date(validatedParams.startDate)
        : undefined,
      validatedParams.endDate ? new Date(validatedParams.endDate) : undefined,
    );

    return Response.json(insights, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
