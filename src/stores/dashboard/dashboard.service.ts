import http from "@/utils/http"

import {SITE_ADMIN} from '@/constants/common.const'
import type { DashboardFilterDTO } from "./dashboard.type"

const url = `${SITE_ADMIN}/dashboard`

export const getDashboardAdmin = (searchForm: DashboardFilterDTO) => {
    return http.post(url, searchForm)
}

export const getNoticeDashboard = (searchForm: DashboardFilterDTO) => {
    return http.post(url + '/notice', searchForm)
}

export const getFileBoardDashboard = (searchForm: DashboardFilterDTO) => {
    return http.post(url + '/file-board', searchForm)
}