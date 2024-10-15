import http from '@/utils/http'
import type { NotificationCategorySearchModel, NoticeIdRes, NoticeUpdateModel, CodeSiteModel } from './notificationCategory.type'
const url = "/a/notice"
export const fetchData = (data: NotificationCategorySearchModel) => {
  return http.post(`${url}/list`, data)
}
export const saveData = (data: any) => {
  return http.post(`${url}/`, data)
}
export const updateData = (data: NoticeUpdateModel) => {
  return http.post(`${url}/update`, data)
}
export const deleteById = (data: NoticeIdRes) => {
  return http.post(`${url}/delete`, data)
}
export const findById = (data: NoticeIdRes) => {
  return http.post(`${url}/detail`, data)
}
export const fetchDataSize = (data: CodeSiteModel) => {
  return http.post(`/a/code/`, data)
}
export const countTop = () => {
  return http.get(`${url}/checkTop`)
}
export const siteType = () => {
  return http.get(`${url}/siteType`)
}
