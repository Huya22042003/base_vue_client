import http from "@/utils/http";
import type {TrackId, TrackCre, SearchSubject, PageableModel} from "./trackMng.type"
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/track`

export const insert = (data: TrackCre) => {
    return http.post(`${url}/`, data);
}

export const list = (data: PageableModel) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: TrackId) => {
    return http.post(`${url}/detail`, data);
}

export const edit = (data: TrackCre) => {
    return http.put(`${url}/`, data);
}

export const listSubject = (data: SearchSubject) => {
    return http.post(`${url}/listSubject`, data);
}

