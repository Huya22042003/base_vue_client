import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'

const url = `${SITE_ADMIN}/menus`
export const getList = async <T>(query?: any) => {
  return await http.post<T>(`${url}`, query)
}