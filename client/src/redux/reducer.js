import {
GET_VIDEOGAMES,
GET_VIDEOGAMES_DETAIL,
FILTER_BY_ORIGIN,
FILTER_BY_GENRES,
ORDER_BY_NAME,
GET_VIDEOGAMES_BY_NAME,
GET_GENRES,
ORDER_BY_RATING,
RESET,
CLEAN_DETAIL_STATE,
POST_VIDEOGAMES
} from "./actions"

let initialState = {
videogames: [],
allVideogames: [], // copia de videojuegos
detail: {},
genres: [],
filteredVideogames: [],
platforms: []

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
     // console.log(action.payload);
     let platforms = [];
     action.payload.map((e)=>(platforms = [...platforms, ...e.platforms]));
        return {
            ...state, 
            videogames: action.payload,
            allVideogames: action.payload,
        platforms: Array.from(new Set(platforms))
        }
     case GET_VIDEOGAMES_DETAIL:
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload
      }
      case CLEAN_DETAIL_STATE :
        return {
          ...state,
          detail: action.payload 

        }
       case GET_VIDEOGAMES_BY_NAME:
        //console.log(action.payload)
        return {
          ...state,
          videogames: action.payload
        } 
        case GET_GENRES: 
        console.log(action.payload);
        return {
          ...state,
         genres: action.payload,
        }
        case FILTER_BY_GENRES:
          const selectedGenre = action.payload;
          if (selectedGenre === "") {
            return {
              ...state,
              filteredVideogames: state.videogames,
            };
          } else {
            const filteredVideogames = state.videogames.filter((game) =>
            game.genres.includes(selectedGenre)
            );
      
              return {
                  ...state,
                  filteredVideogames: filteredVideogames,
                };
          }
      case ORDER_BY_NAME:
      let ordenados;

      if (action.payload === "Ascendente") {
        ordenados = state.allVideogames.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
      } else {
        ordenados = state.allVideogames.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1));
      }
     return {
      ...state,
        videogames: [...ordenados],
     }
     case ORDER_BY_RATING:
      let orden;
      if (action.payload === "Ascendente") {
        orden = state.videogames.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      } else {
        orden = state.videogames.sort((a, b) => (b.rating > a.rating ? 1 : -1));
      }
     return {
      ...state,
        videogames: [...orden],
     }
     case POST_VIDEOGAMES:
        return { 
          ...state,
          videogames: [...state.videogames, action.payload]
        }
     case RESET:
      return {
        ...state,
        videogames: state.allVideogames,
      }
      case FILTER_BY_ORIGIN:
      const allStateVideoGames = state.allVideogames;
      const originFilter = action.payload === "Db" ? allStateVideoGames.filter(el=> el.createdInDb): allStateVideoGames.filter(el => !el.createdInDb)
      return {
        ...state,
        videogames: action.payload === "All Videogames" ? state.allVideogames : originFilter

      }
      default:
    return {...state}

  }}
