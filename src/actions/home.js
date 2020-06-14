import {
  FETCH_HOME_TAG,
  FETCH_HOME_KYES,
  FETCH_HOME_LIST,
  FETCH_HOME_ADD,
  FETCH_HOME_DEL,
  FETCH_HOME_UPDATE,
  FETCH_HOME_SEARCH,
} from '@/constants/actionTypes'
import { get, post } from '@/utils/request'
import api from '@/services/api'

export function getTag(options) {
  return {
    type: FETCH_HOME_TAG,
    payload: options,
  }
}
export function getRowKeys(options) {
  return {
    type: FETCH_HOME_KYES,
    payload: options,
  }
}
export function getList() {
  return {
    type: FETCH_HOME_LIST,
    payload: get(api.listUrl),
  }
}

export function addList(options) {
  return {
    type: FETCH_HOME_ADD,
    payload: post(api.addUrl, options),
  }
}

export function delList(options) {
  return {
    type: FETCH_HOME_DEL,
    payload: post(api.delUrl, options),
  }
}

export function updateList(options) {
  return {
    type: FETCH_HOME_UPDATE,
    payload: post(api.updateUrl, options),
  }
}
export function searchList(options) {
  return {
    type: FETCH_HOME_SEARCH,
    payload: get(`${api.searchUrl}${options}`),
  }
}
