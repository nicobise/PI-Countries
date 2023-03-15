import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

export default function createCountryCard(countryData) {
return (
<Link to={`/country/${countryData.id}`} className={style.cardContainer} key={`${countryData.id}`}>
<div className={style.card}>
<div className={style.cardNameContainer}>
<h2 className={style.cardName}>{countryData.name || 'Missing data'}</h2>
</div>
<div className={style.imgContainer}>
<img className={style.cardImg} src={countryData.flag_img || 'Missing data'} alt={`Flag of ${countryData.name}` || 'Missing data'}/>
</div>
<div className={style.cardContinentContainer}>

<p className={style.cardContinent}>{countryData.continent || 'Missing data'}</p>

</div>
</div>
</Link>
);
}