import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {EvalCreModel, EvalInitModel, EvalIdModel, PageableModel} from "./evalMethod.type"
import {insert, list, getById, edit, deleteItem} from "./evalMethod.service"
import {MESSAGE_ERROR_API} from "../../constants/common.const"
export const evalMethodStore = defineStore('evalMethod', () => {
    const evalMethodList = ref<EvalInitModel[]>([])
    const evalMethod = ref<EvalInitModel>()
    const status = ref<number>();

    const insertEval = async (params: EvalCreModel) => {
        try {
          const response = await insert(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const listEval = async (params: PageableModel) => {
        try {
          const response = await list(params)
          evalMethodList.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const getEvalById = async (params: EvalIdModel) => {
        try {
          const response = await getById(params)
          evalMethod.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const editEval = async (params: EvalCreModel) => {
        try {
          const response = await edit(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const deleteEval = async (params: EvalIdModel) => {
      try {
        const response = await deleteItem(params)
        status.value = response.data
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API);
      }
    }

    return {
        evalMethodList,
        evalMethod,
        status,
        insertEval,
        listEval,
        getEvalById,
        editEval,
        deleteEval
    }
})
