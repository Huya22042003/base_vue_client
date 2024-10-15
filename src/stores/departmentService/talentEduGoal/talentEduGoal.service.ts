import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { DeptEduGoalDetailFilterDTO, DeptEduGoalFilterDTO, DeptEduGoalReqDTO } from "./talentEduGoal.type"

const url = `${SITE_ADMIN}/dept-edu-goal`
export const getListData = (searchForm: DeptEduGoalFilterDTO) => {
    return http.post(url + '/list', searchForm)
} 

export const detailById = (searchForm: DeptEduGoalDetailFilterDTO) => {
    return http.post(url + '/detail', searchForm)
}

export const create = (data: DeptEduGoalReqDTO) => {
    return http.post(url + '/create', data)
} 

export const update = (data: DeptEduGoalReqDTO) => {
    return http.put(url + '/update', data)
}

export const checkDelete = (id: string) => {
    return http.post(url + `/check-delete`, id)
}