const { Countries, conn } = require('../../src/db.js');

describe('Country model', () => {
  beforeAll(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  });
  describe('Validators', () => {
    beforeEach(async () => {
      await Countries.sync({ force: true });
    });
    describe('Mandatory data', () => {
      it('should throw an error if name, id, flag, continent or capital are null', async () => {
        try {
          await Countries.create({});
          throw new Error('It requires a valid name, id, flag, continent and capital');
        } catch (err) {
          expect(err).toBeDefined();
        }
      });
      it('should work when its a valid name', async () => {
        await Countries.create({
          "id": "ARG",
          "name": "Argentina",
          "flag": "https://flagcdn.com/ar.svg",
          "continent": "Americas",
          "capital": "Buenos Aires",
          "subregion": "South America",
          "area": 2780400,
          "population": 45376763,
          "activities": [
            {
              "name": "kayacking",
              "dificulty": 4,
              "duration": 4,
              "season": "Summer"
            }
          ]
        });
      });
    });
  });
});
