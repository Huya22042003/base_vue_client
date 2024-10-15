import type { NewEducationScheduleSearchModel, NewEducationScheduleModel ,NewEducationScheduleReqModel} from './NewEducationSchedule.type'
import { fetchData, fetchSetupScheduleAll,fetchSetupSchedule} from './NewEducationSchedule.service'
import {MESSAGE_ERROR_API} from '@/constants/common.const'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const NewEducationScheduleStore = defineStore('NewEducationSchedule', () => {

    const newEducationScheduleData = ref<NewEducationScheduleModel[]>([])
    const newEducationSchedule = ref<NewEducationScheduleModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const fetchDataModel = async (params: NewEducationScheduleSearchModel) => {
        try {
            const response = await fetchData(params)
            newEducationScheduleData.value = response.data.data
            totalRecord.value = response.data.data.totalElements
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupScheduleAll = async (params: NewEducationScheduleReqModel) => {
        try {
            const response = await fetchSetupScheduleAll(params)
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupSchedule = async (params: NewEducationScheduleReqModel) => {
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
        newEducationScheduleData,
        newEducationSchedule,
        totalRecord
    }
})
