import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {ProfCreModel, ProfInitModel, ProfIdModel, PageableModel} from "./profLearn.type"
import {insert, list, getById, edit, deletePro} from "./profLearn.service"
import {MESSAGE_ERROR_API} from "../../constants/common.const"

export const profLearnStore = defineStore('profLearn', () => {
    const profLearnList = ref<ProfInitModel[]>([])
    const profLearn = ref<ProfInitModel>()
    const status = ref<number>();

    const insertProf = async (params: ProfCreModel) => {
        try {
          const response = await insert(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const listProf = async (params: PageableModel) => {
        try {
          const response = await list(params)
          profLearnList.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const getProfById = async (data: ProfIdModel) => {
        try {
          const response = await getById(data)
          profLearn.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const editProf = async (params: ProfCreModel) => {
        try {
          const response = await edit(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const deleteProf = async (data: ProfIdModel) => {
      try {
        const response = await deletePro(data)
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API);
      }
    }

    return {
        insertProf,
        listProf,
        getProfById,
        editProf,
        status,
        profLearnList,
        profLearn,
        deleteProf
    }
})
