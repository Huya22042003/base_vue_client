import { SITE_STAFF } from "@/constants/common.const";
import http from "@/utils/http";
import type { CqiRequest, CqiSearch, CqiSeq } from "./cqi.type";

const url = `${SITE_STAFF}/cqi`;
export const createCqi = (params: CqiRequest) => {
  return http.post(`${url}/`, params);
};

export const listCqi = (params: CqiSearch) => {
  return http.post(`${url}/list`, params);
};

export const getBasicInfo = (params: CqiSeq) => {
  return http.post(`${url}/info`, params);
};

export const getDetail = (params: CqiSeq) => {
  return http.post(`${url}/detail`, params);
};

export const getMaxYear = () => {
  return http.get(`${url}/search`);
};