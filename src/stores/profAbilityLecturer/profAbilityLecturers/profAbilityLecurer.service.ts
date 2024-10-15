import http from "@/utils/http";
import type {
  SearchModel,
  DiagLecturerCrudModel,
} from "./profAbilityLecturer.type";
const url = "/a/diagLecturer";
export const getAll = (data: SearchModel) => {
  return http.post(`${url}`, data);
};
export const saveDiagProfAbility = (data: DiagLecturerCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagProfAbility = (data: any) => {
  return http.post(`${url}/detail`, data);
};
