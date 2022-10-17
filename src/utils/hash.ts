import { createHash } from 'crypto';
import { readFileSync } from 'fs';

/**
 *
 * @param path
 * @returns md5 hash for file content located at path
 */
export function hashFile(path: string) {
  const content = readFileSync(path, { encoding: 'utf-8' });
  return createHash('md5').update(content).digest('hex');
}
