import { DECORATED_PREFIX } from './matic.constants';

export function getMaticToken(): string {
  return `${DECORATED_PREFIX}:Provider`;
}
