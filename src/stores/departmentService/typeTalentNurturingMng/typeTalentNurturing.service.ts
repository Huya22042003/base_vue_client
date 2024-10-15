import http from "@/utils/http"
import type { TaltNrtgTypeFilterDTO, TaltNrtgTypeReqDTO } from "./typeTalentNurturing.type"

import {SITE_ADMIN} from '@/constants/common.const'

const url = `${SITE_ADMIN}/talt-nrtg-type`
export const getListData = (searchForm: TaltNrtgTypeFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const getListForm = () => {
    return http.get(url + '/list-form')
} 

export const detailById = (id: string) => {
    return http.post(url + '/detail', id)
}

export const create = (data: TaltNrtgTypeReqDTO) => {
    return http.post(url + '/create', data)
} 

export const update = (data: TaltNrtgTypeReqDTO) => {
    return http.put(url + '/update', data)
}

export const deleteTail = (id: string) => {
    return http.post(url +  `/delete`, id)
}

export const checkJobDelete = (id: string) => {
    return http.post(url + `/check-delete-job`, id)
}