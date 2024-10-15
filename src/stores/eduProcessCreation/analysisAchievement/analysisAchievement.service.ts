import http from '@/utils/http'
import type { EduCourseDetailReqDTO, EduCourseReqModel, EduCourseSearchModel } from './analysisAchievement.type'
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/edu-course/`

export const getAnalysisAchievement = (data: EduCourseDetailReqDTO) => {
  return http.post(url + 'get-analysis-achievement', data);
}

