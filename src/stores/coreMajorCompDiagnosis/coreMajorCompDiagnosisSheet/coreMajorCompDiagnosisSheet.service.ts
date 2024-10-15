import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  MajorCapaSurveyCrudModel,
  MajorCapaSurveyDetailModel,
  MajorCapaSurveySearchModel,
  MajorCapaSurveySearchPopupModel,
} from "./coreMajorCompDiagnosisSheet.type";

const url = `${SITE_ADMIN}/major-capa-survey`;

export const getPage = (data: MajorCapaSurveySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const getPagePopup = (data: MajorCapaSurveySearchPopupModel) => {
  return http.post(`${url}/list-popup`, data);
};

export const saveMajorCapaSurvey = (data: MajorCapaSurveyCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const detailMajorCapaSurvey = (data: MajorCapaSurveyDetailModel) => {
  return http.post(`${url}/detail`, data);
};

export const deleteMajorCapaSurvey = (data: MajorCapaSurveyCrudModel) => {
  return http.post(`${url}/delete`, data);
};