import http from "@/utils/http"

import type { HisMenuAccessRequest } from "./historyMenuAccess.type"
import {SITE_ADMIN} from "../../constants/common.const";

const urlGetListHisMenuAccess = `${SITE_ADMIN}/menu-history/list`
export const getListHisMenuAccess = (data: HisMenuAccessRequest) => {
    return http.post(urlGetListHisMenuAccess, data)
}

const urlGetDataForDownloadExcel = `${SITE_ADMIN}/menu-history/list/for-excel`
export const getDataForDownloadExcel = (data: HisMenuAccessRequest) => {
    return http.post(urlGetDataForDownloadExcel, data)
}

