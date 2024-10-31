import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { JobAbilityReg, SearchData, JobCapaUnit, JobScope, JobHistory, CheckVer } from "./jobAbilityManagement.type";

const url = `/${SITE_ADMIN}/job-ability-mng`;

export const listJob = (data: SearchData) => {
  return http.post(url + "/list", data);
};

export const saveJob = (data: JobAbilityReg) => {
  return http.post(url + "/save", data);
};

export const jobDetail = (data: String) => {
  return http.post(url + "/detail", data);
};

export const saveJobUnit = (data: Array<JobCapaUnit>) => {
  return http.post(url + "/saveJobUnit", data);
};

export const listJobUnit = (data: String) => {
  return http.post(url + "/detailJobUnit", data);
};

export const saveJobScope = (data: JobScope) => {
  return http.post(url + "/saveJobScope", data);
};

export const detailJobScope = (data: String) => {
  return http.post(url + "/detailJobScope", data);
};

export const upVer = (data: String) => {
  return http.post(url + "/upVer", data);
};

export const parentList = (data: any) => {
  return http.post(url + "/parentList", data);
};

export const itemList = (data?: String) => {
  return http.post(url + "/parentItem", data);
}

export const saveJobHistory = (data: JobHistory) => {
  return http.post(url + "/saveJobHistory", data);
};


export const detailHistory = (data: String) => {
  return http.post(url + "/detailHistory", data);
};

export const checkVer = (data: CheckVer) => {
  return http.post(url + "/checkVer", data);
};

export const downloadExcel = () => {
  return http.get(url + "/downloadExcel");
};

export const checkPerform = (data: String) => {
  return http.post(url + "/checkJobPerform", data);
};

export const checkUnit = (data: String) => {
  return http.post(url + "/checkJobUnit", data);
};