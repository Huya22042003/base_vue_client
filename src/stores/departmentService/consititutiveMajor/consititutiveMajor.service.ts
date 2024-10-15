import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { ChldCapaReqDTO, DataSearch } from "./consititutiveMajor.type"

const url = `${SITE_ADMIN}/consititutive-major`
export const getListData = (searchForm: DataSearch) => {
    return http.post(url + '/list', searchForm)
} 

export const getListForm = () => {
    return http.get(url + '/list-form')
} 

export const detailById = (id: string) => {
    return http.post(url + '/detail', id)
}

export const update = (data: ChldCapaReqDTO) => {
    return http.put(url + '/update', data)
}

export const checkDelete = (id: string) => {
    return http.post(url + `/check-delete`, id)
}
