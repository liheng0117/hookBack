import { FETCH_REG_USER } from '@/constants/actionTypes'
import { post } from '@/utils/request'
import api from '@/services/api'

export function getReg(options) {
  return {
    type: FETCH_REG_USER,
    payload: post(api.regUrl, options),
  }
}
