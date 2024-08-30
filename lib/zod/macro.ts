import { z } from 'zod';

export const titleSchema = z.string({
  required_error: "'title' is required!",
  invalid_type_error: "'title' must be of type string!",
});

export const contentSchema = z.string({
  required_error: "'content' is required!",
  invalid_type_error: "'content' must be of type string!",
});

export const createRequestBody = z.object({
  title: titleSchema,
  content: contentSchema,
});
