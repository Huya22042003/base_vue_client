import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { EduCourseCqiFilterDetail } from "../cqiTrainingProcess.type";

const url = `${SITE_ADMIN}/edu-course-cqi`;

export const getMajorOverview = (params: EduCourseCqiFilterDetail) => {
  return http.post(`${url}/overview`, params);
};