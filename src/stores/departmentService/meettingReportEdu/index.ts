import { defineStore } from "pinia";
import { ref } from "vue";
import { create, getDetailData, getListData, getListForm, getListSelect, update, updateDeleteFlag } from "./meettingReportEdu.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { MeetReportEduFilterDTO, MeetReportEduReqDTO, SelectListFilterDTO } from "./meettingReportEdu.type";

export const meetReportEduStore = defineStore('meetReportEduStore', () => { 
    const resultData = ref<any>()
    const status = ref<number>()

    const getListFormSearch = async () => {
        try {
            const response = await getListForm()
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const searchMeetReportEdu = async (params: MeetReportEduFilterDTO) => {
        try {
            const response = await getListData(params)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getDetailMeetReportEdu = async (id: String) => {
        try {
            const response = await getDetailData(id)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const searchSelectList = async (params: SelectListFilterDTO) => {
        try {
            const response = await getListSelect(params)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const createMeetReportEdu = async (data: MeetReportEduReqDTO) => {
        try {
            const response = await create(data)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const updateMeetReportEdu = async (data: MeetReportEduReqDTO) => {
        try {
            const response = await update(data)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const deleteMeetReportEdu = async (id: String) => {
        try {
            const response = await updateDeleteFlag(id)
            resultData.value = response.data.data
            status.value = response.status

        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    return {
        status,
        resultData,
        getListFormSearch,
        searchMeetReportEdu,
        getDetailMeetReportEdu,
        searchSelectList,
        createMeetReportEdu,
        updateMeetReportEdu,
        deleteMeetReportEdu
    }
})