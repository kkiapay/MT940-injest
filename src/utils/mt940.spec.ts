import { mt940Parser } from './index';

describe('MT940', () => {
  describe('parser', () => {
    it('should return "undefined"', async () => {
      const statements = await mt940Parser('./src/mt940.txt');
      expect(statements).toEqual([]);
    });

    it('should return Statement[]', async () => {
      const statements = await mt940Parser('./src/utils/mt940.txt');
      expect(statements).toBeInstanceOf(Array);
      // TODO: check if statement is correct
    });
  });
});
