import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { EvalDetailFilter, EvalFactorReqDTO, EvalReasonRejectReqDTO, EvalReportMngFilterDTO } from "./manageAssessmentReports.type"

const url = `${SITE_ADMIN}/slf-eval-report`

export const getAllPage = (searchForm: EvalReportMngFilterDTO) => {
    return http.post(url + '/page-mng', searchForm)
} 

export const detailEvalReport = (searchForm: EvalDetailFilter) => {
    return http.post(url + '/detail-eval', searchForm)
} 

export const saveEvalReport = (searchForm: EvalFactorReqDTO) => {
    return http.post(url + '/save-eval-report', searchForm)
} 

export const temporarySaveEvalReport = (searchForm: EvalFactorReqDTO) => {
    return http.post(url + '/temporary-save-eval', searchForm)
} 
// save -> under investigation
export const underInvestigation = (searchForm: EvalDetailFilter) => {
    return http.post(url + '/under-investigation', searchForm)
} 

export const reasonRejectEval = (searchForm: Object) => {
    return http.post(url + '/reason-reject-eval', searchForm)
} 

export const getPageApproveReport = (searchForm: EvalReportMngFilterDTO) => {
    return http.post(url + '/get-approve-report', searchForm)
} 

export const approveEval = (searchForm: string) => {
    return http.post(url + '/approve-eval', searchForm)
} 

export const approveEvalAll = (searchForm: Array<string>) => {
    return http.post(url + '/approve-eval-all', searchForm)
} 

export const rejectEval = (searchForm: EvalReasonRejectReqDTO) => {
    return http.post(url + '/reject-eval', searchForm)
} 
