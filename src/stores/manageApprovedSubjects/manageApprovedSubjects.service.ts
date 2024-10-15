import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { CapstoneDesignApproveDTO, CapstoneDesignFilerDTO, HyflexAlReqDTO, ReasonRejectDTO, SubjectApproveFilterResDTO } from "./manageApprovedSubjects.type";
import type { EvalCourseOpinionFilterDTO } from "../evalCourseService/evalCourseCert.type";

const url = `${SITE_ADMIN}/subject-approve`;

export const getPageSbjtCert = (data: SubjectApproveFilterResDTO) => {
    return http.post(url + '/page-subject-approve', data)
}

export const getReasonReject = (data: EvalCourseOpinionFilterDTO) => {
    return http.post(url + '/get-reason-reject', data)
}

export const getCapstoneDetail = (data: CapstoneDesignFilerDTO) => {
    return http.post(url + '/get-capstone-detail', data)
}

export const approveCapstone = (data: CapstoneDesignApproveDTO) => {
    return http.post(url + '/approve-capstone', data)
}

export const rejectCapstone = (data: CapstoneDesignApproveDTO) => {
    return http.post(url + '/reject-capstone', data)
}

export const approveCapstoneSecond = (data: CapstoneDesignApproveDTO) => {
    return http.post(url + '/approve-capstone-second', data)
}

export const rejectCapstoneSecond = (data: CapstoneDesignApproveDTO) => {
    return http.post(url + '/reject-capstone-second', data)
}

export const getHyflexAlResDetail = (data: CapstoneDesignFilerDTO) => {
    return http.post(url + '/hyflex-al-detail', data)
}

export const approveHyflexAl = (data: HyflexAlReqDTO) => {
    return http.post(url + '/approve-hyflex-al', data)
}

export const rejectHyflexAl = (data: ReasonRejectDTO) => {
    return http.post(url + '/reject-hyflex-al', data)
}
