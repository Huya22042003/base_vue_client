import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { ResourceRoleRequestModel, ResourceRoleResponseModel } from "./resourceRole.type";
import { createResourceRole, findResourceRoleById } from "./resourceRole.service";

export const resourceRoleStore = defineStore('resourceRoleStore', () => { 
    const resultResourceRole = ref<ResourceRoleResponseModel[]>([])
    const status = ref<number>()

    const findByRoleId = async (id: string) => {
        try {
            const res = await findResourceRoleById(id)
            resultResourceRole.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const createOrDeleteResourceRole = async (data: ResourceRoleRequestModel) => {
        try {
            const res = await createResourceRole(data)
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    return {
        resultResourceRole,
        status,
        findByRoleId,
        createOrDeleteResourceRole
    }
})