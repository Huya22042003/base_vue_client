import http from "@/utils/http";
import type {
  CqiScheduleModel,
  CqiScheduleSearchModel,
  CqiScheduleReqModel,
} from "./CqiSchedule.type";
import { SITE_ADMIN } from "@/constants/common.const";
const url = `${SITE_ADMIN}/cqiWriteSchdl`;
export const fetchData = (data: CqiScheduleSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const fetchSetupScheduleAll = (data: CqiScheduleReqModel) => {
  return http.post(`${url}/all`, data);
};
export const fetchSetupSchedule = (data: CqiScheduleReqModel) => {
  return http.post(`${url}/`, data);
};
