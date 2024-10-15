import http from "@/utils/http";
import type {ProfCreModel, ProfIdModel, PageableModel} from "./profLearn.type"
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/profLearn`

export const insert = (data: ProfCreModel) => {
    return http.post(`${url}/`, data);
}

export const list = (data: PageableModel) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: ProfIdModel) => {
    return http.post(`${url}/detail`, data);
}

export const edit = (data: ProfCreModel) => {
    return http.put(`${url}/`, data);
}

export const deletePro = (data: ProfIdModel) => {
    return http.post(`${url}/delete`, data);
}

