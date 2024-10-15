import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  SurveyInSchoolDetailReqModel,
  SurveyInSchoolReqModel,
  SurveyInSchoolSearchModel,
  SurveyInSchoolSearchPopupModel,
  SurveyProfessorInfoSearchModel,
  SurveyStudentInfoSearchModel,
} from "./surveyInSchool.type";

const url = `${SITE_ADMIN}/survey-in-school`;

export const getPage = (data: SurveyInSchoolSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveSurveyInSchool = (data: SurveyInSchoolReqModel) => {
  return http.post(`${url}/save`, data);
};

export const getPageStudentInfo = (data: SurveyStudentInfoSearchModel) => {
  return http.post(`${url}/list-student-info`, data);
};

export const getPageProfessorInfo = (data: SurveyProfessorInfoSearchModel) => {
  return http.post(`${url}/list-professor-info`, data);
};

export const detailSurveyInSchool = (data: SurveyInSchoolDetailReqModel) => {
  return http.post(`${url}/detail`, data);
};

export const deleteSurveyInSchool = (data: SurveyInSchoolDetailReqModel) => {
  return http.post(`${url}/delete`, data);
};

export const getPagePopup = (data: SurveyInSchoolSearchPopupModel) => {
  return http.post(`${url}/list-popup`, data);
};

export const selectCallSurvey = (data: SurveyInSchoolDetailReqModel) => {
  return http.post(`${url}/select-call-survey`, data);
};

export const getResultSurveyInSchool = (data: SurveyInSchoolDetailReqModel) => {
  return http.post(`${url}/result`, data);
};

export const downloadExcelResultSurveyInSchool = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: "blob" });
};
