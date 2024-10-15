import http from "@/utils/http";
import type {
  SearchModel,
  SearchPopupModel,
  SurveyCrudModel,
  SurveyDetailModel,
} from "./proAbilitySurvey.type";
const url = "/a/profAbilitySurvey";

export const getAll = (data: SearchModel) => {
  return http.post(`${url}`, data);
};

export const getDataRegister = (data: SurveyDetailModel) => {
  return http.post(`${url}/getDataRegister`, data);
};

export const save = (data: SurveyCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const remove = (data: SurveyDetailModel) => {
  return http.post(`${url}/delete`, data);
};

export const getPagePopup = (data: SearchPopupModel) => {
  return http.post(`${url}/list-popup`, data);
};
