

function extractCountryData(apiResponse) {
    const countryData = {
        id: apiResponse.cca3,
        name: apiResponse.name?.common,
        flag_img: apiResponse.flags[1],
        continent: apiResponse.subregion,
        capital: apiResponse.capital[0],
        subregion: apiResponse.subregion,
        area: apiResponse.area,
        population: apiResponse.population
    };

    return countryData;
}

fetch('https://restcountries.com/v3/name/Argentina')
    .then(response => response.json())
    .then(data => {
        // you can now use the data received from the API

        extractCountryData(data[0])
    })
    .catch(error => {
        // handle errors here
        console.error('Error:', error);
    });

