import http from "@/utils/http"

import { SITE_STAFF } from "@/constants/common.const"

const url = `${SITE_STAFF}/dashboard`

export const getDashboardStaff = () => {
    return http.post(url);
}
