import http from '@/utils/http'
import type {DocRoomSearchModel, DocRoomCreModel, DocIdModel } from './docRoom.type'
const url = "/a/docRoom"
export const fetchData = (data: DocRoomSearchModel) => {
    return http.post(`${url}/`, data)
}
export const saveData = (data: DocRoomCreModel) => {
    return http.post(`${url}/create`, data)
}
export const findById = (data: DocIdModel) => {
    return http.post(`${url}/detail`, data)
}
export const editData = (data: DocRoomCreModel) => {
    return http.post(`${url}/update`, data)
}