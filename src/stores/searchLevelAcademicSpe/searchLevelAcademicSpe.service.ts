import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'
import type {SearchModel,IdModel} from './searchLevelAcademicSpe.type'
const url = `${SITE_ADMIN}/searchLevelAcademic`

export const getListData = (data: SearchModel) => {
    return http.post(url + '/list', data)
} 

export const getListMajor = (deptCd: String) => {
    return http.post(url + '/listMajor', deptCd)
} 

export const getDetail = (data: IdModel) => {
    return http.post(url + '/detail', data)
} 

export const getDataChart = (data: IdModel) => {
    return http.post(url + '/chart', data)
} 

export const getListExcel = (data: SearchModel) => {
    return http.post(url + '/excel', data)
} 
