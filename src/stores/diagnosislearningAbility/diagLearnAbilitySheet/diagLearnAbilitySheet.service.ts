import { SITE_ADMIN } from "@/constants/common.const";
import type {
  LearnAbilitySearchModel,
  LearnAbilitySurveyCrudModel,
  LearnAbilitySurveyDetailModel,
  LearnAbilitySurveyPopUpSearchModel,
} from "./diagLearnAbilitySheet.type";
import http from "@/utils/http";

const url = `${SITE_ADMIN}/learning-ability-survey`;

export const getPage = (data: LearnAbilitySearchModel) => {
  return http.post(`${url}`, data);
};

export const getDataRegister = (data: LearnAbilitySurveyDetailModel) => {
  return http.post(`${url}/register`, data);
};

export const saveLearnAbilitySurvey = (data: LearnAbilitySurveyCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const deleteLearnAbilitySurvey = (
  data: LearnAbilitySurveyDetailModel
) => {
  return http.post(`${url}/delete`, data);
};

export const getPagePopUp = (data: LearnAbilitySurveyPopUpSearchModel) => {
  return http.post(`${url}/popup`, data);
};
