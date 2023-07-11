import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_ID = "GET_VIDEOGAMES_BY_ID";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const POST_VIDEOGAMES = "POST_VIDEOGAMES";

export const getVideogames = () => {
    try {
return async (dispatch) => {
    const {data} = await axios.get("http://localhost:3001/videogames")
    console.log(data);
    return dispatch ({
        type: GET_VIDEOGAMES,
        payload: data,
    })
};
// eslint-disable-next-line
    } catch (error) {
console.log(error);
    }};

    export const getVideogamesById = (id) => {
        try {
    return async (dispatch) => {
        const {data} = await axios.get(`http://localhost:3001/videogames/${id}`)
        console.log(data);
        return dispatch ({
            type: GET_VIDEOGAMES_BY_ID,
            payload: data,
        })
    };
    
    // eslint-disable-next-line
        } catch (error) {
    console.log(error);
        }};



    export const getVideogamesByName = (name) => {
        try {
    return async (dispatch) => {
        const {data} = await axios.get(`http://localhost:3001/videogames/name=${name}`)
        return dispatch ({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: data,
        });
    };
// eslint-disable-next-line
        } catch (error) {
            alert("Videogame Not Found")
            console.log(error);
        }};

        // export const addGame = (game) => {
        //     try {
        //       const endpoint = "http://localhost:3001/videogames";
        //       return async (dispatch) => {
        //         const {data} = await axios.post(endpoint, character);
        //         return dispatch({
        //           type:POST_VIDEOGAMES  ,
        //           payload: data,
        //         });
        //       };
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };

