import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { EduCourseCqiReq, EduCourseCqiSearchModel } from "./cqiTrainingProcess.type";

const url = `${SITE_ADMIN}/edu-course-cqi`;

export const getEduCourseCqiList = (params: EduCourseCqiSearchModel) => {
  return http.post(`${url}/list`, params);
};

export const saveEduCourseCqi = (params: EduCourseCqiReq) => {
  return http.post(`${url}/save`, params);
};