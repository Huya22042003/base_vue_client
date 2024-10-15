import { defineStore } from "pinia";
import { ref } from "vue";
import { create, detailById, getListData, update, updateDelete } from "./resource.service";
import type { ResourceRequestModel, ResourceResponseModel, ResourceSearchModel } from "./resource.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export const resourceStore = defineStore('resourceStore', () => { 
    const resultData = ref<ResourceResponseModel[]>([])
    const detailData = ref<ResourceResponseModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()


    const searchResource = async (params: ResourceSearchModel) => {
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

    const createResource = async (data: ResourceRequestModel) => {
        try {
            const res = await create(data)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const updateResource = async (data: ResourceRequestModel) => {
        try {
            const res = await update(data)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const deleteResoure = async (id: string) => {
        try {
            const res = await updateDelete(id)
            detailData.value = res.data.data
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
        searchResource,
        getDetailById,
        createResource,
        updateResource,
        deleteResoure
    }
})