import { PriorityLevels, TicketSource } from '@prisma/client';
import { z } from 'zod';

export const isValidTitle = z.string({
  required_error: "'title' is required!",
  invalid_type_error: "'title' must be of type string!",
});

export const isValidAssignTo = z
  .string({
    required_error: "'assignedTo' is required!",
    invalid_type_error: "'assignedTo' must be of type string!",
  })
  .uuid("'assignedTo' must an uuid of the user!");

export const isValidContactId = z
  .string({
    required_error: "'contactId' is required!",
    invalid_type_error: "'contactId' must be of type string!",
  })
  .uuid("'contactId' must an uuid of the company!");

export const isValidPriority = z.nativeEnum(PriorityLevels, {
  required_error: "'priority' is required!",
});

export const isValidTicketSource = z.nativeEnum(TicketSource, {
  required_error: "'source' is required!",
});

export const isValidSenderName = z.string({
  required_error: "'senderName' is required!",
  invalid_type_error: "'senderName' must be of type string!",
});

export const isValidSenderEmail = z
  .string({
    required_error: "'senderEmail' is required!",
    invalid_type_error: "'senderEmail' must be of type string!",
  })
  .email();
