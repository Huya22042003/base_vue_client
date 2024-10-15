import { defineStore } from "pinia";
import { ref } from "vue";
import { search } from "./eduCourse/eduProcess.service";
import type {
  EduCourseResModel,
  EduCourseSearchModel,
  EduCourseDescResModel,
  EduCourseCommResModel,
  EduCourseSelResModel,
  EduCourseJobSelModel,
  MajorCapaInitModel,
  MajorCapaSelcModel,
  MajorCapaElemInitModel,
  EduCourseEvalMembInitModel,
  ElemItemSelInitModel,
  EduGoalInitModel,
  EduGoalRelevanceInitModel,
  RejectReasonModel,
} from "./eduCourse/eduProcess.type";

export const EduCourseStore = defineStore("EduCourse", () => {
  const EduCourseResModel = ref<EduCourseResModel>();
  const EduCourseResListModel = ref<any>();
  const EduCourseAppReqRes = ref<any>();
  const RejectReasonModel = ref<RejectReasonModel>();
  const EduCourseDescResModels = ref<Array<EduCourseDescResModel>>();
  const EduCourseSelResModels = ref<Array<EduCourseSelResModel>>();
  const EduCourseCommResModels = ref<Array<EduCourseCommResModel>>();
  const EduGoalInitModel = ref<EduGoalInitModel>();
  const EduGoalRelevanceInitModel = ref<EduGoalRelevanceInitModel>();
  const EduCourseJobSelModels = ref<Array<EduCourseJobSelModel>>();
  const MajorCapaInitModel = ref<MajorCapaInitModel>();
  const MajorCapaSelcModels = ref<Array<MajorCapaSelcModel>>();
  const MajorCapaElemInitModels = ref<Array<MajorCapaElemInitModel>>();
  const EduCourseEvalMembInitModel = ref<EduCourseEvalMembInitModel>();
  const ElemItemSelInitModels = ref<Array<ElemItemSelInitModel>>();
  const ProStuModels = ref<any>();
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
    RejectReasonModel,
    EduCourseDescResModels,
    EduCourseSelResModels,
    EduCourseCommResModels,
    ProStuModels,
    EduGoalInitModel,
    EduGoalRelevanceInitModel,
    EduCourseJobSelModels,
    MajorCapaInitModel,
    MajorCapaSelcModels,
    MajorCapaElemInitModels,
    EduCourseEvalMembInitModel,
    ElemItemSelInitModels,
  };
});
