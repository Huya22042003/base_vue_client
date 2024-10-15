import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagMajorCapaReqModel,
  DiagMajorCapaSearchModel,
} from "./coreMajorCompDiagnosis.type";

const url = `${SITE_ADMIN}/diag-major-capa`;

export const getPageDiagMajorCapa = (data: DiagMajorCapaSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const getDeptInfo = () => {
  return http.get(`${url}/list-dept-info`);
};

export const saveDiagMajorCapa = (data: DiagMajorCapaReqModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagMajorCapa = (data: any) => {
  return http.post(`${url}/detail`, data);
};
