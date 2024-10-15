import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type {
    LearnComponent,
  LearnComponentDetail,
  LearnComponentRes,
  LearnComponentSearch,
  LearnComponentSeq,
} from "./learnCom.type";
import { checkBeforeDel, checkBeforeSave, detailLearnComponent, listLearnComponent } from "./learnCom.service";

export const learnComStore = defineStore("learnComStore", () => {
  const cmpnList = ref<LearnComponentRes[]>([]);
  const chldList = ref<LearnComponentDetail[]>([]);
  const status = ref<number>();
  const errorResponse = ref<any>();

  const fetchDetail = async (coreAndChild: LearnComponentSeq) => {
    try {
      const response = await detailLearnComponent(coreAndChild);
      cmpnList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const fetchList = async (coreAndChild: LearnComponentSearch) => {
    try {
      const response = await listLearnComponent(coreAndChild);
      chldList.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };
 
  const checkDel = async (com: LearnComponentRes) => {
    try {
      const response = await checkBeforeDel(com);
      
      status.value = response.status;
    } catch (error) {
        status.value = error.response.status;
        errorResponse.value = error.response.data;
    }
  };
  
  const checkDuplicate = async (com: Array<LearnComponent>) => {
    try {
      const response = await checkBeforeSave(com);
      
      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  return {
    cmpnList,
    status,
    fetchDetail,
    chldList,
    fetchList,
    checkDel,
    checkDuplicate,
    errorResponse
  };
});
