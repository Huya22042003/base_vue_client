import { defineStore } from "pinia";
import { ref } from "vue";
import { getListData, getDataDetail, getNoticeId } from "./notification.service";
import type { NotificationResponseModel, NotificationSearchModel, NotificationDetailModel, NotificationDetailResponseModel, NotiIdModel } from "./notification.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
export const notificationStore = defineStore('notificationStore', () => {
    const resultData = ref<NotificationResponseModel[]>([])
    const detailData = ref<NotificationDetailResponseModel>()
    const notiIdModel = ref<NotiIdModel>()
    const status = ref<number>()
    const totalRecord = ref<number>()

    const getAllDataList = async (params: NotificationSearchModel) => {
        try {
            const res = await getListData(params)
            resultData.value = res.data.data.content
            totalRecord.value = res.data.data.totalElements
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }
    const getDataDetailNotification = async (params: NotificationDetailModel) => {
        try {
            const res = await getDataDetail(params)
            detailData.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }
    const getNoticeListId = async () => {
        try {
            const res = await getNoticeId()
            notiIdModel.value = res.data.data
            status.value = res.status
        } catch (e) {
            throw new Error(MESSAGE_ERROR_API)
        }
    }
    return {
        getAllDataList,
        status,
        resultData,
        totalRecord,
        detailData,
        notiIdModel,
        getDataDetailNotification,
        getNoticeListId
    }

})