import { QueryError } from '@/application/errors';

export const throwError = (message?: string): never => {
  throw new Error(message || 'any_message');
};

export const throwQueryError = (message?: string): never => {
  throw new QueryError(message || 'any_message');
};

export function randomIndex(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
