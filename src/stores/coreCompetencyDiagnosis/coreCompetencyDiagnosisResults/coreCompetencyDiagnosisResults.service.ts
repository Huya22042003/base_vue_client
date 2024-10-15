import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultChartGraphicReqModel,
  DiagResultCoreAbilityReqModel,
  ResultDiagCoreAbilitySearchModel,
} from "./coreCompetencyDiagnosisResults.type";

const url = `${SITE_ADMIN}/result-diag-core-ability`;

export const getPageResultDiagCoreAbility = (
  data: ResultDiagCoreAbilitySearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagCoreAbility = (
  data: DiagResultCoreAbilityReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const getDataChartGraphicDiagCoreAbility = (
  data: DiagResultChartGraphicReqModel
) => {
  return http.post(`${url}/chart-graphic`, data);
};

export const getListCoreAbility = () => {
  return http.post(`${url}/list-core-ability`);
};

export const downloadExelDiagCoreAbility = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: 'blob' });
};
