import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EduCoursePrflPageInitModel, EduCoursePrflReqModel, EduCoursePrflResModel, EduCoursePrflSearchModel, EduCoursePrflSelModel, SbjtSearchModel } from './eduCourseProfile.type'
import { findEduCoursePrfl, findEduCourseSbjt, insertEduCoursePrfl, searchEduCoursePrfl } from './eduCourseProfile.service'

export const EduCourseProfileStore = defineStore('EduCourseProfile', () => {
    const EduCoursePrflResModel = ref<EduCoursePrflResModel>()
    const EduCoursePrflPageInitModel = ref<EduCoursePrflPageInitModel>()
    const SbjtResModelPage = ref<any>()
    const status = ref<number>()
  
    const getAll = async (params: EduCoursePrflSearchModel) => {
        try {
            const response = await searchEduCoursePrfl(params)
            EduCoursePrflPageInitModel.value = response.data.data
            status.value = response.status
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const createEduCoursePrfl = async (params: EduCoursePrflReqModel) => {
        try {
            const response = await insertEduCoursePrfl(params)
            status.value = response.status
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const getEduCoursePrfl = async (params: EduCoursePrflSelModel) => {
        try {
            const response = await findEduCoursePrfl(params)
            EduCoursePrflResModel.value = response.data.data
            status.value = response.status
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const getEduCourseSbjt = async (params: SbjtSearchModel) => {
        try {
            const response = await findEduCourseSbjt(params)
            SbjtResModelPage.value = response.data.data
            status.value = response.status
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    return {
        getAll,
        createEduCoursePrfl,
        getEduCoursePrfl,
        getEduCourseSbjt,
        EduCoursePrflPageInitModel,
        EduCoursePrflResModel,
        SbjtResModelPage,
        status
    }
})
  