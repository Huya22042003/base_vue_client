import { SITE_ADMIN } from "@/constants/common.const";
import type { infoUni, infoUniSearch } from "./infoUniversity.type";
import http from "@/utils/http";

const url = `/${SITE_ADMIN}/info-university`;

export const getListDataInfo = (params: infoUniSearch) => {
    return http.post(url + '/list', params)
}

export const createInfoUni = (params: infoUni) =>{
    return http.post(url + '/', params)
}

export const detailById = (params: string) => {
    return http.post(url + '/detail', params)
}

export const updateInfoUni = (params: infoUni) => {
    return http.put(url + '/', params)
}

export const checkDelete = (params: string) => {
    return http.post(url + '/check', params)
}

export const deleteInfoUni = (params: string) => {
    return http.put(url + '/delete', params)
}