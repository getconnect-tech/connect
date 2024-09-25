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

export const attachmentTokenSchema = z.string({
  required_error: "'attachmentToken' is required!",
  invalid_type_error: "'attachmentToken' must be of type string!",
});

export const attachmentSchema = z.object({
  filename: z.string({
    required_error: "'filename' is required!",
    invalid_type_error: "'filename' must be of type string!",
  }),
  url: z
    .string({
      required_error: "'url' is required!",
      invalid_type_error: "'url' must be of type string!",
    })
    .url(),
});

export const reactionSchema = z.string({
  required_error: "'reaction' is required!",
  invalid_type_error: "'reaction' must be of type string!",
});
