import {
  startOfDay,
  endOfDay,
  subDays,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { MessageType } from '@prisma/client';
import { prisma } from '@/prisma/prisma';

export interface FirstResponseTimeData {
  ticketId: string;
  firstResponseTime: number; // in minutes
  date: string; // ISO date string
}

export interface FirstResponseTimeResponse {
  data: Array<{
    date: string;
    median: number;
    totalTickets: number;
  }>;
  overallMedian: number;
  startDate: string;
  endDate: string;
}

/**
 * Calculate median first response time for tickets in a workspace, broken down by day
 * @param workspaceId - The ID of the workspace
 * @param startDate - Optional start date for the range (defaults to 30 days ago)
 * @param endDate - Optional end date for the range (defaults to today)
 * @returns Daily median first response times and overall median
 */
export const getFirstResponseTimeInsights = async (
  workspaceId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<FirstResponseTimeResponse> => {
  // Get the date range (default to last 30 days if not provided)
  const effectiveEndDate = endDate ? new Date(endDate) : new Date();
  const effectiveStartDate = startDate
    ? new Date(startDate)
    : subDays(effectiveEndDate, 30);

  // Get all tickets with their first agent response in the date range
  const tickets = await prisma.ticket.findMany({
    where: {
      workspace_id: workspaceId,
      created_at: {
        gte: startOfDay(effectiveStartDate),
        lte: endOfDay(effectiveEndDate),
      },
      messages: {
        some: {
          type: {
            in: [MessageType.REGULAR, MessageType.EMAIL],
          },
          author_id: {
            not: null,
          },
        },
      },
    },
    select: {
      id: true,
      created_at: true,
      messages: {
        where: {
          type: {
            in: [MessageType.REGULAR, MessageType.EMAIL],
          },
          author_id: {
            not: null,
          },
        },
        select: {
          created_at: true,
        },
        take: 1, // Only get the first agent message
        orderBy: {
          created_at: 'asc',
        },
      },
    },
  });

  // Group response times by date
  const responseTimesByDate = new Map<string, number[]>();
  const allResponseTimes: number[] = [];

  for (const ticket of tickets) {
    if (!ticket.messages[0]) continue;

    const dateStr = format(ticket.created_at, 'yyyy-MM-dd');
    const timeDiff = Math.round(
      (ticket.messages[0].created_at.getTime() - ticket.created_at.getTime()) /
        (1000 * 60),
    );

    // Add to date-specific array
    const dateTimes = responseTimesByDate.get(dateStr) || [];
    dateTimes.push(timeDiff);
    responseTimesByDate.set(dateStr, dateTimes);

    // Add to overall array
    allResponseTimes.push(timeDiff);
  }

  // Calculate daily medians
  const dailyMedians: Array<{
    date: string;
    median: number;
    totalTickets: number;
  }> = [];
  const allDays = eachDayOfInterval({
    start: effectiveStartDate,
    end: effectiveEndDate,
  });

  for (const day of allDays) {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayTimes = responseTimesByDate.get(dayStr);

    if (dayTimes && dayTimes.length > 0) {
      const sortedTimes = [...dayTimes].sort((a, b) => a - b);
      const middle = Math.floor(sortedTimes.length / 2);
      const median =
        sortedTimes.length % 2 === 0
          ? (sortedTimes[middle - 1] + sortedTimes[middle]) / 2
          : sortedTimes[middle];

      dailyMedians.push({
        date: dayStr,
        median: median || 0,
        totalTickets: dayTimes.length,
      });
    }
  }

  // Calculate overall median
  const sortedAllTimes = allResponseTimes.sort((a, b) => a - b);
  const middle = Math.floor(sortedAllTimes.length / 2);
  const overallMedian =
    sortedAllTimes.length % 2 === 0
      ? (sortedAllTimes[middle - 1] + sortedAllTimes[middle]) / 2
      : sortedAllTimes[middle];

  return {
    data: dailyMedians,
    overallMedian: overallMedian || 0,
    startDate: effectiveStartDate.toISOString(),
    endDate: effectiveEndDate.toISOString(),
  };
};
