import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  CoreCompDiagnosisModel,
  DiagCoreAbilitySearchModel,
} from "./coreCompetencyDiagnosis.type";

const url = `${SITE_ADMIN}/diag-core-ability`;

export const getPage = (data: DiagCoreAbilitySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const saveDiagCoreAbility = (data: CoreCompDiagnosisModel) => {
  return http.post(`${url}/save`, data);
};

export const detailDiagCoreAbility = (data: any) => {
  return http.post(`${url}/detail`, data);
};
