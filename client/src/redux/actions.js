import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"; //FUNCIONA
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME"; //FUNCIONA
export const ORDER_BY_NAME = "ORDER_BY_NAME"; // FUNCIONA
export const ORDER_BY_RATING = "ORDER_BY_RATING"; // FUNCIONA
export const RESET = "RESET"; //FUNCIONA
export const GET_VIDEOGAMES_DETAIL = "GET_VIDEOGAMES_DETAIL"; // FUNCIONA
export const CLEAN_DETAIL_STATE = "CLEAN_DETAIL_STATE"; // FUNCIONA
export const POST_VIDEOGAMES = "POST_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"

export const getVideogames = () => {
    try {
        return async (dispatch) => {
            const response = await axios.get("http://localhost:3001/videogames")
            //console.log(response);
            return dispatch ({
                type: GET_VIDEOGAMES,
                payload: response.data,
            })
        };
        // eslint-disable-next-line
    } catch (error) {
        console.log(error);
    }};
    export const getVideogamesByName = (name) => {
        try {
            return async (dispatch) => {
                const response = await axios.get(`http://localhost:3001/videogames/?name=${name}`)
    
                //console.log(response);
                return dispatch ({
                    type: GET_VIDEOGAMES_BY_NAME,
                    payload: response.data
                });
            };
            // eslint-disable-next-line
        } catch (error) {
            alert("Videogame Not Found")
            console.log(error);
        }};
    
    export const getGenres = () => {
    try {
        return async (dispatch) => {
            const response = await axios.get("http://localhost:3001/genres")
        console.log(response);
            return dispatch ({
                type: GET_GENRES,
                payload: response.data,
            })
        };
        // eslint-disable-next-line
    } catch (error) {
        console.log(error);
    }};
    
    export const getVideogamesDetail = (id) => {
        try {
            return async (dispatch) => {
                const response = await axios.get(`http://localhost:3001/videogames/${id}`)
                //console.log(response)
                return dispatch ({
                    type: GET_VIDEOGAMES_DETAIL,
                    payload: response.data,
                })
            };
            
            // eslint-disable-next-line
        } catch (error) {
            console.log(error);
        }};
        
    export function cleanDetail(){
        return {
            type: CLEAN_DETAIL_STATE,
            payload: []
        }
    }
        
    export function postVideogames(payload) {
        return async function(dispatch) {
          try {
            const response = await axios.post("http://localhost:3001/videogames", payload);
            dispatch({ type: POST_VIDEOGAMES, payload: response.data });
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
      }
        export const filterByGenres = (payload) => {
            return {
                type: FILTER_BY_GENRES,
                payload
            }
        }
        export function filterGameByOrigin(payload) {
            return { 
                type: FILTER_BY_ORIGIN,
                payload
            }
        }
        export const orderByRating = (rating) => {
            return {
                type: ORDER_BY_RATING,
                payload: rating
            }
        }
        export const orderByName = (name) => {
            return {
                type: ORDER_BY_NAME,
                payload: name
            }
        }
        export const resetVideogames = () => {
            return {
                type: RESET,
            }
        }

