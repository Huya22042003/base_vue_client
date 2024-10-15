import { defineStore } from "pinia";
import { ref } from "vue";
import type { SelectBoxEduYearModel, StudentLectureDetailResponseModel, StudentLectureDetailSearchModel, StudentLectureResponseModel, StudentLectureSearchModel } from "./studentLecture.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { getListData, getListDept, getListDetailData, getListEdu, getListExcel } from "./studentLecture.service";

export const studentLectureStore = defineStore('studentLectureStore', () => { 
    const resultData = ref<StudentLectureResponseModel[]>([])
    const detailData = ref<StudentLectureDetailResponseModel[]>([])
    const selectBoxData = ref<SelectBoxEduYearModel[]>([])
    const status = ref<number>()
    const totalRecord = ref<number>()
    const detailDataExel = ref<StudentLectureDetailResponseModel[]>([])

    const searchStudentLecture = async (params: StudentLectureSearchModel) => {
        try {
            const res = await getListData(params)
            resultData.value = res.data.data.content
            totalRecord.value = res.data.data.totalElements
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const searchStudentLectureDetail = async (params: StudentLectureDetailSearchModel) => {
        try {
            const res = await getListDetailData(params)
            detailData.value = res.data.data.content
            totalRecord.value = res.data.data.totalElements
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getsListEduYear = async () => {
        try {
            const res = await getListEdu()
            selectBoxData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getsListDept = async () => {
        try {
            const res = await getListDept()
            selectBoxData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getsListExcel = async (id: string) => {
        try {
            const res = await getListExcel(id)
            detailDataExel.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }


    return {
        resultData,
        detailData,
        status,
        totalRecord,
        selectBoxData,
        searchStudentLecture,
        searchStudentLectureDetail,
        getsListEduYear,
        getsListDept,
        getsListExcel,
        detailDataExel
    }
})