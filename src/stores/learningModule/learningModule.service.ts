import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { LearningModuleRequest } from "@/stores/learningModule/learningModule.type";


const url = `${SITE_ADMIN}/job-capa-stnd`;

export const getList = (data: LearningModuleRequest) => {
  return http.post(`${url}/list`, data);
};

export const getListModule = (data: LearningModuleRequest) => {
  return http.post(`${url}/abilList`, data);
}

export const addModule = (data: LearningModuleRequest) => {
  return http.post(`${url}/create`, data);
}

export const updateModule = (data: LearningModuleRequest) => {
  return http.post(`${url}/modifyNm`, data);
}

export const deleteModule = (data: LearningModuleRequest) => {
  return http.post(`${url}/remove`, data);
}

export const changeUseModule = (data: LearningModuleRequest) => {
  return http.post(`${url}/modifUse`, data);
}
