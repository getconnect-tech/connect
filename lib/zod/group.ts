import { z } from 'zod';

export const groupLabelSchema = z.string({
  required_error: "'groupLabel' is required!",
  invalid_type_error: "'groupLabel' must be of type string!",
});
