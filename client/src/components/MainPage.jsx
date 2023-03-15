import style from './MainPage.module.css'
import Cards from './Cards'
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { retrieveCountriesData,filterCountriesByActivity,filterCountriesByContinent, sortByPopulation, sortByAlph } from '../redux/actions';

export default function MainPage() {
    const dispatch=useDispatch()
    const [page, setPage] = useState(0);

    const allCountries=useSelector(state=> state.allCountries)
    const allContinents=useSelector(state=>state.continents);
    let uniqueActivities = [];

    const currentCountries=useSelector(state=>state.countries)
    useEffect(()=>{
        dispatch(retrieveCountriesData());
    },[dispatch])

    function handleFilterByActivities(e){
        dispatch(filterCountriesByActivity(e.target.value))
        document.getElementById("continentsFilter").value = "All";
        setPage(0)
    }
    function handleFilterByContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        document.getElementById("activitiesFilter").value = "All";
        setPage(0)
    }
    function handleSortByAlph(e){
        dispatch(sortByAlph(e.target.value))
        setPage(0)
    }
    function handleSortByPop(e){
        dispatch(sortByPopulation(e.target.value))
        setPage(0)
    }


    function handleSubmit(event){
        event.preventDefault();
        const inputValue = event.target.elements.searchInput.value.toLowerCase();
        const country = allCountries.find(c => c.name.toLowerCase() === inputValue);
        if(country){
          window.location.href = `http://localhost:3000/country/${country.id}`;
        }
      }


    const handlePageChange = (action) => {
        if (action === "-" && page > 0) {
            setPage(prevPage => prevPage - 10);
        } else if (action === "+" && page < currentCountries.length - 10) {
            setPage(prevPage => prevPage + 10);
        }
    };

    allCountries.forEach(country => {
        country.activities.forEach(activity => {
          if(!uniqueActivities.includes(activity.name)){
            uniqueActivities.push(activity.name);
          }
        });
      })

    return (
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <input className={style.input} type="text" name="searchInput" id="search-input" autoComplete="off" placeholder="Search for the country of your dreams!"/>
                <button className={style.button} type="submit">Search</button>
            </form>

                <div className={style.optionsContainer}>
                <div className={style.options}>
                    <li className={style.list}>
                    <select onChange={handleFilterByActivities} id="activitiesFilter" name='activitiesFilter' className={style.optionsButton}>
                        <option value='All' >Filter by activity</option>
                        {uniqueActivities.length && uniqueActivities.map(activity => <option value={activity}>{activity}</option>)}
                    </select>
                    </li>
                    <li className={style.list}>
                    <select onChange={handleFilterByContinent} id="continentsFilter" name='continentsFilter' className={style.optionsButton}>
                        <option value='All' >Filter by Continent</option>
                        {  
                        allContinents.length&&allContinents.map(c=><option value={c}>{c}</option>)
                        }
                    </select>
                    </li>
                    <li className={style.list}>
                    <select
                        name='alphabetical order'
                        onChange={handleSortByAlph}
                        className={style.optionsButton}
                        value={'random'}
                        >
                        <option value='random' selected={true}>
                            Order alphabetically
                        </option>
                        <option value='AS' >
                            Ascending
                        </option>
                        <option value='DES' >
                            Descending
                        </option>
                        </select>
                        <select
                        name='population order'
                        onChange={handleSortByPop}
                        className={style.optionsButton}
                        value={'random'}
                        >
                        <option value='random' selected={true}>
                            Order by population
                        </option>
                        <option value='AS' >
                            Ascending
                        </option>
                        <option value='DES' >
                            Descending
                        </option>
                    </select>
                    </li>
                    <Link to={`/Form`} >
                        <button className={style.optionsButton}>Add activities</button>
                    </Link>
                    <button className={style.optionsButton} onClick={()=>{handlePageChange("-")}}>&lt;</button>
                    <button className={style.optionsButton} onClick={()=>{handlePageChange("+")}}>&gt;</button>
                </div>
                </div>

                <div className={style.card} id="card-container">
                <Cards page={page} currentCountries={currentCountries}></Cards>
                </div>
        </>
    )
    }