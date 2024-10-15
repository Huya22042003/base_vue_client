import http from "@/utils/http"
import { SITE_STAFF } from '@/constants/common.const'
import type { NotificationSearchModel, NotificationDetailModel } from "./notification.type"

const url = `${SITE_STAFF}/notice-staff`
export const getListData = (searchForm: NotificationSearchModel) => {
    return http.post(url + '/list', searchForm)
}
export const getDataDetail = (data: NotificationDetailModel) => {
    return http.post(url + '/detail', data)
}

export const getNoticeId = () => {
    return http.post(url + '/list-id')
}
