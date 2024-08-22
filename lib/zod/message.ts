import { MessageType } from '@prisma/client';
import { z } from 'zod';

export const contentSchema = z.string({
  required_error: "'content' is required!",
  invalid_type_error: "'content' must be of type string!",
});

export const messageTypeSchema = z.enum(
  [MessageType.REGULAR, MessageType.EMAIL],
  { required_error: "'type' is required!" },
);
