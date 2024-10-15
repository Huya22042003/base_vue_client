import http from "@/utils/http";
import type { SearchModel, DiagEmpCrudModel } from "./diagnosisEmployee.type";
const url = "/a/employees";
export const getAll = (data: SearchModel) => {
  return http.post(`${url}`, data);
};
export const saveDiagEmpAbility = (data: DiagEmpCrudModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagEmpAbility = (data: any) => {
  return http.post(`${url}/detail`, data);
};
