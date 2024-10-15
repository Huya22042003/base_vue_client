import { SITE_ADMIN } from '@/constants/common.const'
import http from '@/utils/http'
import type { EduCoursePrflReqModel, EduCoursePrflSearchModel, EduCoursePrflSelModel, SbjtSearchModel } from './eduCourseProfile.type'

const url = `${SITE_ADMIN}/profile/`

export const searchEduCoursePrfl = (data: EduCoursePrflSearchModel) => {
  return http.post(url + 'list', data)
}

export const insertEduCoursePrfl = (data: EduCoursePrflReqModel) => {
  return http.post(url, data)
}

export const findEduCoursePrfl = (data: EduCoursePrflSelModel) => {
  return http.post(url + 'detail', data)
}

export const findEduCourseSbjt = (data: SbjtSearchModel) => {
  return http.post(url + 'subject', data)
}
