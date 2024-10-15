import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {EduInitModel, EduCreModel, EduIdModel, PageableModel} from "./eduCourse.type"
import {insert, list, getById, edit, deleteData} from "./eduCourse.service"
import {MESSAGE_ERROR_API} from "../../constants/common.const"
export const eduCourseStore = defineStore('eduCourse', () => {
    const eduCourseList = ref<EduInitModel[]>([])
    const eduCourse = ref<EduInitModel>()
    const status = ref<number>();

    const insertEdu = async (params: EduCreModel) => {
        try {
          const response = await insert(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const listEdu = async (data: PageableModel) => {
        try {
          const response = await list(data)
          eduCourseList.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const getEduById = async (data: EduIdModel) => {
        try {
          const response = await getById(data)
          eduCourse.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const editEdu = async (params: EduCreModel) => {
        try {
          const response = await edit(params)
          status.value = response.data
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }
    const deleteItem = async (data: EduIdModel) => {
      try {
        const response = await deleteData(data)
        status.value = response.data
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API);
      }
  }
    return {
        eduCourseList,
        eduCourse,
        status,
        insertEdu,
        listEdu,
        getEduById,
        editEdu,
        deleteItem
    }
})
