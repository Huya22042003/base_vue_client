import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  SurveyOutSchoolDetailReqModel,
  SurveyOutSchoolReqModel,
  SurveyOutSchoolSearchModel,
  SurveyOutSchoolSearchPopupModel,
} from "./surveyOutSchool.type";

const url = `${SITE_ADMIN}/survey-out-school`;

export const getPage = (data: SurveyOutSchoolSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveSurveyOutSchool = (data: SurveyOutSchoolReqModel) => {
  return http.post(`${url}/save`, data);
};

export const detailSurveyOutSchool = (data: SurveyOutSchoolDetailReqModel) => {
  return http.post(`${url}/detail`, data);
};

export const deleteSurveyOutSchool = (data: SurveyOutSchoolDetailReqModel) => {
  return http.post(`${url}/delete`, data);
};

export const getPagePopup = (data: SurveyOutSchoolSearchPopupModel) => {
  return http.post(`${url}/list-popup`, data);
};

export const selectCallSurvey = (data: SurveyOutSchoolDetailReqModel) => {
  return http.post(`${url}/select-call-survey`, data);
};

export const getResultSurveyOutSchool = (
  data: SurveyOutSchoolDetailReqModel
) => {
  return http.post(`${url}/result`, data);
};

export const downloadExcelResultSurveyOutSchool = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: "blob" });
};
