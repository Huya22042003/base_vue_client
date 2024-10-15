import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultChartGraphicReqModel,
  DiagResultLearnAbilityReqModel,
  ResultDiagLearnAbilitySearchModel,
} from "./diagLearnAbilityResult.type";

const url = `${SITE_ADMIN}/result-diag-learn-ability`;

export const getPageResultDiagLearnAbility = (
  data: ResultDiagLearnAbilitySearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagLearnAbility = (
  data: DiagResultLearnAbilityReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const getDataChartGraphicDiagLearnAbility = (
  data: DiagResultChartGraphicReqModel
) => {
  return http.post(`${url}/chart-graphic`, data);
};

export const getListLearnAbility = () => {
  return http.post(`${url}/list-learn-ability`);
};

export const downloadExelDiagLearnAbility = (data: any) => {
  return http.post(`${url}/excel-download`, data, { responseType: "blob" });
};
