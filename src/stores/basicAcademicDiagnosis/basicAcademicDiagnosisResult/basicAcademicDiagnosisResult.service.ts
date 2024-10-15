import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultBaseLearnGraphicReqModel,
  DiagResultBaseLearnReqModel,
  ResultDiagBaseLearnSearchModel,
} from "./basicAcademicDiagnosisResult.type";

const url = `${SITE_ADMIN}/result-diag-base-learn`;

export const getPageResultDiagBaseLearn = (
  data: ResultDiagBaseLearnSearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagBaseLearn = (
  data: DiagResultBaseLearnReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const getDataChartGraphicDiagBaseLearn = (
  data: DiagResultBaseLearnGraphicReqModel
) => {
  return http.post(`${url}/chart-graphic`, data);
};

export const getListBaseLearn = (data: any) => {
  return http.post(`${url}/list-base-learn`, data);
};

export const downloadExelDiagBaseLearn = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: "blob" });
};
