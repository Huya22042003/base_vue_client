import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { SubjectProfileFilterDTO, SubjectProfileReqDTO } from "./subjectProfile.type";

const url = `${SITE_ADMIN}/edu-course/`;

export const getPageSubjectProfile = (req: SubjectProfileFilterDTO) => {
  return http.post(url + "get-page-subject-profile", req);
};

export const getDetailSubjectProfile = (req: SubjectProfileFilterDTO) => {
  return http.post(url + "get-detail-subject-profile", req);
};

export const updateSubjectProfile = (req: SubjectProfileReqDTO) => {
  return http.post(url + "save-subject-profile", req);
};