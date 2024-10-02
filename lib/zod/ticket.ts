import { PriorityLevels, TicketStatus } from '@prisma/client';
import { z } from 'zod';

export const titleSchema = z.string({
  required_error: "'title' is required!",
  invalid_type_error: "'title' must be of type string!",
});

export const subjectSchema = z.string({
  required_error: "'subject' is required!",
  invalid_type_error: "'subject' must be of type string!",
});

export const messageSchema = z.string({
  required_error: "'message' is required!",
  invalid_type_error: "'message' must be of type string!",
});

export const senderNameSchema = z.string({
  required_error: "'senderName' is required!",
  invalid_type_error: "'senderName' must be of type string!",
});

export const senderEmailSchema = z
  .string({
    required_error: "'senderEmail' is required!",
    invalid_type_error: "'senderEmail' must be of type string!",
  })
  .email();

export const assignToSchema = z
  .string({
    required_error: "'assignedTo' is required!",
    invalid_type_error: "'assignedTo' must be of type string!",
  })
  .uuid("'assignedTo' must an uuid of the user!")
  .or(z.null());

export const prioritySchema = z.nativeEnum(PriorityLevels, {
  required_error: "'priority' is required!",
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

export const TicketAnalysisSchema = z.object({
  ticketSummary: z.string(),
  contactSentiment: z.string(),
});
