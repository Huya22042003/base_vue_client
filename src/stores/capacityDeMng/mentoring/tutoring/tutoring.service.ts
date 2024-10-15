import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { TutoringFilterDTO } from "./tutoring.type"

const url = `${SITE_ADMIN}/tutoring-education`

export const getPageTutoring = (searchForm: TutoringFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const getTeamInfo = (id: string) => {
    return http.post(url + '/detail-team', id)
}

export const getPlanInfo = (id: string) => {
    return http.post(url + '/detail-plan', id)
} 

export const getListReport = (id: string) => {
    return http.post(url + '/detail-report', id)
}

export const approveTutoring = (id: string) => {
    return http.post(url +  `/approve`, id)
}

export const rejectTutoring = (id: string) => {
    return http.post(url + `/reject`, id)
}

export const checkStatus = (id: string) => {
    return http.post(url + `/check-status`, id)
}