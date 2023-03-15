import { useParams } from 'react-router-dom';
import style from "./Detail.module.css"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Detail () {
    let { idPais } = useParams();
    const [country, setCountry] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const url = `http://localhost:3001/countries/${idPais}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setCountry(data);
                console.log(data)
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [idPais]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <Link to={`/mainpage`} >
                <button className={style.backButton}>Volver</button>
            </Link>
            <div className={style.layout}>
            <div className={style.infoblock}>
                <div className={style.info}>
                <img className={style.img} src={country.flag} alt={`flag of ${country.name}`}></img>
                    <h1 className={style.name}>{country.name}</h1>
                    <h2 className={style.data}>Continent: {country.continent}</h2>
                    <h2 className={style.data}>Capital: {country.capital}</h2>
                    <h2 className={style.data}>Subregion: {country.subregion}</h2>
                    <h2 className={style.data}>Area: {country.area}</h2>
                    <h2 className={style.data}>Population: {country.population}</h2>
                </div>
                </div>
                <div className={style.activityList}>
                    {country.activities.map(activity => (
                    <div className={style.activityCard}>
                        <h3 className={style.activityName}>{activity.name}</h3>
                        <h4 className={style.activityData}>Difficulty: {activity.dificulty}</h4>
                        <h4 className={style.activityData}>Duration: {activity.duration}</h4>
                        <h4 className={style.activityData}>Season: {activity.season}</h4>
                    </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}
