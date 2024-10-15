import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { ActionIndexKsaFilterDTO, ActionIndexKsaReqDTO } from "./actionIndexKsa.type"

const url = `${SITE_ADMIN}/action-index-ksa`
export const getListData = (searchForm: ActionIndexKsaFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const getListForm = () => {
    return http.get(url + '/list-form')
} 

export const detailById = (id: string) => {
    return http.post(url + '/detail', id)
}

export const update = (data: ActionIndexKsaReqDTO) => {
    return http.put(url + '/update', data)
}

export const checkKsaDelete = (id: string) => {
    return http.post(url + `/check-delete-ksa`, id)
}

export const checkDelete = (id: string) => {
    return http.post(url + `/delete`, id)
}