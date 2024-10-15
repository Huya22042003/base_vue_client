import http from "@/utils/http";
import type {
  TeachingScheduleModel,
  TeachingScheduleSearchModel,
  TeachingScheduleReqModel,
} from "./TeachingSchedule.type";
import { SITE_ADMIN } from "@/constants/common.const";
const url = `${SITE_ADMIN}/lecturePlanWriteSchdl`;

export const fetchData = (data: TeachingScheduleSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const fetchSetupScheduleAll = (data: TeachingScheduleReqModel) => {
  return http.post(`${url}/all`, data);
};
export const fetchSetupSchedule = (data: TeachingScheduleReqModel) => {
  return http.post(`${url}/`, data);
};
