import http from "@/utils/http";
import type {
  EduCourseDescReqDTO,
  EduCourseDescSelDTO,
  EduCourseDetailReqDTO,
  EduCourseReqModel,
  EduCourseSearchModel,
  EduCourseSelRegistDTO,
} from "./eduProcess.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/edu-course/`;

export const search = (data: EduCourseSearchModel) => {
  return http.post(url + "list", data);
};

export const getFormAdd = () => {
  return http.post(url + "edu-course-type");
};

export const createEduCourse = (data: EduCourseReqModel) => {
  return http.post(url + "create", data);
};

export const detailEduCourse = (data: EduCourseDetailReqDTO) => {
  return http.post(url + "detail", data);
};

export const getEduCourseDesc = (data: EduCourseDescSelDTO) => {
  return http.post(url + "edu-course-desc-list", data);
};

export const createEduCourseDesc = (data: EduCourseDescReqDTO[]) => {
  return http.post(url + "edu-course-desc", data);
};

export const getEduCourseSel = (data: EduCourseDescSelDTO) => {
  return http.post(url + "edu-course-sel-list", data);
};

export const createEduCourseSel = (data: EduCourseSelRegistDTO) => {
  return http.post(url + "edu-course-sel", data);
};

export const versionUpEduCourse = (data: any) => {
  return http.post(url + "version-up", data);
};

export const deleteEduCourse = (data: Array<string>) => {
  return http.post(url + "delete", data);
};
