import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  LookupEvaluationPlan,
  LookupEvaluationPlanSearch
} from "@/stores/lookupEvaluationPlan/lookupEvaluationPlan.type";
import { getList } from "@/stores/lookupEvaluationPlan/lookupEvaluationPlan.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";


export const lookupEvaluationPlanStore = defineStore("lookupEvaluationPlan", () => {
  const list = ref<LookupEvaluationPlan[]>([])
  const status = ref<number>()

  const fetchList = async (data: LookupEvaluationPlanSearch) => {
    try {
      const response = await getList(data);
      list.value = response.data.data
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  }

  return {
    list,
    fetchList,
    status
  }
})