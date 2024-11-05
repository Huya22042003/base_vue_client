import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { LevelOfDeptSearchModel } from "./levelOfDept.type";

const url = `${SITE_ADMIN}/level-of-dept`;

export const getLevelOfDeptList = (data: LevelOfDeptSearchModel) => {
  return http.post(`${url}/list`, data);
};
