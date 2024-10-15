import http from "@/utils/http";
import type {EduCreModel, EduIdModel, PageableModel} from "./eduCourse.type"
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/eduCourseType`

export const insert = (data: EduCreModel) => {
    return http.post(`${url}/`, data);
}

export const list = (data: PageableModel) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: EduIdModel) => {
    return http.post(`${url}/detail`, data);
}

export const edit = (data: EduCreModel) => {
    return http.put(`${url}/`, data);
}

export const deleteData = (data: EduIdModel) => {
    return http.post(`${url}/delete`, data);
}


