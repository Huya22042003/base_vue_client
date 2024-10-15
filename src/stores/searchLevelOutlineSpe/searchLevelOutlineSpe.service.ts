import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'
import type {SearchModel,IdModel} from './searchLevelOutlineSpe.type'
const url = `${SITE_ADMIN}/searchLevelOutline`

export const getListData = (data: SearchModel) => {
    return http.post(url + '/list', data)
} 

export const getListLearnAbility = () => {
    return http.get(url + '/listLearnAbility')
} 

export const getDetail = (data: IdModel) => {
    return http.post(url + '/detail', data)
} 

export const getDataChart = (data: IdModel) => {
    return http.post(url + '/chart', data)
} 
