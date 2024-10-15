import http from "@/utils/http"

import {SITE_STAFF} from '@/constants/common.const'
import type { CapstoneRequestDTO, HyflexRequestDTO, SelectSubjectFilterDTO, SubjectCertFilterDTO } from "./approvedSubjectsStaff.type";

const url = `${SITE_STAFF}/subject-cert-approve`;

export const getPageSelectSubject = (data: SelectSubjectFilterDTO) => {
    return http.post(url + '/select-subject', data)
}

export const registerSubject = (data: string) => {
    return http.post(url + '/register-subject', data)
}

export const getSubjectCert = (data: SubjectCertFilterDTO) => {
    return http.post(url + '/subject-cert', data)
}

export const getDetailCapstone = (data: string) => {
    return http.post(url + '/detail-capstone', data)
}

export const registerCapstone = (data: CapstoneRequestDTO) => {
    return http.post(url + '/register-capstone', data)
}

export const getDetailHyflex = (data: string) => {
    return http.post(url + '/detail-hyflex', data)
}

export const registerHyflex = (data: HyflexRequestDTO) => {
    return http.post(url + '/register-hyflex', data)
}

export const getReasonRejectStaff = (data: string) => {
    return http.post(url + '/get-reason-reject', data)
}