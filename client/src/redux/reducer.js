import {GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID} from "./actions"

let initialState = {videogames: []};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
        return {
            ...state, 
            videogames: action.payload
        }
     case GET_VIDEOGAMES_BY_ID:
      return {
        ...state,
        videogames: action.payload
      } 
      default:
    return {...state};

  }}
