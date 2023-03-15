import React from 'react';
import createCountryCard from './Card.jsx';
import style from './Cards.module.css'

export default function Cards({page, currentCountries}) {

const currentPage = currentCountries.slice(page, page + 10);

return (
<div className={style.cardsPositions}>
{currentPage.map(country => {
return createCountryCard({
id: country.id,
name: country.name,
flag_img: country.flag,
continent: country.continent || country.subregion
});
})}
</div>
);
}