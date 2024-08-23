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

export const imageUrlSchema = z
  .string({
    required_error: "'imageUrl' is required!",
    invalid_type_error: "'imageUrl' must be of type string!",
  })
  .url();

export const lastUpdatedTimeSchema = z
  .string({
    required_error: "'last_updated' is required!",
    invalid_type_error: "'last_updated' must be of type string!",
  })
  .date();
