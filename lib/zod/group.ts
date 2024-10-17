import { z } from 'zod';

export const groupLabelSchema = z.string({
  required_error: "'groupLabel' is required!",
  invalid_type_error: "'groupLabel' must be of type string!",
});

export const groupNameSchema = z.string({
  required_error: "'name' is required!",
  invalid_type_error: "'name' must be of type string!",
});
