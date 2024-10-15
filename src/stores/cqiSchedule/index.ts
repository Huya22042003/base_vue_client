import type { CqiScheduleModel, CqiScheduleReqModel ,CqiScheduleSearchModel} from './CqiSchedule.type'
import { fetchData, fetchSetupScheduleAll,fetchSetupSchedule} from './CqiSchedule.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {MESSAGE_ERROR_API} from '@/constants/common.const'

export const CqiScheduleStore = defineStore('CqiSchedule', () => {

    const cqiScheduleData = ref<CqiScheduleModel[]>([])
    const cqiSchedule = ref<CqiScheduleModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const fetchDataModel = async (params: CqiScheduleSearchModel) => {
        try {
            const response = await fetchData(params)
            cqiScheduleData.value = response.data.data
            status.value = response.status
            totalRecord.value = response.data.data.totalElements
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupScheduleAll = async (params: CqiScheduleReqModel) => {
        try {
            const response = await fetchSetupScheduleAll(params)
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const setupSchedule = async (params: CqiScheduleReqModel) => {
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
        cqiScheduleData,
        cqiSchedule,
        totalRecord
    }
})
