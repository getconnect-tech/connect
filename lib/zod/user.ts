import { z } from 'zod';
import { emailSchema } from './common';

export const displayNameSchema = z
  .string({
    required_error: "'displayName' is required!",
    invalid_type_error: "'displayName' must be of type string!",
  })
  .regex(/^[a-zA-Z ]{2,30}$/, 'Invalid displayName!');

export const profilePicSchema = z
  .string({
    required_error: "'profilePic' is required!",
    invalid_type_error: "'profilePic' must be of type string!",
  })
  .url();

export const invitedUsersSchema = z.array(
  z.object({
    email: emailSchema,
    displayName: displayNameSchema,
  }),
);
