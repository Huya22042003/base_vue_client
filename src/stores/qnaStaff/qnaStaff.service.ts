import http from "@/utils/http";
import type {QnaStaffCreModel, Pageable} from "./qnaStaff.type"
const url = `/p/qnaStaff`

export const list = (data: Pageable) => {
    return http.post(`${url}/list`, data);
}

export const getById = (data: String) => {
    return http.post(`${url}/detail`, data);
}

export const createQus = (data: QnaStaffCreModel) => {
    return http.post(`${url}/`, data);
}

export const editQus = (data: QnaStaffCreModel) => {
    return http.put(`${url}/`, data);
}

