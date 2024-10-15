import http from '@/utils/http'
import { SITE_ADMIN } from "@/constants/common.const";
import type { CoreJobFilterDTO, CoreJobSelDTO, EduCourseCommFilterDTO, EduCourseCommReqDTO, EduGoalFilterDTO, ResultEduCourseFilterDTO, ResultEduCourseReqDTO, SelectStaffFilterDTO, TaltNrtgFilterDTO, TaltNrtgResDTO } from './typeTalentEdu.type';

const url = `${SITE_ADMIN}/edu-course/`

export const getSelectStaffType = (data: SelectStaffFilterDTO) => {
  return http.post(url + 'get-select-staff', data)
}

export const getAllEduCourseComm = (req: EduCourseCommFilterDTO) => {
  return http.post(url + 'edu-course-comm', req);
}

export const saveEduCourseComm = (req: EduCourseCommReqDTO[]) => {
  return http.post(url + 'save-edu-course-comm', req);
}

export const getEduGoal = (req: EduGoalFilterDTO) => {
  return http.post(url + 'get-edu-goal', req);
}

export const getTaltNrtgSel = (req: TaltNrtgFilterDTO) => {
  return http.post(url + 'get-talt-nrtgSel', req);
}

export const saveTaltNrtgSel = (req: TaltNrtgResDTO) => {
  return http.post(url + 'save-talt-nrtgSel', req);
}

export const getCoreJobSel = (req: CoreJobFilterDTO) => {
  return http.post(url + 'get-core-job-sel', req);
}

export const saveCoreJobSel = (req: CoreJobSelDTO[]) => {
  return http.post(url + 'save-core-job-sel', req);
}

export const getResultEduCourse = (req: ResultEduCourseFilterDTO) => {
  return http.post(url + 'get-result-edu-course', req);
}

export const saveResultEduCourse = (req: ResultEduCourseReqDTO) => {
  return http.post(url + 'save-result-edu-course', req);
}