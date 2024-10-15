import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http"
import type { EduSearch, SchEduGoal } from "./talentAndGoals.type";
const url = `/${SITE_ADMIN}/sch-edu-goal`;

export const createSchEdu = (params: SchEduGoal) => {
    return http.post(url + '/', params)
}

export const detailById = (params: string) => {
    return http.post(url + '/detail', params)
}

export const updateSchEdu = (params: SchEduGoal) => {
    return http.put(url + '/', params)
}

export const getListData = (params: EduSearch) => {
    return http.post(url + '/list', params)
}

export const checkDelete = (params: string) => {
    return http.post(url + '/check', params)
}

export const deleteSchEdu = (params: string) => {
    return http.put(url + '/delete', params)
}