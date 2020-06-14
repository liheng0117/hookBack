import { FETCH_LOGIN_USER } from '@/constants/actionTypes'
const defaultState = {
  user: '',
}

export default function login(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return { ...state, user: action.payload.data }
    default:
      return state
  }
}
