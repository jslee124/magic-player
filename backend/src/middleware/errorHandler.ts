import { Request, Response, NextFunction } from 'express';
import { ApiResponse, ApiError as SharedApiError } from 'shared';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_ERROR';

  console.error(`Error ${statusCode}: ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  const response: ApiResponse<never> = {
    success: false,
    error: {
      code,
      message,
      ...(err.details && { details: err.details }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };
  
  res.status(statusCode).json(response);
};

// Helper function to create API errors
export const createApiError = (
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.code = code || 'API_ERROR';
  error.details = details;
  return error;
};
