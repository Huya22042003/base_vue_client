import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { getListData } from "./roleResource.service";
import { defineStore } from "pinia";
import type { RoleResponseModel, RoleSearchModel } from "./roleResource.type";
import { ref } from "vue";

export const roleResourceStore = defineStore('roleResourceStore', () => {
    const status = ref<number>()
    const resultData = ref<RoleResponseModel[]>([])
    const totalRecord = ref<number>()

const getListRole = async (params: RoleSearchModel) => {
    try {
        const res = await getListData(params)
        resultData.value = res.data.data.content
        totalRecord.value = res.data.data.totalElements
        status.value = res.status
    } catch (e) {
        throw new Error(MESSAGE_ERROR_API);
    }
}
return {
    status,
    resultData,
    totalRecord,
    getListRole
}
})