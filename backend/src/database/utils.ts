import { db } from './connection';
import { randomUUID } from 'crypto';

// Generic database utility functions

/**
 * Generate a unique ID for database records
 */
export const generateId = (): string => {
  return randomUUID();
};

/**
 * Execute a transaction with automatic rollback on error
 */
export const executeTransaction = <T>(callback: () => T): T => {
  const transaction = db.transaction(callback);
  return transaction();
};

/**
 * Get current timestamp in ISO format
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Paginate query results
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const paginate = <T>(
  query: string,
  params: any[] = [],
  options: PaginationOptions = {}
): PaginatedResult<T> => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM (${query})`;
  const countResult = db.prepare(countQuery).get(params) as { count: number };
  const total = countResult.count;

  // Get paginated data
  const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
  const data = db.prepare(paginatedQuery).all([...params, limit, offset]) as T[];

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Escape SQL LIKE patterns
 */
export const escapeLikePattern = (pattern: string): string => {
  return pattern.replace(/[%_\\]/g, '\\$&');
};

/**
 * Build search conditions for multiple fields
 */
export const buildSearchConditions = (
  searchTerm: string,
  fields: string[]
): { condition: string; params: string[] } => {
  if (!searchTerm.trim()) {
    return { condition: '1=1', params: [] };
  }

  const escapedTerm = `%${escapeLikePattern(searchTerm.trim())}%`;
  const conditions = fields.map(field => `${field} LIKE ? ESCAPE '\\'`);
  const params = new Array(fields.length).fill(escapedTerm);

  return {
    condition: `(${conditions.join(' OR ')})`,
    params,
  };
};