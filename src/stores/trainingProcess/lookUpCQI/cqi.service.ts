import http from "@/utils/http"
import { SITE_ADMIN } from '@/constants/common.const'
import type { CqiSearchModel, CqiSeq } from "./cqi.type"


const url = `${SITE_ADMIN}/cqiSearch`
export const getListData = (data: CqiSearchModel) => {
    return http.post(url + '/', data)
}
