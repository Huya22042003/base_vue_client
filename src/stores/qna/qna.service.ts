import http from "@/utils/http";
import type {SearchModelQa, AnsModel} from "./qna.type"
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/qna`

export const list = (data: SearchModelQa) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: String) => {
    return http.post(`${url}/detail`, data);
}

export const createAns = (data: AnsModel) => {
    return http.post(`${url}/ans`, data);
}

export const editAns = (data: AnsModel) => {
    return http.put(`${url}/ans`, data);
}

