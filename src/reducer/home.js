import {
  FETCH_HOME_TAG,
  FETCH_HOME_KYES,
  FETCH_HOME_LIST,
  FETCH_HOME_ADD,
  FETCH_HOME_DEL,
  FETCH_HOME_UPDATE,
  FETCH_HOME_SEARCH,
} from '@/constants/actionTypes'

const defaultState = {
  tagData: [],
  Rowkeys: [],
  data: [],
}

export default function home(state = defaultState, action) {
  switch (action.type) {
    case FETCH_HOME_TAG:
      return { ...state, tagData: action.payload }
    case FETCH_HOME_KYES:
      return { ...state, Rowkeys: action.payload }
    case FETCH_HOME_LIST:
      action.payload.users.forEach((v) => {
        v.key = v.id
      })
      return { ...state, data: action.payload.users }
    case FETCH_HOME_ADD:
      return action.payload
    case FETCH_HOME_DEL:
      return action.payload
    case FETCH_HOME_UPDATE:
      action.payload.data.forEach((v) => {
        v.key = v.id
      })
      return action.payload
    case FETCH_HOME_SEARCH:
      action.payload.users.forEach((v) => {
        v.key = v.id
      })
      return { ...state, data: action.payload.users }
    default:
      return state
  }
}
