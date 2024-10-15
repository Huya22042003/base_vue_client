import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { FormDetailUserFilterDTO, SocialIndividualFilterDTO, SocialResearchFilterDTO, SocialServeFilterDTO, SocialServeReqDTO } from "./volunteerActivities.type"

const url = `${SITE_ADMIN}/social-serve`

export const getPageVolunteer = (searchForm: SocialServeFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const createVolunteer = (searchForm: SocialServeReqDTO) => {
    return http.post(url + '/create', searchForm)
} 

export const updateVolunteer = (searchForm: SocialServeReqDTO) => {
    return http.put(url + '/update', searchForm)
} 

export const detailVolunteer = (id: String) => {
    return http.post(url + '/detail', id)
} 

export const deleteVolunteer = (id: String) => {
    return http.post(url + '/delete', id)
} 

export const getDetailUserRegist = (id: String) => {
    return http.post(url + '/detail-user-regist', id)
}

export const getFormDetailUser = (req: FormDetailUserFilterDTO) => {
    return http.post(url + '/get-page-user-regist', req)
}

export const getFormDetailUserAll = (req: FormDetailUserFilterDTO) => {
    return http.post(url + '/get-user-regist-all', req)
}

export const passUserDetail = (id: String) => {
    return http.post(url + '/pass-user', id)
}

export const failUserDetail = (id: String) => {
    return http.post(url + '/fail-user', id)
}

export const getPageResearch = (req: SocialResearchFilterDTO) => {
    return http.post(url + '/research', req)
}

export const getPageSocialIndividual = (req: SocialIndividualFilterDTO) => {
    return http.post(url + '/page-adjective', req)
}

export const getDetailIndividual = (req: string) => {
    return http.post(url + '/detail-adjective', req)
}

export const approveSocialIndividual = (req: string) => {
    return http.post(url + '/adjective-pass', req)
}

export const rejectSocialIndividual = (req: string) => {
    return http.post(url + '/adjective-fail', req)
}

export const countPer = (req: String) => {
    return http.post(url + '/countPer', req)
}