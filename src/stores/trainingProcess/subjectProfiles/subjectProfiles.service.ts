import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { SubProfileSearchModel, } from "./subjectProfiles.type"

const url = `${SITE_ADMIN}/couProfile`
export const getListData = (data: SubProfileSearchModel) => {
    return http.post(url + '/', data)
}

export const getListExcel = () => {
    return http.post(url + '/list')
}
