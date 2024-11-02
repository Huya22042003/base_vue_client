import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { LevelOfStudentSearchModel } from "./levelOfStudent.type";

const url = `${SITE_ADMIN}/level-of-student`;

export const getLevelOfStudentList = (data: LevelOfStudentSearchModel) => {
  return http.post(`${url}/list`, data);
};
