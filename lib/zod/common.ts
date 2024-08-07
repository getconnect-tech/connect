import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: "'email' is required!",
    invalid_type_error: "'email' must be of type string!",
  })
  .email();

export const nameSchema = z
  .string({
    required_error: "'name' is required!",
    invalid_type_error: "'name' must be of type string!",
  })
  .regex(/^[a-zA-Z ]{2,30}$/, 'Invalid name!');
