const {Countries} = require("../../../db");
const iconv = require('iconv-lite');

function buildCountry (country){
    return {
        id: country.cca3 || 'Missing data',
        name: country.name?.common || 'Missing data',
        flag: country.flags[0] || 'Missing data',
        continent: country.region || 'Missing data',
        capital: Array.isArray(country.capital) ? iconv.decode(Buffer.from(country.capital[0]), 'win1252') : 'Missing data',
        subregion: country.subregion || 'Missing data',
        area: Math.round(country.area) || 0,
        population: country.population || 0
        }
}

async function getCountriesFromApi(){
    const apiCountries = await fetch('https://restcountries.com/v3/all');
    const allCountries = await apiCountries.json();
    const countries = allCountries.map(c => buildCountry(c));
    const insertPromises = countries.map(country => Countries.create(country));
    await Promise.all(insertPromises).then(() => console.log('Database loaded'));
}

module.exports = {getCountriesFromApi,buildCountry};
