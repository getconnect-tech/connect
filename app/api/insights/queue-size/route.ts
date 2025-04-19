import { z } from 'zod';
import { NextResponse } from 'next/server';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { handleApiError } from '@/helpers/errorHandler';
import { getQueueSizeInsights } from '@/services/serverSide/insights';
import { createStringSchema } from '@/lib/zod';

// Query parameters schema
const QuerySchema = z.object({
  startDate: createStringSchema('startDate', { datetime: true }).optional(),
  endDate: createStringSchema('endDate', { datetime: true }).optional(),
});

// GET /api/insights/queue-size
export const GET = withWorkspaceAuth(async (req) => {
  try {
    // Validate query parameters
    const searchParams = req.nextUrl.searchParams;
    const queryParams = {
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
    };

    await QuerySchema.parseAsync(queryParams);

    const queueSizeData = await getQueueSizeInsights(
      req.workspace.id,
      queryParams.startDate ? new Date(queryParams.startDate) : undefined,
      queryParams.endDate ? new Date(queryParams.endDate) : undefined,
    );

    return NextResponse.json(queueSizeData);
  } catch (err) {
    return handleApiError(err);
  }
});
