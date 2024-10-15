import http from '@/utils/http'
import {SITE_ADMIN} from '@/constants/common.const'
import type {SearchModel,IdModel, ResultIdModel} from './searchLevelAbilityStudy.type'
const url = `${SITE_ADMIN}/searchLearnAbility`

export const getListData = (data: SearchModel) => {
    return http.post(url + '/list', data)
} 

export const getListLearnAbility = () => {
    return http.get(url + '/listLearnAbility')
} 

export const getDetail = (data: IdModel) => {
    return http.post(url + '/detail', data)
} 

export const getListResult = (data: ResultIdModel) => {
    return http.post(url + '/result', data)
} 