import http from "@/utils/http";
import type {
  AnalysisEvalStnrdReqModel,
  EduCourseDetailReqDTO,
  OperationDevelopmentPlanReqModel,
  OperationDevelopmentPlanSaveModel,
} from "./analysisAchievement.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/edu-course/`;

export const getAnalysisAchievement = (data: EduCourseDetailReqDTO) => {
  return http.post(url + "get-analysis-achievement", data);
};

export const getOperationDevelopmentPlanList = (
  data: OperationDevelopmentPlanReqModel
) => {
  return http.post(url + "get-operation-development", data);
};

export const saveOperationDevelopmentPlanList = (
  data: OperationDevelopmentPlanSaveModel
) => {
  return http.post(url + "save-operation-development", data);
};

export const getListEduCourseCqiEvalStnrd = (
  data: AnalysisEvalStnrdReqModel
) => {
  return http.post(`${url}list-cqi-eval-stnrd`, data);
};
