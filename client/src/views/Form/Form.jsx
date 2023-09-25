import { useEffect, useState } from "react";
import style from '../Form/Form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, postVideogames } from "../../redux/actions";
import { Link } from "react-router-dom";

function validate(form) {
  let error = {};
  if (!form.name.trim()) {
    error.name = 'Enter a correct name';
  } else if (form.name.length > 30) {
    error.name = 'Name must be 30 characters or less';
  } else {
    const regex1 = /^[a-zA-Z0-9]+$/;
    if(!regex1.test(form.name.trim())) {
      error.name = 'Use only numbers and letters'
    }
  }
  if (!form.description.trim()) {
    error.description = 'Enter a correct description';
  }
  if (!form.released.trim()) {
    error.released = 'Enter a release date';
  } else {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(form.released.trim())) {
      error.released = 'You must enter in the format YYYY-MM-DD';
    }
  }
  if (form.rating === "" || form.rating < 1 || form.rating > 5) {
    error.rating = "Enter a rating";
  }
  if (!/^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|png|gif)$/i.test(form.image)) {
    error.image = 'Invalid image';
  }
  if (!form.genres.length) {
    error.genres = "Select one or more genres";
  }
  if (!form.platforms.length) {
    error.platforms = "Select one or more platforms";
  }
  return error;
}

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres); 
  const platforms = useSelector((state) => state.platforms);
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    platforms: [],
    genres: [],
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setError(validate({ ...form, [property]: value }));
  };

  function handleSelectGenres(event) {
    if(!form.genres.includes(event.target.value)){
    setForm({
      ...form,
      genres: [...form.genres, event.target.value], 
    });
    setError(
      validate({
        ...form,
        [event.target.name]: event.target.value, 
      })
    );
  }}
    //console.log(genres);
  function handleSelectPlatforms(e) {
    if(!form.platforms.includes(e.target.value)){
    setForm({
      ...form,
      platforms: [...form.platforms, e.target.value],
    });
    setError(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }}

  function handleRemoveGenre(index) {
    const newGenres = [...form.genres];
    newGenres.splice(index, 1);
    setForm({ ...form, genres: newGenres });
    setError(validate({ ...form, genres: newGenres })); 
  }

  function handleRemovePlatform(index) {
    const newPlatforms = [...form.platforms];
    newPlatforms.splice(index, 1);
    setForm({ ...form, platforms: newPlatforms });
    setError(validate({ ...form, platforms: newPlatforms }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length > 0) { 
      setError(errors);
      alert("Could not create the game")
    } else {
      dispatch(postVideogames(form));
      alert("The game was created successfully");
      setForm({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: [], 
      })
    }
  }
  
  return (
    <div className={style.formContainer}>
       <Link to="/home">
          <button>Go Back</button>
        </Link>
      

      <div className={style.formTitle}>
        <h1>CREATE YOUR VIDEOGAME</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className={style.credentials}>
          <label>Name: </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            className={style.input}
          />
          {error.name && <span>{error.name}</span>}
        </div>
        <div className={style.credentials}>
          <label>Description: </label>
          <input
          id="description"
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
            className={style.input}
          />
          {error.description && <span>{error.description}</span>}
        </div>
        <div className={style.credentials}>
          <label>Release Date: </label>
          <input
          id="released"
            type="text"
            value={form.released}
            onChange={changeHandler}
            name="released"
            className={style.input}
          />
          {error.released && <span>{error.released}</span>}
        </div>
        <div className={style.credentials}>
          <label>Rating: </label>
          <input
          id="rating"
            type="number"
            value={form.rating}
            onChange={changeHandler}
            name="rating"
            className={style.input}
          />
          {error.rating && <span>{error.rating}</span>}
        </div>
        <div className={style.credentials}>
          <label>Image URL: </label>
          <input
          id="image"
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
            className={style.input}
          />
          {error.image && <span>{error.image}</span>}
        </div>
        <div className={style.credentials}>
          <label>Genres: </label>
          <select onChange={handleSelectGenres} name="genres" id="genres">
            <option value="" disabled>
              Select one or more genres
            </option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <ul>
            {form.genres.map((genre) => (
              <li key={genre}>
                <div>{genre}</div>
                <button value={genre} onClick={() => handleRemoveGenre(genre)}>
                  x
                </button>
              </li>
            ))}
          </ul>
          {error.genres && <span>{error.genres}</span>}
        </div>
        <div className={style.credentials}>
          <label>Platforms: </label>
          <select onChange={handleSelectPlatforms} name="platforms">
            <option value="" disabled>
              Select one or more platforms
            </option>
            {platforms?.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </select>
          <ul>
            {form.platforms.map((e, index) => (
              <li key={index}>
                <div>{e + ""}</div>
                <button  value={e} onClick={() => handleRemovePlatform(index)}>
                  x
                </button>
              </li>
            ))}
          </ul>
          {error.platforms && <span>{error.platforms}</span>}
        </div>
          <button type="submit"> Create Videogame </button>
      </form>
    </div>
  );
}

export default Form;