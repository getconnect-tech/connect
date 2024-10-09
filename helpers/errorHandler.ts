import { Prisma } from '@prisma/client';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { generateErrorMessage } from 'zod-error';

export const handleApiError = (error: any) => {
  let statusCode = 500;
  let errMessage = '';

  if (error instanceof Error) {
    errMessage = error.message;
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      statusCode = error.response.status;
      errMessage = error.response.data.error ?? error.response.data;
    }
  }

  if (error instanceof ZodError) {
    statusCode = 400;
    errMessage = generateErrorMessage(error.issues, {
      maxErrors: 1,
      path: {
        enabled: false,
      },
      code: {
        enabled: false,
      },
      message: {
        enabled: true,
        label: '',
      },
    });
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Customize error handling based on the Prisma error code
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        statusCode = 409;
        errMessage =
          'Unique constraint violation: A record with this value already exists.';
        break;
      case 'P2025': // Record not found
        statusCode = 404;
        errMessage =
          'Record not found: Unable to locate the requested resource.';
        break;
      default:
        statusCode = 400;
        errMessage = `Database error: ${error.message}`;
    }
  }

  if (typeof error === 'string') {
    errMessage = error;
  }

  return NextResponse.json({ error: errMessage }, { status: statusCode });
};
