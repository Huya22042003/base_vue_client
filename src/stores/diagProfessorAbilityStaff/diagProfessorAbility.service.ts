import http from "@/utils/http";

import { SITE_STAFF } from "@/constants/common.const";
import type {
  DiagProfAbilityPublicInfoReqModel,
  DiagProfAbilityStaffDataStepReqModel,
  DiagProfAbilityStaffSaveModel,
} from "./diagProfessorAbility.type";

const url = `${SITE_STAFF}/diag-prof-ability`;

export const getListDataDiagProfAbility = () => {
  return http.post(url + "/list");
};

export const updatePublicInfo = (data: DiagProfAbilityPublicInfoReqModel) => {
  return http.post(url + "/public-info", data);
};

export const getProfInfo = (data: DiagProfAbilityPublicInfoReqModel) => {
  return http.post(url + "/prof-info", data);
};

export const saveDataStepQuestion = (data: DiagProfAbilityStaffSaveModel) => {
  return http.post(url + "/save", data);
};

export const getListProfAbility = () => {
  return http.post(url + "/list-prof-ability");
};

export const getDataStepQuestion = (
  data: DiagProfAbilityStaffDataStepReqModel
) => {
  return http.post(url + "/get-data-question", data);
};

export const sendDiagProfAbility = (
  data: DiagProfAbilityStaffDataStepReqModel
) => {
  return http.post(url + "/send-diag-prof-ability", data);
};

export const getDetailResult = (data: DiagProfAbilityPublicInfoReqModel) => {
  return http.post(url + "/result", data);
};

export const getDiagRsltState = (data: DiagProfAbilityPublicInfoReqModel) => {
  return http.post(url + "/rslt-state", data);
};
