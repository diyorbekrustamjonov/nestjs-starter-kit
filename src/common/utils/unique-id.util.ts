import * as crypto from 'crypto';

export function generateUniqueUuid() {
    return crypto.randomUUID();
}
