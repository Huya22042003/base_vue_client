import { SITE_ADMIN } from "@/constants/common.const"
import http from "@/utils/http"
import type { MeetReportEduFilterDTO, MeetReportEduReqDTO, SelectListFilterDTO } from "./meettingReportEdu.type"

const url = `${SITE_ADMIN}/meet-report-edu`
export const getListForm = () => {
    return http.get(url + '/list-form')
}

export const getListData = (searchForm: MeetReportEduFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const getDetailData = (docSeq: String) => {
    return http.post(url + '/detail', docSeq)
} 

export const getListSelect = (searchForm: SelectListFilterDTO) => {
    return http.post(url + '/popup-list-select', searchForm)
} 

export const create = (data: MeetReportEduReqDTO) => {
    return http.post(url + '/create', data)
} 

export const update = (data: MeetReportEduReqDTO) => {
    return http.put(url + '/update', data)
} 

export const updateDeleteFlag = (docSeq: String) => {
    return http.put(url + '/delete', docSeq)
} 