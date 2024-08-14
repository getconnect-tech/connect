import { TeamSize, UserRole } from '@prisma/client';
import { z } from 'zod';

export const teamSizeSchema = z.nativeEnum(TeamSize, {
  required_error: "'teamSize' is required!",
});

export const industrySchema = z
  .string({
    required_error: "'industry' is required!",
    invalid_type_error: "'industry' must be of type string!",
  })
  .min(3, { message: "'industry' must have atleast 3 characters!" });

export const roleSchema = z.nativeEnum(UserRole, {
  required_error: "'role' is required!",
});
