import {
  startOfDay,
  endOfDay,
  subDays,
  eachDayOfInterval,
  format,
  addDays,
  isWithinInterval,
  setHours,
  setMinutes,
} from 'date-fns';
import { MessageType } from '@prisma/client';
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

const calculateBusinessMinutes = (
  start: Date,
  end: Date,
  officeStarttime: string,
  officeEndtime: string,
  officeTimeZone: string,
): number => {
  const [startHour, startMinute] = officeStarttime.split(':').map(Number);
  const [endHour, endMinute] = officeEndtime.split(':').map(Number);
  let totalMinutes = 0;

  // Convert start and end dates to office timezone
  const startInOfficeTZ = new Date(
    start.toLocaleString('en-US', { timeZone: officeTimeZone }),
  );
  const endInOfficeTZ = new Date(
    end.toLocaleString('en-US', { timeZone: officeTimeZone }),
  );

  let currentDate = new Date(startInOfficeTZ);

  while (currentDate < endInOfficeTZ) {
    const dayStart = setMinutes(setHours(currentDate, startHour), startMinute);
    const dayEnd = setMinutes(setHours(currentDate, endHour), endMinute);

    if (isWithinInterval(currentDate, { start: dayStart, end: dayEnd })) {
      const effectiveEnd = endInOfficeTZ < dayEnd ? endInOfficeTZ : dayEnd;
      const effectiveStart = currentDate > dayStart ? currentDate : dayStart;
      totalMinutes += Math.round(
        (effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60),
      );
    }

    currentDate = setMinutes(
      setHours(addDays(currentDate, 1), startHour),
      startMinute,
    );
  }

  return totalMinutes;
};

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

    const timeDiff =
      workspaceConfig?.startTime &&
      workspaceConfig?.endTime &&
      workspaceConfig?.timeZone
        ? calculateBusinessMinutes(
            ticket.created_at,
            ticket.messages[0].created_at,
            workspaceConfig.startTime,
            workspaceConfig.endTime,
            workspaceConfig.timeZone,
          )
        : Math.round(
            (ticket.messages[0].created_at.getTime() -
              ticket.created_at.getTime()) /
              (1000 * 60),
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
    const timeDiff =
      workspaceConfig?.startTime &&
      workspaceConfig?.endTime &&
      workspaceConfig?.timeZone
        ? calculateBusinessMinutes(
            ticket.created_at,
            ticket.updated_at,
            workspaceConfig.startTime,
            workspaceConfig.endTime,
            workspaceConfig.timeZone,
          )
        : Math.round(
            (ticket.updated_at.getTime() - ticket.created_at.getTime()) /
              (1000 * 60),
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
