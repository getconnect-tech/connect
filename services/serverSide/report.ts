import {
  startOfDay,
  endOfDay,
  subDays,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { MessageType } from '@prisma/client';
import moment from 'moment-timezone';
import { prisma } from '@/prisma/prisma';
import { getWorkspaceConfig } from './workspace';

export interface FirstResponseTimeData {
  ticketId: string;
  firstResponseTime: number;
  date: string;
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

export interface ResolutionTimeResponse {
  data: Array<{
    date: string;
    median: number;
    totalTickets: number;
  }>;
  overallMedian: number;
  startDate: string;
  endDate: string;
}

function calculateMedianMinutes(
  ticketTime: Date,
  replyTime: Date,
  config: any,
) {
  if (!config && !config.startTime && !config.endTime && !config.timeZone) {
    return moment(replyTime).diff(moment(ticketTime), 'minutes');
  }

  const { startTime, endTime, timeZone } = config;

  let start = moment.tz(ticketTime, timeZone);
  const end = moment.tz(replyTime, timeZone);

  let totalMinutes = 0;

  while (start.isBefore(end)) {
    const officeStart = moment.tz(
      start.format('YYYY-MM-DD') + ' ' + startTime,
      'YYYY-MM-DD HH:mm',
      timeZone,
    );
    const officeEnd = moment.tz(
      start.format('YYYY-MM-DD') + ' ' + endTime,
      'YYYY-MM-DD HH:mm',
      timeZone,
    );

    const intervalStart = moment.max(start, officeStart);
    const intervalEnd = moment.min(end, officeEnd);

    if (intervalEnd.isAfter(intervalStart)) {
      totalMinutes += intervalEnd.diff(intervalStart, 'minutes');
    }

    // Move to next day at 00:00
    start = start.clone().add(1, 'day').startOf('day');
  }

  return totalMinutes;
}

const calculateMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
};

export const getFirstResponseTimeInsights = async (
  workspaceId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<FirstResponseTimeResponse> => {
  const effectiveEndDate = endDate ? new Date(endDate) : new Date();
  const effectiveStartDate = startDate
    ? new Date(startDate)
    : subDays(effectiveEndDate, 30);
  const workspaceConfig: any = await getWorkspaceConfig(workspaceId);
  if (!workspaceConfig) {
    throw new Error('Workspace configuration not found');
  }

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
        take: 1,
        orderBy: {
          created_at: 'asc',
        },
      },
    },
  });

  const responseTimesByDate = new Map<string, number[]>();
  const allResponseTimes: number[] = [];

  for (const ticket of tickets) {
    if (!ticket.messages[0]) continue;

    const dateStr = format(ticket.created_at, 'yyyy-MM-dd');

    const timeDiff = calculateMedianMinutes(
      ticket.created_at,
      ticket.messages[0].created_at,
      workspaceConfig,
    );
    const dateTimes = responseTimesByDate.get(dateStr) || [];
    dateTimes.push(timeDiff);
    responseTimesByDate.set(dateStr, dateTimes);
    allResponseTimes.push(timeDiff);
  }

  const dailyMedians = eachDayOfInterval({
    start: effectiveStartDate,
    end: effectiveEndDate,
  })
    .map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayTimes = responseTimesByDate.get(dayStr);

      if (!dayTimes?.length) return null;

      return {
        date: dayStr,
        median: calculateMedian(dayTimes),
        totalTickets: dayTimes.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return {
    data: dailyMedians,
    overallMedian: calculateMedian(allResponseTimes),
    startDate: effectiveStartDate.toISOString(),
    endDate: effectiveEndDate.toISOString(),
  };
};

export const getResolutionTimeInsights = async (
  workspaceId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<ResolutionTimeResponse> => {
  const effectiveEndDate = endDate ? new Date(endDate) : new Date();
  const effectiveStartDate = startDate
    ? new Date(startDate)
    : subDays(effectiveEndDate, 30);

  const workspaceConfig: any = await getWorkspaceConfig(workspaceId);

  if (!workspaceConfig) {
    throw new Error('Workspace configuration not found');
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      workspace_id: workspaceId,
      created_at: {
        gte: startOfDay(effectiveStartDate),
        lte: endOfDay(effectiveEndDate),
      },
      status: 'CLOSED',
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
    },
  });

  const resolutionTimesByDate = new Map<string, number[]>();
  const allResolutionTimes: number[] = [];

  for (const ticket of tickets) {
    const dateStr = format(ticket.created_at, 'yyyy-MM-dd');

    const timeDiff = calculateMedianMinutes(
      ticket.created_at,
      ticket.updated_at,
      workspaceConfig,
    );
    const dateTimes = resolutionTimesByDate.get(dateStr) || [];
    dateTimes.push(timeDiff);
    resolutionTimesByDate.set(dateStr, dateTimes);
    allResolutionTimes.push(timeDiff);
  }

  const dailyMedians = eachDayOfInterval({
    start: effectiveStartDate,
    end: effectiveEndDate,
  })
    .map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayTimes = resolutionTimesByDate.get(dayStr);

      if (!dayTimes?.length) return null;

      return {
        date: dayStr,
        median: calculateMedian(dayTimes),
        totalTickets: dayTimes.length,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return {
    data: dailyMedians,
    overallMedian: calculateMedian(allResolutionTimes),
    startDate: effectiveStartDate.toISOString(),
    endDate: effectiveEndDate.toISOString(),
  };
};
