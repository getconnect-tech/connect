import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const handleApiError = (error: any) => {
  let statusCode = 500;
  let errMessage = "";

  if (error instanceof Error) {
    errMessage = error.message;
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      statusCode = error.response.status;
      errMessage = error.response.data.error ?? error.response.data;
    }
  }

  if (typeof error === "string") {
    errMessage = error;
  }

  return NextResponse.json({ error: errMessage }, { status: statusCode });
};
