import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type {
  DiagResultDetailEmpReqModel,
  DiagResultEmpAbiDetailSearchModel,
  DiagResultEmpAbilityReqModel,
  DiagResultEmpAbilitySearchModel,
} from "./diagnosisEmployeeResult.type";

const url = `${SITE_ADMIN}/result-diag-emp-ability`;

export const getPageResultDiagEmpAbility = (
  data: DiagResultEmpAbilitySearchModel
) => {
  return http.post(`${url}/list`, data);
};

export const detailResultDiagEmpAbility = (
  data: DiagResultEmpAbilityReqModel
) => {
  return http.post(`${url}/detail`, data);
};

export const searchStaffInfoDetailDiag = (
  data: DiagResultEmpAbiDetailSearchModel
) => {
  return http.post(`${url}/search-staff-info`, data);
};

export const getListAbility1Level = () => {
  return http.post(`${url}/list-ability-1level`);
};

export const getResultEmpDetail = (data: DiagResultDetailEmpReqModel) => {
  return http.post(`${url}/result-emp-detail`, data);
};
