import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultDetailProfReqModel,
  DiagResultProfAbiDetailSearchModel,
  DiagResultProfAbilityReqModel,
  DiagResultProfAbilitySearchModel,
} from "./profAbilityLecturerResult.type";

const url = `${SITE_ADMIN}/result-diag-prof-ability`;

export const getPageResultDiagProfAbility = (
  data: DiagResultProfAbilitySearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagProfAbility = (
  data: DiagResultProfAbilityReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const searchStaffInfoDetailDiag = (
  data: DiagResultProfAbiDetailSearchModel
) => {
  return http.post(`${url}/search-staff-info`, data);
};

export const getListWisePrideAbility = () => {
  return http.post(`${url}/list-wise-pride`);
};

export const getResultProfDetail = (data: DiagResultDetailProfReqModel) => {
  return http.post(`${url}/result-prof-detail`, data);
};
