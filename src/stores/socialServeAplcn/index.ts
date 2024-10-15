import { defineStore } from "pinia";
import { ref } from "vue";
import { detailById, getListData, deleteById, register} from "./socialServeAplcn.service";
import type {  SocialServeAplcnResponseModel, SocialServeAplcnSearchModel, SocialServeAplcnRequestModel } from "./socialServeAplcn.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export const socialServeAplcnStore = defineStore('socialServeAplcnStore', () => { 
    const resultData = ref<SocialServeAplcnResponseModel[]>([])
    const detailData = ref<SocialServeAplcnResponseModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()


    const getAllData = async (params: SocialServeAplcnSearchModel) => {
        try {
            const res = await getListData(params)
            resultData.value = res.data.data.content
            totalRecord.value = res.data.data.totalElements
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getDetailById = async (id: string) => {
        try {
            const res = await detailById(id)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }
    const deleteObjById = async (id: string) => {
        try {
            const res = await deleteById(id)
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const registerObj = async (data: SocialServeAplcnRequestModel) => {
        try {
            const res = await register(data)
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
        getAllData,
        deleteObjById,
        registerObj,
        getDetailById,
    }
})