import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'
import type {SearchModel,IdModel, ResultIdModel} from './searchLevelCoreCapacity.type'
const url = `${SITE_ADMIN}/searchImprovement`

export const getListData = (data: SearchModel) => {
    return http.post(url + '/list', data)
} 

export const getListCore = () => {
    return http.get(url + '/listCore')
} 

export const getDetail = (data: IdModel) => {
    return http.post(url + '/detail', data)
} 

export const getListResult = (data: ResultIdModel) => {
    return http.post(url + '/result', data)
}