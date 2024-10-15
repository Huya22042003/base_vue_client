import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EmpAbilitySearchModel, EmpAbiInitModel, EmpAbilityCreModel, EmpId } from "./empAbility.type"
import { listReg, insert, detailReg } from "./empAbility.service"
import { MESSAGE_ERROR_API } from "../../constants/common.const"

export const empAbilityStore = defineStore('eduCourse', () => {
    const empAbilityList = ref<EmpAbiInitModel[]>([])
    const status = ref<number>();
    const empAbility = ref<EmpAbiInitModel>()

    const listEmpAbility = async (data: EmpAbilitySearchModel) => {
        try {
            const response = await listReg(data)
            empAbilityList.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const createEmpAbility = async (data: EmpAbilityCreModel) => {
        try {
            const response = await insert(data)
            empAbilityList.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const detailEmpAbility = async (data: EmpId) => {
        try {
            const response = await detailReg(data)
            empAbilityList.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    return {
        empAbilityList,
        status,
        empAbility,

        listEmpAbility,
        createEmpAbility


    }
})


