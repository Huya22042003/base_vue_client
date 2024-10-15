import http from "@/utils/http";
import type {EvalCreModel, EvalIdModel, PageableModel} from "./evalMethod.type"
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/evalMethod`

export const insert = (data: EvalCreModel) => {
    return http.post(`${url}/`, data);
}

export const list = (data: PageableModel) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: EvalIdModel) => {
    return http.post(`${url}/detail`, data);
}

export const edit = (data: EvalCreModel) => {
    return http.put(`${url}/`, data);
}

export const deleteItem = (data: EvalIdModel) => {
    return http.post(`${url}/delete`, data);
}


