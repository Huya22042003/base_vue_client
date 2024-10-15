import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { EduCourseApdxSaveModel, EduCourseApdxSearchModel } from "./attachFile.type";

const url = `${SITE_ADMIN}/edu-course`;

export const getEduCourseApdx = (data: EduCourseApdxSearchModel) => {
  return http.post(url + "/get-list-apdx", data);
};

export const saveEduCourseApdx = (data: EduCourseApdxSaveModel) => {
  return http.post(url + "/save-apdx", data);
};

export const deleteEduCourseApdx = (data: any) => {
    return http.post(url + "/delete-apdx", data);
  };
  