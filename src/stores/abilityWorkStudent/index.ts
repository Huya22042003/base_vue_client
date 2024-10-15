import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { AbilityWorkSearchDTO, AbilityWorkStdDTO, AbilityWorkStdResponseDTO, StudentInfoDTO, SubjectInfoDTO } from "./abilityWorkStudent.type";
import { getDetailUserJobPerform, getList, getSubjectInfo } from "./abilityWorkStudent.service";

export const abilityWorkStore = defineStore("abilityWorkStore", () => {
    const status = ref<number>();
    const errorResponse = ref<any>();
    const sbjtInfo = ref<AbilityWorkStdResponseDTO>();
    const detailAbilityWork = ref<StudentInfoDTO>();
    const listAbilityWork = ref<SubjectInfoDTO>();

    const fetchSbjtInfo = async (param: AbilityWorkStdDTO) => {
        try {
          const response = await getSubjectInfo(param);
          sbjtInfo.value = response.data.data;
          status.value = response.status;
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
      };

      const fetchDetail = async (param: AbilityWorkStdDTO) => {
        try {
          const response = await getDetailUserJobPerform(param);
          detailAbilityWork.value = response.data.data;
          status.value = response.status;
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
      };

      const fetchList = async (param: AbilityWorkSearchDTO) => {
        try {
          const response = await getList(param);
          listAbilityWork.value = response.data.data;
          status.value = response.status;
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
      };
    return {
        fetchSbjtInfo,
        sbjtInfo,
        status,
        detailAbilityWork,
        fetchDetail,
        fetchList,
        listAbilityWork
    }

})