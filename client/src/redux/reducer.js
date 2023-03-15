import { SORT_BY_POPULATION, SORT_BY_ALPH, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, POST_ACTIVITY, SEARCH_COUNTRY_BY_NAME, SEARCH_COUNTRY_BY_ID, SEARCH_ALL_COUNTRIES } from "./actions";

const initialState = {
    allCountries: [],
    countries: [],
    continents:['Antarctic','Americas','Asia','Africa','Europe','Oceania'],
    activities:[],
  };
  
  export function countryReducer(state = initialState, action) {
    switch (action.type) {
      case SEARCH_ALL_COUNTRIES:
        return {
          ...state,
          allCountries: action.payload,
          countries: action.payload,
        };
      case SEARCH_COUNTRY_BY_NAME:
        return {
          ...state,
          countries: action.payload
        };
      case SEARCH_COUNTRY_BY_ID:
        return {
          ...state,
          countries: action.payload
        };
      case POST_ACTIVITY:
        return {
          ...state,
          activities: [...state.activities,action.payload]
        };
        case FILTER_BY_ACTIVITY:{
          return{
              ...state,
              countries:action.payload==='All'?state.allCountries:state.allCountries.filter(c=>c.activities.find(a=>a.name===action.payload))
              
          }           
      }
      case FILTER_BY_CONTINENT:{
        return{
            ...state,
            countries:action.payload==='All'?state.allCountries:state.allCountries.filter(c=>c.continent===action.payload)
        }
    }
    case SORT_BY_POPULATION:{
      const aux = [...state.countries]
      var countriesInOrder=[...state.countries]
      if(action.payload==='AS'){
        countriesInOrder=aux.sort((a,b)=>{
          if(a.population>b.population) return 1
          if(a.population<b.population) return -1
          return 0
        });
      }
      if (action.payload==='DES'){
        countriesInOrder=aux.sort((a,b)=>{
          if(a.population>b.population) return -1
          if(a.population<b.population) return 1
          return 0
        });
      
      }
 
    return{
        ...state,
        countries: countriesInOrder
    }
    }
    case SORT_BY_ALPH:{
      const aux = [...state.countries]
      const countriesInOrder=action.payload==='AS'?aux.sort((a,b)=>{
        if(a.name>b.name) return 1
        if(a.name<b.name) return -1
        return 0
    }):aux.sort((a,b)=>{
        if(a.name>b.name) return -1
        if(a.name<b.name) return 1
        return 0
    })
    return{
        ...state,
        countries: countriesInOrder
    }
    }

      default:
        return state;
    }
  }