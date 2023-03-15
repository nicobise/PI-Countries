const request = require('supertest');
const app = require('../../src/app');
const { Countries, conn } = require('../../src/db');

const country = {
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
};

describe('Country routes', () => {
  beforeAll(async () => {
    await conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
  });

  beforeEach(async () => {
    await Countries.sync({ force: true });
    await Countries.create(country);
  });

  describe('GET /countries', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/countries');
      expect(response.statusCode).toBe(200);
    });
  });
});
