import { defineStore } from "pinia";
import { ref } from "vue";
import type { SubjectProfileSearchModel,SubjectProfileResponseModel } from "./subjectProfile.type";
import { getListData } from "./subjectProfile.service";
import {MESSAGE_ERROR_API} from '@/constants/common.const'
export const subjectProfileStore = defineStore('subjectProfileStore', () => { 

    const subjectProfileResponse = ref<[]>([])
    const status = ref<number>()
    const totalRecord = ref<number>()

    const getAllData = async (params: SubjectProfileSearchModel) => {
        try {
            const response = await getListData(params)
            subjectProfileResponse.value = response.data.data.content
            totalRecord.value = response.data.data.totalElements
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    return {
        getAllData,
        subjectProfileResponse,
        status,
        totalRecord
    }
})