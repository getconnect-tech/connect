import { TicketStatus } from '@prisma/client';
import { startOfDay, endOfDay, subDays } from 'date-fns';
import { prisma } from '@/prisma/prisma';

export interface QueueSizeData {
  date: string;
  queueSize: number;
}

export interface QueueSizeResponse {
  data: QueueSizeData[];
  startDate: string;
  endDate: string;
}

/**
 * Get queue size insights for a workspace
 * @param workspaceId - The ID of the workspace
 * @param startDate - Optional start date for the range (defaults to 30 days ago)
 * @param endDate - Optional end date for the range (defaults to today)
 * @returns Queue size data for the specified date range
 */
export const getQueueSizeInsights = async (
  workspaceId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<QueueSizeResponse> => {
  // Get the date range (default to last 30 days if not provided)
  const effectiveEndDate = endDate ? new Date(endDate) : new Date();
  const effectiveStartDate = startDate
    ? new Date(startDate)
    : subDays(effectiveEndDate, 30);

  // Get all tickets in the date range
  const tickets = await prisma.ticket.findMany({
    where: {
      workspace_id: workspaceId,
      created_at: {
        gte: startOfDay(effectiveStartDate),
        lte: endOfDay(effectiveEndDate),
      },
    },
    select: {
      created_at: true,
      status: true,
      updated_at: true,
    },
  });

  // Create a map of dates and their queue sizes
  const queueSizeByDate = new Map<string, number>();

  // Initialize all dates in range with 0
  for (
    let d = new Date(effectiveStartDate);
    d <= effectiveEndDate;
    d.setDate(d.getDate() + 1)
  ) {
    queueSizeByDate.set(d.toISOString().split('T')[0], 0);
  }

  // Calculate queue size for each day
  tickets.forEach((ticket) => {
    // Increment count on ticket creation date
    const creationDate = ticket.created_at.toISOString().split('T')[0];
    queueSizeByDate.set(
      creationDate,
      (queueSizeByDate.get(creationDate) || 0) + 1,
    );

    // Decrement count on ticket closure date (if closed)
    if (ticket.status === TicketStatus.CLOSED) {
      const closureDate = ticket.updated_at.toISOString().split('T')[0];
      if (queueSizeByDate.has(closureDate)) {
        queueSizeByDate.set(
          closureDate,
          (queueSizeByDate.get(closureDate) || 0) - 1,
        );
      }
    }
  });

  // Calculate running total (cumulative sum)
  let runningTotal = 0;
  const queueSizeData = Array.from(queueSizeByDate.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, change]) => {
      runningTotal += change;
      return {
        date,
        queueSize: runningTotal,
      };
    });

  return {
    data: queueSizeData,
    startDate: effectiveStartDate.toISOString(),
    endDate: effectiveEndDate.toISOString(),
  };
};
