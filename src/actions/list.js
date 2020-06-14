import { FETCH_LIST_PAGE } from '@/constants/actionTypes'
import { post } from '@/utils/request'
import api from '@/services/api'

export function getList(options) {
  return {
    type: FETCH_LIST_PAGE,
    payload: post(api.pagesUrl, options),
  }
}
