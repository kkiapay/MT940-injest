import * as fs from 'fs';
import { Statement } from './interfaces';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mt940js = require('mt940js');
const parser = new mt940js.Parser();

/**
 *
 * @param path
 * @returns
 */
export async function mt940Parser(path: string): Promise<Statement[]> {
  // if path not found, return empty array
  if (!fs.existsSync(path)) {
    return [];
  }
  const statements = await parser.parse(fs.readFileSync(path, 'utf8'));
  return statements;
}
