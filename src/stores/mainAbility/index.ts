import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import {
  checkDupCoreAbility,
  checkRemoveChildAbility,
  checkRemoveCoreAbility,
  listCoreAbility,
} from "./mainAbility.service";
import type { CoreAbility } from "./mainAbility.type";

export const coreAbiStore = defineStore("roleStore", () => {
  const coreList = ref<CoreAbility[]>([]);
  const status = ref<number>();
  const errorResponse = ref<any>();

  const fetchList = async () => {
    try {
      const response = await listCoreAbility();
      coreList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const checkRemoveCore = async (item: CoreAbility) => {
    try {
      const response = await checkRemoveCoreAbility(item);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkRemoveChild = async (item: CoreAbility) => {
    try {
      const response = await checkRemoveChildAbility(item);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkDupName = async (item: Array<CoreAbility>) => {
    try {
      const response = await checkDupCoreAbility(item);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  return {
    coreList,
    status,
    fetchList,
    checkRemoveCore,
    checkRemoveChild,
    errorResponse,
    checkDupName,
  };
});
