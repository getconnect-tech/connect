import { GENDER } from '@prisma/client';
import { z } from 'zod';

export const addressSchema = z.object({
  street: z
    .string({
      invalid_type_error: "'street' must be a string!",
    })
    .optional(),
  city: z
    .string({
      invalid_type_error: "'city' must be a string!",
    })
    .optional(),
  state: z
    .string({
      invalid_type_error: "'state' must be a string!",
    })
    .optional(),
  country: z
    .string({
      invalid_type_error: "'country' must be a string!",
    })
    .optional(),
  postal_code: z
    .string({
      invalid_type_error: "'postal_code' must be a string!",
    })
    .optional(),
});

export const customTraitsSchema = z.record(
  z.string({
    invalid_type_error: "Keys in 'customTraits' must be strings!",
  }),
  z.string({
    invalid_type_error: "Values in 'customTraits' must be strings!",
  }),
);

export const ageSchema = z
  .number({
    invalid_type_error: "'age' must be of type number!",
  })
  .gt(1, { message: "'age' must be greater than 1!" });

export const avatarSchema = z.string({
  invalid_type_error: "'avatar' must be of type string!",
});

export const birthdaySchema = z
  .string({
    invalid_type_error: "'birthday' must be of type string!",
  })
  .datetime({ message: "'birthday' must be a valid datetime string!" });

export const descriptionSchema = z.string({
  invalid_type_error: "'description' must be of type string!",
});

export const firstNameSchema = z.string({
  invalid_type_error: "'firstName' must be of type string!",
});

export const lastNameSchema = z.string({
  invalid_type_error: "'lastName' must be of type string!",
});

export const genderSchema = z.nativeEnum(GENDER, {
  invalid_type_error: "'gender' must be a valid enum value!",
});

export const phoneSchema = z.string({
  invalid_type_error: "'phone' must be of type string!",
});

export const titleSchema = z.string({
  invalid_type_error: "'title' must be of type string!",
});

export const usernameSchema = z.string({
  invalid_type_error: "'username' must be of type string!",
});

export const websiteSchema = z
  .string({
    invalid_type_error: "'website' must be of type string!",
  })
  .url({ message: "'website' must be a valid URL!" });

export const contactIdsSchema = z.array(
  z.string({
    required_error: "'contactIds' is required!",
    invalid_type_error: "'contactIds' must be of type string!",
  }),
);

export const contactNameSchema = z.string({
  required_error: "'name' is required!",
  invalid_type_error: "'name' must be of type string!",
});
