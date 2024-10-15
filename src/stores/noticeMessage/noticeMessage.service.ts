import http from "@/utils/http"
import type { NotiMessCreModel, SearchModel, SearchStudentModel, NoticeIdModel } from "./noticeMessage.type"

const url = '/a/allimTalk'

export const listData = (data: SearchModel) => {
    return http.post(`${url}/`, data);
}

export const listStudent = (data: SearchStudentModel) => {
    return http.post(`${url}/studentNoti`, data);
}

export const insertData = (data: NotiMessCreModel) => {
    return http.post(`${url}/create`, data);
}

export const getDetailNotice = (data: NoticeIdModel) => {
    return http.post(`${url}/detailNoti`, data);
}