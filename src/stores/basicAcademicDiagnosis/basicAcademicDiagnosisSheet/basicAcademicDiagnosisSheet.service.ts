import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  BaseLearnSurveyCrudModel,
  BaseLearnSurveyDetailModel,
  BaseLearnSurveySearchModel,
  BaseLearnSurveySearchPopupModel,
} from "./basicAcademicDiagnosisSheet.type";

const url = `${SITE_ADMIN}/base-learn-survey`;

export const getPageBaseLearnSurvey = (data: BaseLearnSurveySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveBaseLearnSurvey = (data: BaseLearnSurveyCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const detailBaseLearnSurvey = (data: BaseLearnSurveyDetailModel) => {
  return http.post(`${url}/detail`, data);
};

export const getListBaseLearnItem = () => {
  return http.get(`${url}/get-base-learn-item`);
};

export const deleteBaseLearnSurvey = (data: BaseLearnSurveyDetailModel) => {
  return http.post(`${url}/delete`, data);
};

export const getPageBaseLearnSurveyPopup = (
  data: BaseLearnSurveySearchPopupModel
) => {
  return http.post(`${url}/list-popup`, data);
};
