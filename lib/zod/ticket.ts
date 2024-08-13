import { PriorityLevels, TicketSource, TicketStatus } from '@prisma/client';
import { z } from 'zod';

export const titleSchema = z.string({
  required_error: "'title' is required!",
  invalid_type_error: "'title' must be of type string!",
});

export const assginToSchema = z
  .string({
    required_error: "'assignedTo' is required!",
    invalid_type_error: "'assignedTo' must be of type string!",
  })
  .uuid("'assignedTo' must an uuid of the user!");

export const contactIdSchema = z
  .string({
    required_error: "'contactId' is required!",
    invalid_type_error: "'contactId' must be of type string!",
  })
  .uuid("'contactId' must an uuid of the company!");

export const prioritySchema = z.nativeEnum(PriorityLevels, {
  required_error: "'priority' is required!",
});

export const ticketSourceSchema = z.nativeEnum(TicketSource, {
  required_error: "'source' is required!",
});

export const statusSchema = z.nativeEnum(TicketStatus, {
  required_error: "'status' is required!",
});

export const snoozeUntilSchema = z
  .string({
    required_error: "'snoozeUntil' is required!",
    invalid_type_error: "'snoozeUntil' must be of type string!",
  })
  .datetime({ message: 'Invalid date string!' });
