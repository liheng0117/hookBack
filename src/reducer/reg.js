import { FETCH_REG_USER } from '@/constants/actionTypes'
const defaultState = {}

export default function reg(state = defaultState, action) {
  switch (action.type) {
    case FETCH_REG_USER:
      return action.payload
    default:
      return state
  }
}
