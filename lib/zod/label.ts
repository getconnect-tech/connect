import { z } from 'zod';

export const iconSchema = z.string({
  required_error: "'icon' is required!",
  invalid_type_error: "'icon' must be of type string!",
});

export const colorSchema = z.string({
  required_error: "'color' is required!",
  invalid_type_error: "'color' must be of type string!",
});
