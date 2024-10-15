import http from '@/utils/http'
import {SITE_ADMIN} from "@/constants/common.const";
import type {LookupEvaluationPlanSearch} from "@/stores/lookupEvaluationPlan/lookupEvaluationPlan.type";

const url = `${SITE_ADMIN}/evalPlanSearch`;

export const getList = (data: LookupEvaluationPlanSearch) => {
  return http.post(`${url}/`, data);
}