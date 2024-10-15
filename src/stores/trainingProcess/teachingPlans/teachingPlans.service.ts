import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { TeachingPlansModel } from "./teachingPlans.type"

const url = `${SITE_ADMIN}/lectPlanSearch`
export const getListData = (data: TeachingPlansModel) => {
    return http.post(url + '/', data)
}

export const getListExcel = () => {
    return http.post(url + '/list')
}

export const getEduYear = () => {
    return http.post(url + '/yearEdu')
}
