import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { EducationSDLFilterDTO } from "./eudcationSDL.type"

const url = `${SITE_ADMIN}/sdl-education`

export const getPageEduSDL = (searchForm: EducationSDLFilterDTO) => {
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