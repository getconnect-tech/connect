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

  if (typeof error === 'string') {
    errMessage = error;
  }

  return NextResponse.json({ error: errMessage }, { status: statusCode });
};
