import { TeamSize } from '@prisma/client';
import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: "'email' is required!",
    invalid_type_error: "'email' must be of type string!",
  })
  .email();

export const displayNameSchema = z
  .string({
    required_error: "'displayName' is required!",
    invalid_type_error: "'displayName' must be of type string!",
  })
  .regex(/^[a-zA-Z ]{2,30}$/, 'Invalid displayName!');

export const nameSchema = z
  .string({
    required_error: "'name' is required!",
    invalid_type_error: "'name' must be of type string!",
  })
  .regex(/^[a-zA-Z ]{2,30}$/, 'Invalid name!');

export const profilePicSchema = z
  .string({
    required_error: "'profilePic' is required!",
    invalid_type_error: "'profilePic' must be of type string!",
  })
  .url();

export const teamSizeSchema = z.nativeEnum(TeamSize, { required_error: "'teamSize' is required!" });

export const industrySchema = z
  .string({
    required_error: "'industry' is required!",
    invalid_type_error: "'industry' must be of type string!",
  })
  .min(3, { message: "'industry' must have atleast 3 characters!" });

export const invitedUsersSchema = z.array(
  z.object({
    email: emailSchema,
    displayName: displayNameSchema,
  })
);
