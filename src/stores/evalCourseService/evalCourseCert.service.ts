import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { ApproveEvalCourseReqDTO, EducationCourseFilterDTO, EvalCourseCertFilter, EvalCourseOpinionFilterDTO, EvalCourseRegistDTO, RegistEduCourseApproveDTO } from "./evalCourseCert.type"

const url = `${SITE_ADMIN}/edu-course-cert`

export const getPageEvalCourseData = (searchForm: EvalCourseCertFilter) => {
    return http.post(url + '/page-eval-course', searchForm)
} 

export const getAllEducationCourse = (searchForm: EducationCourseFilterDTO) => {
    return http.post(url + '/page-education-course', searchForm)
} 

export const getEvalCourseOpinion = (searchForm: EvalCourseOpinionFilterDTO) => {
    return http.post(url + '/eval-course-opinion', searchForm)
} 

export const registerEvalCourse = (searchForm: EvalCourseRegistDTO) => {
    return http.post(url + '/register-eval-course', searchForm)
} 

export const evalCourseDetail = (searchForm: string) => {
    return http.post(url + '/register-eval-course-detail', searchForm)
} 

export const registerApproveEvalCourse = (searchForm: RegistEduCourseApproveDTO) => {
    return http.post(url + '/register-approve-eval-course', searchForm)
} 

export const registerRepeatApproveEvalCourse = (searchForm: RegistEduCourseApproveDTO) => {
    return http.post(url + '/register-repeat-approve-eval-course', searchForm)
} 

export const getPageApproveEvalCourse = (searchForm: EvalCourseCertFilter) => {
    return http.post(url + '/page-approve-eval-course', searchForm)
} 

export const getApproveDetail = (searchForm: string) => {
    return http.post(url + '/get-approve-detail', searchForm)
} 

export const approveTemporaryDetail = (searchForm: ApproveEvalCourseReqDTO) => {
    return http.post(url + '/approve-temporary-detail', searchForm)
} 

export const approveDetail = (searchForm: ApproveEvalCourseReqDTO) => {
    return http.post(url + '/approve-detail', searchForm)
} 
