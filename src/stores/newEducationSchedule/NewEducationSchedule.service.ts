import http from "@/utils/http";
import type {
  NewEducationScheduleModel,
  NewEducationScheduleSearchModel,
  NewEducationScheduleReqModel,
} from "./NewEducationSchedule.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/eduCourseWriteSchdl`;

export const fetchData = (data: NewEducationScheduleSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const fetchSetupScheduleAll = (data: NewEducationScheduleReqModel) => {
  return http.post(`${url}/all`, data);
};
export const fetchSetupSchedule = (data: NewEducationScheduleReqModel) => {
  return http.post(`${url}/`, data);
};
