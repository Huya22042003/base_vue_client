import http from "@/utils/http"
import type { WiseTalentSearchModel } from "./wiseTalentmng.type"
import { SITE_ADMIN } from "@/constants/common.const"

const url = `${SITE_ADMIN}/wise-talent`
export const getList = (data: WiseTalentSearchModel) => {
    return http.post(url + '/list', data)
}