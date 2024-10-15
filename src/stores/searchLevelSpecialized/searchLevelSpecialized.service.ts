import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'
import type {SearchModel,IdModel, ResultIdModel} from './searchLevelSpecialized.type'
const url = `${SITE_ADMIN}/searchLevelSpecialized`

export const getListData = (data: SearchModel) => {
    return http.post(url + '/list', data)
} 

export const getListMajor = (deptCd: String) => {
    return http.post(url + '/listMajor', deptCd)
} 

export const getDetail = (data: IdModel) => {
    return http.post(url + '/detail', data)
} 

export const getListResult = (data: ResultIdModel) => {
    return http.post(url + '/result', data)
} 

export const getListExcel = (data: SearchModel) => {
    return http.post(url + '/excel', data)
} 