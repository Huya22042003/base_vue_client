import http from "@/utils/http"
import type { GoodTalentSearchModel } from "./goodTalentMng.type"
import { SITE_ADMIN } from "@/constants/common.const"

const url = `${SITE_ADMIN}/good-talent`
export const getList = (data: GoodTalentSearchModel) => {
    return http.post(url + '/list', data)
}