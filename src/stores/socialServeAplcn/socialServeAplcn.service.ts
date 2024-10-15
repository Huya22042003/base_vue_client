import http from "@/utils/http"
import {SITE_STAFF} from '@/constants/common.const'
import type { SocialServeAplcnRequestModel, SocialServeAplcnSearchModel } from "./socialServeAplcn.type"

const url = `${SITE_STAFF}/social-activities`
export const getListData = (searchForm: SocialServeAplcnSearchModel) => {
    return http.post(url + '/list', searchForm)
} 
export const detailById = (id: string) => {
    return http.post(url + '/detail', id)
} 
export const register = (data: SocialServeAplcnRequestModel) => {
    return http.post(url + '/register', data)
} 
export const deleteById = (data: SocialServeAplcnRequestModel) => {
    return http.post(url + '/delete', data)
} 