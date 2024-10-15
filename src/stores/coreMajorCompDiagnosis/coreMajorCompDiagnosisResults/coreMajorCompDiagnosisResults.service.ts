import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultMajCapaChartGraphicReqModel,
  DiagResultMajorCapaReqModel,
  ResultDiagMajorCapaSearchModel,
} from "./coreMajorCompDiagnosisResults.type";

const url = `${SITE_ADMIN}/result-diag-major-capa`;

export const getPageResultDiagMajorCapa = (
  data: ResultDiagMajorCapaSearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagMajorCapa = (
  data: DiagResultMajorCapaReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const getListMajorCapa = (data: any) => {
  return http.post(`${url}/list-major-capa`, data);
};

export const getDataChartGraphicDiagMajorCapa = (
  data: DiagResultMajCapaChartGraphicReqModel
) => {
  return http.post(`${url}/chart-graphic`, data);
};

export const downloadExelDiagMajorCapa = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: "blob" });
};
