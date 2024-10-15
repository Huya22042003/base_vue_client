import type { LearningList, LearningModuleRequest, ModuleList } from "@/stores/learningModule/learningModule.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import {
  getList,
  getListModule,
  addModule,
  updateModule,
  changeUseModule, deleteModule,
} from "@/stores/learningModule/learningModule.service";

export const learningModuleStore = defineStore("learningStoreModule", () => {
  const learningList = ref<LearningList[]>([]);
  const moduleList = ref<ModuleList[]>([]);
  const status = ref<number | null>(null);

  const fetchLearningList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await getList(data);
      learningList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const fetchModuleList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await getListModule(data);
      moduleList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const addModuleList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await addModule(data);
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const updateModuleList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await updateModule(data);
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const deleteModuleList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await deleteModule(data);
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const changeUseModuleList = async (data: LearningModuleRequest) => {
    reset()
    try {
      const response = await changeUseModule(data);
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const reset = () => {
    status.value = null;
  };

  return {
    learningList,
    moduleList,
    status,
    fetchLearningList,
    fetchModuleList,
    addModuleList,
    updateModuleList,
    changeUseModuleList,
    deleteModuleList
  };
});