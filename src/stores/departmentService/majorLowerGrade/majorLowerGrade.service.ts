import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { DeptInfoFilterDTO, MajorCapaReqDTO } from "./majorLowerGrade.type"

const url = `${SITE_ADMIN}/major-lower-grade`
export const getListData = (searchForm: DeptInfoFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const getListForm = () => {
    return http.get(url + '/list-form')
} 

export const detailById = (id: string) => {
    return http.post(url + '/detail', id)
}

export const update = (data: MajorCapaReqDTO) => {
    return http.put(url + '/update', data)
}

export const checkMajorDelete = (id: string) => {
    return http.post(url + `/check-delete-major`, id)
}

export const checkChldDelete = (id: string) => {
    return http.post(url + `/check-delete-lower-grade`, id)
}