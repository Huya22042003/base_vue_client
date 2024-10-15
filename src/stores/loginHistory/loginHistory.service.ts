import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { LoginHisSearchModel } from "./loginHistory.type"

const url = `${SITE_ADMIN}/loginHis`
export const getListData = (data: LoginHisSearchModel) => {
    return http.post(url + '/', data)
}

export const getListRole = () => {
    return http.post(url + '/role')
}
