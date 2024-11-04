import { defineStore } from "pinia";
import { ref } from "vue";
import { search } from "./eduCourse/eduProcess.service";
import type {
  EduCourseResModel,
  EduCourseSearchModel,
} from "./eduCourse/eduProcess.type";

export const EduCourseStore = defineStore("EduCourse", () => {
  const EduCourseResModel = ref<EduCourseResModel>();
  const EduCourseResListModel = ref<any>();
  const EduCourseAppReqRes = ref<any>();
  const id = ref<string>();
  const status = ref<number>();

  const getAll = async (params: EduCourseSearchModel) => {
    try {
      const response = await search(params);
      EduCourseResListModel.value = response.data.data;
      status.value = response.status;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    getAll,
    status,
    id,
    EduCourseResListModel,
    EduCourseResModel,
    EduCourseAppReqRes,
  };
});
