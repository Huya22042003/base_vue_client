import http from "@/utils/http"
import {SITE_STAFF} from '@/constants/common.const'
import type { StudentLectureDetailSearchModel, StudentLectureSearchModel } from "./studentLecture.type"

const url = `${SITE_STAFF}/student-lecture`
export const getListData = (searchForm: StudentLectureSearchModel) => {
    return http.post(url + '/list', searchForm)
} 

export const getListDetailData = (searchForm: StudentLectureDetailSearchModel) => {
    return http.post(url + '/detail', searchForm)
} 

export const getListEdu = () => {
    return http.get(url + '/select-box-edu')
} 

export const getListDept = () => {
    return http.get(url + '/select-box-dept')
} 

export const getListExcel = (id: string) => {
    return http.post(url + '/list-excel', id)
}