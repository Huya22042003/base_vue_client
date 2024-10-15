import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { TalenReportModel, } from "./talentReport.type"

const url = `${SITE_ADMIN}/talentReport`
export const getListData = (data: TalenReportModel) => {
    return http.post(url + '/', data)
}

export const getListExcel = () => {
    return http.post(url + '/list')
}
