import type { TeachingScheduleModel, TeachingScheduleReqModel ,TeachingScheduleSearchModel} from './TeachingSchedule.type'
import { fetchData, fetchSetupScheduleAll,fetchSetupSchedule} from './TeachingSchedule.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {MESSAGE_ERROR_API} from '@/constants/common.const'
export const TeachingScheduleStore = defineStore('TeachingSchedule', () => {

    const teachingScheduleData = ref<TeachingScheduleModel[]>([])
    const teachingSchedule = ref<TeachingScheduleModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const fetchDataModel = async (params: TeachingScheduleSearchModel) => {
        try {
            const response = await fetchData(params)
            teachingScheduleData.value = response.data.data
            totalRecord.value = response.data.data.totalElements
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupScheduleAll = async (params: TeachingScheduleReqModel) => {
        try {
            const response = await fetchSetupScheduleAll(params)
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupSchedule = async (params: TeachingScheduleReqModel) => {
        try {
            const response = await fetchSetupSchedule(params)
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    return {
        fetchDataModel,
        setupScheduleAll,
        setupSchedule,
        status,
        teachingScheduleData,
        teachingSchedule,
        totalRecord
    }
})
