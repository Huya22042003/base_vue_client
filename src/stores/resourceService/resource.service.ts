import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { ResourceRequestModel, ResourceSearchModel } from "./resource.type"

const url = `${SITE_ADMIN}/resources`
export const getListData = (searchForm: ResourceSearchModel) => {
    return http.post(url + '/list', searchForm)
}

export const detailById = (id: string) => {
    return http.post(url + '/', id)
}

export const create = (data: ResourceRequestModel) => {
    return http.post(url + '/create', data)
}

export const update = (data: ResourceRequestModel) => {
    return http.put(url + '/update', data)
}

export const updateDelete = (id: string) => {
    return http.delete(url + '/', {
        data: id
    })
}