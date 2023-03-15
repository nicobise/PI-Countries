export const SEARCH_ALL_COUNTRIES = "SEARCH_ALL_COUNTRIES"
export const SEARCH_COUNTRY_BY_NAME = "SEARCH_COUNTRY_BY_NAME";
export const SEARCH_COUNTRY_BY_ID = "SEARCH_COUNTRY_BY_ID";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const SORT_BY_ALPH = "SORT_BY_ALPH"
export const SORT_BY_POPULATION = "SORT_BY_POPULATION"

export const retrieveCountriesData = () => {
    console.log("toda la data")
    return function (dispatch) {
        fetch("http://localhost:3001/countries")
            .then(res => res.json())
            .then(data => dispatch({ type: SEARCH_ALL_COUNTRIES, payload: data }));
    }
}

export const searchCountryByName = (nameCountry) => {
    console.log("buscando pais por nombre")
    return function (dispatch) {
        fetch(`http://localhost:3001/countries?name=${nameCountry}`)
            .then(res => res.json())
            .then(data => dispatch({ type: SEARCH_COUNTRY_BY_NAME, payload: data }))
    }
}

export const searchCountryById = (id) => {
    console.log("buscando pais por id")
    return function (dispatch) {
        fetch(`http://localhost:3001/countries/${id}`)
            .then(res => res.json())
            .then(data => dispatch({ type: SEARCH_COUNTRY_BY_ID, payload: data }))
    }
}

export const postActivity = (activity) => {
    return function (dispatch) {
        dispatch({ type: POST_ACTIVITY, payload: activity });
    }
}

export const filterCountriesByActivity = (activity) => {
    return function (dispatch) {
        dispatch({ type: FILTER_BY_ACTIVITY, payload: activity });
    }
}

export const filterCountriesByContinent = (continent) => {
    return function (dispatch) {
        dispatch({ type: FILTER_BY_CONTINENT, payload: continent });
    }
}

export const sortByAlph = (method) => {
    return function (dispatch) {
        dispatch({type: SORT_BY_ALPH, payload: method})
    }
}

export const sortByPopulation = (method) => {
    return function (dispatch) {
        dispatch({type: SORT_BY_POPULATION, payload: method})
    }
}