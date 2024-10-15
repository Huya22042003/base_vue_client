import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { SearchData,LectRegModel } from "./LectureDesignSchedule.type"

const url = `${SITE_ADMIN}/lecturePlanWriteSchdl`

export const getListData = (data: SearchData) => {
    return http.post(url + '/list', data)
}

export const getDetailData = (data: String) => {
    return http.post(url + '/detail', data)
}

export const saveLectDetail = (data: LectRegModel) => {
    return http.post(url + '/saveDetail', data)
}

export const saveLectChecked = (data: LectRegModel) => {
    return http.post(url + '/saveChecked', data)
}

export const saveLectAll = (data: LectRegModel) => {
    return http.post(url + '/saveAll', data)
}
