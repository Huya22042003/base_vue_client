import { SITE_ADMIN } from "@/constants/common.const";
import type {
  CoreAbilitySearchModel,
  CoreAbilitySearchPopupModel,
  CoreAbilitySurveyCrudModel,
  CoreAbilitySurveyDetailModel,
} from "./coreCompetencyDiagnosticSheet.type";
import http from "@/utils/http";

const url = `${SITE_ADMIN}/core-ability-survey`;

export const getPage = (data: CoreAbilitySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const getPagePopup = (data: CoreAbilitySearchPopupModel) => {
  return http.post(`${url}/list-popup`, data);
};

export const getDataRegister = () => {
  return http.get(`${url}/get-data-register`);
};

export const saveCoreAbilitySurvey = (data: CoreAbilitySurveyCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const getDataDetail = (data: CoreAbilitySurveyDetailModel) => {
  return http.post(`${url}/get-data-detail`, data);
};

export const deleteCoreAbilitySurvey = (data: CoreAbilitySurveyDetailModel) => {
  return http.post(`${url}/delete`, data);
};
