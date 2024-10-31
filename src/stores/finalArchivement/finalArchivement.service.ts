import http from '@/utils/http'
import type { FinalAchiSearchModel, LectInfoIdModel, UserJobModel } from './finalArchivement.type'
const url = "/a/final-achi"

export const fetchData = (data: FinalAchiSearchModel) => {
    return http.post(`${url}/`, data)
}

export const getDataDetail = (data: LectInfoIdModel) => {
    return http.post(`${url}/abil-eval-rlst`, data)
}
