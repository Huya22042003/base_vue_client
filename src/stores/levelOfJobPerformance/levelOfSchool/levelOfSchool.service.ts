import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { LevelOfSchoolSearchModel } from "./levelOfSchool.type";

const url = `${SITE_ADMIN}/level-of-school`;

export const getLevelOfSchoolList = (data: LevelOfSchoolSearchModel) => {
  return http.post(`${url}/list`, data);
};
