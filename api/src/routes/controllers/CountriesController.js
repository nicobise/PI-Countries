const { Activities, Countries } = require("../../db");

async function getAllCountries(req, res) {
  const { name } = req.query;
  try {
    const allCountries = await Countries.findAll({
      attributes: [
        "id",
        "name",
        "flag",
        "continent",
        "capital",
        "subregion",
        "area",
        "population"
      ],
      include: {
        model: Activities,
        attributes: ["name", "dificulty", "duration", "season"]
      }
    });
    if (!name) {
      allCountries.length
        ? res.status(200).send(allCountries)
        : res.status(404).json({ error: `Countries not found` });
    } else {
      const searchedCountry = allCountries.find(c => c.name === name);
      if (typeof searchedCountry !== "undefined") {
        res.status(200).send(searchedCountry);
      } else {
        res.status(404).json({ error: `Country ${name} not found` });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCountryById(req, res) {
  const { id } = req.params;
  try {
    const foundCountry = await Countries.findByPk(
      id,
      {
        include: {
          model: Activities,
          attributes: ["name", "dificulty", "duration", "season"]
        }
      }
    );
    if (!foundCountry)
      res.status(404).json({ error: `No country found by the id ${id}` });
    else {
      res.status(200).send({
        id: foundCountry.id,
        name: foundCountry.name,
        flag: foundCountry.flag,
        continent: foundCountry.continent,
        capital: foundCountry.capital,
        subregion: foundCountry.subregion,
        area: foundCountry.area,
        population: foundCountry.population,
        activities:
          foundCountry.activities &&
          foundCountry.activities.map(activity => ({
            name: activity.name,
            dificulty: activity.dificulty,
            duration: activity.duration,
            season: activity.season
          }))
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error in '/countries/:id' ${error}` });
  }
}

module.exports = { getAllCountries, getCountryById };