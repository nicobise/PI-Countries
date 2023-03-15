import style from "./Form.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { postActivity } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
  const dispatch = useDispatch();

  const allCountries=useSelector(state=>state.allCountries)

  const [formData, setFormData] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    country: []
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: Array.from(e.target.selectedOptions, option => option.value)
    });
  };

  const [error, setError] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    country: []
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const onlyLetters = /^[a-zA-Z\s]+$/;

    if (!formData.name.match(onlyLetters) && formData.name !== "") {
      setError({
        ...error,
        name: "Please limit the activitie name to letters. Numbers and special characters are not allowed"
      });
    } else {
      setError({
        name: formData.name === "" ? "Name is necessary" : "",
        dificulty: formData.dificulty === "" ? "Difficulty is necessary" : "",
        duration: formData.duration === "" ? "Duration is necessary" : "",
        season: formData.season === "" ? "Season is necessary" : "",
        country: formData.country === "" ? "Country is necessary" : ""
      });
    }

    if (
      formData.name !== "" &&
      formData.dificulty !== "" &&
      formData.duration !== "" &&
      formData.season !== "" &&
      formData.country.length !== 0 &&
      formData.name.match(onlyLetters)
    ) {
      try {
        formData.country.forEach(async country => {
          const countryData = { ...formData, country };
          await axios.post("http://localhost:3001/activities", countryData);
        });
      } catch (error) {
        console.error(error);
      }
      dispatch(postActivity(formData.name));
      alert('Activities Loaded!')
    }
  };


  return (
    <div>
      <Link to={`/mainpage`} >
        <button className={style.backButton}>Volver</button>
      </Link>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formPositions}>
          <h1>Complete all the fields and add your activitie!</h1>
          <label>
          Name:{" "}
            {error.name && (
              <span className={style.errorMessage}>{error.name}</span>
            )}
          </label>
            <input
              autoComplete="off"
              className={style.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          <br />
          <label>
            Difficulty (1-5):{" "}
              {error.dificulty && (
                <span className={style.errorMessage}>{error.dificulty}</span>
              )}
          </label>
            <input
              className={style.input}
              autoComplete="off"
              type="number"
              name="difficulty"
              min="1"
              max="5"
              value={formData.dificulty}
              onChange={(e) => setFormData({...formData, dificulty: e.target.value})}
            />
          <br />
          <label>
            Duration (in hs):{" "}
              {error.duration && (
                <span className={style.errorMessage}>{error.duration}</span>
              )}
          </label>
            <input
              autoComplete="off"
              className={style.input}
              type="number"
              name="duration"
              min="1"
              max="168"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
          <br />
          <label>
            Season:{" "}
              {error.season && (
                <span className={style.errorMessage}>{error.season}</span>
              )}
          </label>
          <div style={{width: "105%"}}>
            <select
              className={style.input}
              autoComplete="off"
              name="season"
              value={formData.season}
              onChange={(e) => setFormData({...formData, season: e.target.value})}
            >
              <option value=""></option>
              <option value="Winter">Winter</option>
              <option value="Summer">Summer</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autumn</option>
            </select>
          </div>
          <br />
          <label>
            Country:{" "}
              {error.country && (
                <span className={style.errorMessage}>{error.country}</span>
              )}
          </label>
          <select
            className={style.input}
            name="country"
            multiple
            value={formData.country}
            onChange={handleChange}
          >
            {allCountries.sort((a, b) => a.name.localeCompare(b.name)).map((country, idx) => (
              <option key={idx} value={country.name}>{country.name}</option>
            ))}
          </select>
          <br />
          <br />
        </div>
        <div className={style.buttonPosition}>
        <button type="submit" className={style.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}