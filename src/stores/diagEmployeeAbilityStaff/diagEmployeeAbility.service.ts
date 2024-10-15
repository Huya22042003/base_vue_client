import http from "@/utils/http";

import { SITE_EMPLOYEE } from "@/constants/common.const";
import type {
  DiagEmpAbilityPublicInfoReqModel,
  DiagEmpAbilityStaffDataStepReqModel,
  DiagEmpAbilityStaffSaveModel,
} from "./diagEmployeeAbility.type";

const url = `${SITE_EMPLOYEE}/diag-emp-ability`;

export const getListDataDiagEmpAbility = () => {
  return http.post(url + "/list");
};

export const updatePublicInfo = (data: DiagEmpAbilityPublicInfoReqModel) => {
  return http.post(url + "/public-info", data);
};

export const getEmpInfo = (data: DiagEmpAbilityPublicInfoReqModel) => {
  return http.post(url + "/emp-info", data);
};

export const saveDataStepQuestion = (data: DiagEmpAbilityStaffSaveModel) => {
  return http.post(url + "/save", data);
};

export const getListEmpAbility = () => {
  return http.post(url + "/list-emp-ability");
};

export const getDataStepQuestion = (
  data: DiagEmpAbilityStaffDataStepReqModel
) => {
  return http.post(url + "/get-data-question", data);
};

export const sendDiagEmpAbility = (
  data: DiagEmpAbilityStaffDataStepReqModel
) => {
  return http.post(url + "/send-diag-emp-ability", data);
};

export const getDetailResult = (data: DiagEmpAbilityPublicInfoReqModel) => {
  return http.post(url + "/result", data);
};

export const getDiagRsltState = (data: DiagEmpAbilityPublicInfoReqModel) => {
  return http.post(url + "/rslt-state", data);
};
