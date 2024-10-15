import http from "@/utils/http"

import {SITE_STAFF} from '@/constants/common.const'
import type { AbilityWorkSearchDTO, AbilityWorkStdDTO, UserJobPerformEvalReqDTO } from "./abilityWorkStudent.type";

const url = `${SITE_STAFF}/ability-work`;

export const getSubjectInfo = (data: AbilityWorkStdDTO) => {
    return http.post(url + '/', data)
}

export const createUserJob = (data: UserJobPerformEvalReqDTO) => {
    return http.post(url + '/create', data)
}

export const getDetailUserJobPerform = (data: AbilityWorkStdDTO) => {
    return http.post(url + '/detail', data)
}

export const getList = (data: AbilityWorkSearchDTO) => {
    return http.post(url + '/list', data)
}