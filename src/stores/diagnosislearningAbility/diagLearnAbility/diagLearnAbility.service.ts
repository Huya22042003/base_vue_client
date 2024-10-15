import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  LearnAbilityDiagnosisModel,
  DiagLearnAbilitySearchModel,
} from "./diagLearnAbility.type";

const url = `${SITE_ADMIN}/diag-learn-ability`;

export const getPage = (data: DiagLearnAbilitySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveDiagLearnAbility = (data: LearnAbilityDiagnosisModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagLearnAbility = (data: any) => {
  return http.post(`${url}/detail`, data);
};
