import { defineStore } from "pinia"
import { ref } from "vue"
import type { AbilityTalentResponseModel, AbilityTalentSearchModel, TabAbilityGoodResponseModel } from "./abilityGoodMng.type"
import { findAbilityGood, getListTab } from "./abilityGoodMng.service"
import { MESSAGE_ERROR_API } from "@/constants/common.const"

export const abilityGoodTalentStore = defineStore("abilityGoodTalentStore", () => {
    const resultData = ref<AbilityTalentResponseModel[]>([])
    const resultListTab = ref<TabAbilityGoodResponseModel[]>([])
    const detailData = ref<AbilityTalentResponseModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const getList = async () => {
        try {
            const response = await getListTab()
            resultListTab.value = response.data.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    
    const searchGoodTalent = async (searchForm: AbilityTalentSearchModel) => {
        try {
            const response = await findAbilityGood(searchForm)
            resultData.value = response.data.data.content
            totalRecord.value =  response.data.data.totalElements
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    return {
        resultData,
        status,
        resultListTab,
        totalRecord,
        getList,
        searchGoodTalent
    }
})
