import http from "@/utils/http"
import type { BestTalentSearchModel } from "./bestTalentMng.type"
import { SITE_ADMIN } from "@/constants/common.const"

const url = `${SITE_ADMIN}/best-talent`
export const getList = (data: BestTalentSearchModel) => {
    return http.post(url + '/list', data)
}