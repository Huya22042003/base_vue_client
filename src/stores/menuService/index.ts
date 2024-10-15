import { defineStore } from "pinia";
import { ref } from "vue";
import type { MenuRequestModel, MenuResponseModel, MenuSearchModel } from "./menu.type";
import { create, detailById, getListData, getListParent, update, updateDelete } from "./menu.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export const menuStore = defineStore('menuStore', () => { 
    const resultData = ref<MenuResponseModel[]>([])
    const detailData = ref<MenuResponseModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const searchMenu = async (params: MenuSearchModel) => {
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

    const createMenu = async (data: MenuRequestModel) => {
        try {
            const res = await create(data)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const updateMenu = async (data: MenuRequestModel) => {
        try {
            const res = await update(data)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const deleteMenu = async (id: string) => {
        try {
            const res = await updateDelete(id)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }

    const getSelectBoxParent = async (siteType: string) => {
        try {
            const res = await getListParent(siteType)
            resultData.value = res.data.data
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
        searchMenu,
        getDetailById,
        createMenu,
        updateMenu,
        deleteMenu,
        getSelectBoxParent
    }
})