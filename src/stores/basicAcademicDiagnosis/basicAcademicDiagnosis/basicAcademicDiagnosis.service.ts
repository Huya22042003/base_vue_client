import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagBaseLearnDetailModel,
  DiagBaseLearnReqModel,
  DiagBaseLearnSearchModel,
} from "./basicAcademicDiagnosis.type";

const url = `${SITE_ADMIN}/diag-base-learn`;

export const getPageDiagBaseLearn = (data: DiagBaseLearnSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveDiagBaseLearn = (data: DiagBaseLearnReqModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagBaseLearn = (data: DiagBaseLearnDetailModel) => {
  return http.post(`${url}/detail`, data);
};
