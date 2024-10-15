import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type {
  EnvironDemandShowReqModel,
  EnvironDemandShowSaveModel,
  EnvironDemReqModel,
  EnvironDemSaveModel,
} from "./environmentDemand.type";

const url = `${SITE_ADMIN}/edu-course`;

export const detailAnalysisEnvDemand = (data: EnvironDemReqModel) => {
  return http.post(url + "/detail-analysis-env-demand", data);
};

export const detailShowEnvDemand = (data: EnvironDemandShowReqModel) => {
  return http.post(url + "/detail-show-env-demand", data);
};

export const saveAnalysisEnvDemand = (data: EnvironDemSaveModel) => {
  return http.post(url + "/save-analysis-env-demand", data);
};

export const saveShowEnvDemand = (data: EnvironDemandShowSaveModel) => {
  return http.post(url + "/save-show-env-demand", data);
};
