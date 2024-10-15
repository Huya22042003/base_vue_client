import http from "@/utils/http"
import {SITE_ADMIN} from '@/constants/common.const'
import type { MenuRequestModel, MenuSearchModel } from "./menu.type"

const url = `${SITE_ADMIN}/menu`
export const getListData = (searchForm: MenuSearchModel) => {
    return http.post(url + '/list', searchForm)
} 

export const detailById = (id: string) => {
    return http.post(url + '/', id)
}

export const create = (data: MenuRequestModel) => {
    return http.post(url + '/create', data)
} 

export const update = (data: MenuRequestModel) => {
    return http.put(url + '/update', data)
}

export const updateDelete = (id: string) => {
    return http.put(url +  `/`, id)
}

export const getListParent = (siteType: string) => {
    return http.post(url + `/list-parent`, siteType)
}

export const getCountOrder = (id: string)   => {
    return http.post(url + `/countOrder`, id)
}