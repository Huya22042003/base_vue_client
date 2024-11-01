import http from "@/utils/http";
import type {SearchCurr, CurrReg} from "./curriculumMng.type";
import { SITE_ADMIN } from "@/constants/common.const";
const url = `${SITE_ADMIN}/curr`;

export const listData = (data: SearchCurr) => {
  return http.post(`${url}/list`, data);
};

export const saveCurr = (data: CurrReg) => {
  return http.post(`${url}/`, data);
};

export const detailCurr = (data: String) => {
    return http.post(`${url}/detail`, data);
  };
  
