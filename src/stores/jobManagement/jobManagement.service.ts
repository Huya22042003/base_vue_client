import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { JobSaveModel, JobSearchModel } from "./jobManagement.type";

const url = `/${SITE_ADMIN}/job-management`;

export const getPage = (request: JobSearchModel) => {
  return http.post(url + "/list", request);
};

export const getListTaltNrtgType = () => {
  return http.post(url + "/list-talt-nrtg-type");
};

export const saveJob = (data: JobSaveModel) => {
  return http.post(url + "/save", data);
};

export const detailJob = (data: any) => {
  return http.post(url + "/detail", data);
};
