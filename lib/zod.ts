import { NextRequest } from 'next/server';
import { z, ZodSchema } from 'zod';

export async function parseAndValidateRequest<T>(
  req: NextRequest,
  schema: ZodSchema<T>,
): Promise<T> {
  let body;

  if (req.headers.get('Content-Type')?.includes('multipart/form-data')) {
    const formData = await req.formData();
    body = Object.fromEntries(formData);
  } else {
    body = await req.json();
  }

  schema.parse(body); // Validate the request body against the schema
  return body as T;
}

export const createStringSchema = (
  field: string,
  options?: {
    email?: boolean;
    url?: boolean;
    datetime?: boolean;
    id?: boolean;
    regex?: RegExp;
    min?: number;
    max?: number;
  },
) => {
  let baseSchema = z.string({
    required_error: `'${field}' is required!`,
    invalid_type_error: `'${field}' must be of type string!`,
  });

  if (options?.email) {
    baseSchema = baseSchema.email({
      message: `'${field}' must be of type email!`,
    });
  }

  if (options?.url) {
    baseSchema = baseSchema.url({
      message: `'${field}' must be of type url!`,
    });
  }

  if (options?.datetime) {
    baseSchema = baseSchema.datetime({
      message: `'${field}' must be of type date-time!`,
    });
  }

  if (options?.id) {
    baseSchema = baseSchema.uuid({
      message: `'${field}' must be of type string!`,
    });
  }

  if (options?.regex) {
    baseSchema = baseSchema.regex(options.regex, `Invalid '${field}'!`);
  }

  if (typeof options?.min === 'number') {
    baseSchema = baseSchema.min(options.min, {
      message: `'${field}' must have atleast ${options.min} characters!`,
    });
  }

  if (typeof options?.max === 'number') {
    baseSchema = baseSchema.min(options.max, {
      message: `'${field}' can have max ${options.max} characters!`,
    });
  }

  return baseSchema;
};

export const createNumberSchema = (
  fieldName: string,
  options?: { min?: number; max?: number },
) => {
  let schema = z.number({
    required_error: `'${fieldName}' is required!`,
    invalid_type_error: `'${fieldName}' must be type of number!`,
  });

  if (typeof options?.min === 'number') {
    schema = schema.min(
      options.min,
      `'${fieldName}' must be greater or equal to ${options.min}!`,
    );
  }

  if (typeof options?.max === 'number') {
    schema = schema.min(
      options.max,
      `'${fieldName}' must be less or equal to ${options.max}!`,
    );
  }

  return schema;
};

export const customTraitsSchema = z.record(
  z.string({
    invalid_type_error: "Keys in 'customTraits' must be strings!",
  }),
  z.string({
    invalid_type_error: "Values in 'customTraits' must be strings!",
  }),
);

export const addressSchema = z.object({
  street: createStringSchema('street').optional(),
  city: createStringSchema('city').optional(),
  state: createStringSchema('state').optional(),
  country: createStringSchema('country').optional(),
  postal_code: createStringSchema('postal_code').optional(),
});

export function createEnumSchema<T extends z.EnumLike>(
  fieldName: string,
  enumLike: T,
) {
  return z.nativeEnum(enumLike, {
    required_error: `'${fieldName}' is required!`,
  });
}

export const createFileSchema = (
  fieldName: string,
  acceptedTypes: string[],
) => {
  return z
    .custom<File>()
    .refine((file: any) => !!file, `'${fieldName}' is required!`)
    .refine(
      (file: any) => file instanceof File,
      `'${fieldName}' must be of type File!`,
    )
    .refine(
      (file: File) => file && acceptedTypes.includes(file.type),
      `Only '${acceptedTypes.join(', ')}' formats are supported.`,
    );
};
