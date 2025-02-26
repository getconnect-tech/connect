import { z } from 'zod';

export const taskNameSchema = z.string({
  required_error: "'taskName' is required!",
  invalid_type_error: "'taskName' must be of type string!",
});

export const taskDescriptionSchema = z.string({
  required_error: "'description' is required!",
  invalid_type_error: "'description' must be of type string!",
});

export const taskPrioritySchema = z.number({
  required_error: "'priority' is required!",
  invalid_type_error: "'priority' must be of type number!",
});

export const taskUsersSchema = z.array(z.string(), {
  required_error: "'taskUsers' is required!",
  invalid_type_error: "'taskUsers' must be of type array!",
});

export const taskFilesSchema = z.array(
  z.object({
    fileType: z.string(),
    href: z.string(),
    name: z.string(),
    size: z.string(),
  }),
  {
    required_error: "'files' is required!",
    invalid_type_error: "'files' must be of type array!",
  },
);
