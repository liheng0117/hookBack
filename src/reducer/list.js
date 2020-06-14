import { FETCH_LIST_PAGE } from '@/constants/actionTypes'
const defaultState = {
  listData: [],
}

export default function list(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LIST_PAGE:
      return { ...state, listData: action.payload.result.list }
    default:
      return state
  }
}
