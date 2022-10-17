import { join } from 'path';
import { hashFile } from '../src/utils/hash';

describe('Test md5 hash function', () => {
  it('should return a valid md5 hash for the specified file path content', () => {
    const hash = hashFile(join(__dirname, 'file.txt'));
    console.log(hash);
    expect(hash.length).toBeGreaterThan(0);
  });
});
