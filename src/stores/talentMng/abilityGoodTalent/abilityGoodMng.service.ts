import http from "@/utils/http"
import type { AbilityTalentSearchModel } from "./abilityGoodMng.type"
import { SITE_ADMIN } from "@/constants/common.const"

const url = `${SITE_ADMIN}/ability-good-talent`
export const getListTab = () => {
    return http.get(url + '/list-tab')
}

export const findAbilityGood = (data: AbilityTalentSearchModel) => {
    return http.post(url + '/list', data)
}