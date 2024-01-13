import * as crypto from 'crypto';

export function generateUniqueUuid(): string {
  return crypto.randomUUID();
}
