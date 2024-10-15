import {defineStore} from 'pinia'
import {ref} from 'vue'

import { MESSAGE_ERROR_API } from '@/constants/common.const'
import { detailPlan, getInfo, getMaxYear, listPlan } from './planDoc.service'
import type { LectPlanRes, PlanDocRequest, ProfReq, SubjectPlan, SubjectPlanSearch } from './planDoc.type'

export const teachPlan = defineStore('teachPlan', () => {
    const profListSt = ref<LectPlanRes>()
    const profDetail = ref<PlanDocRequest>()
    const profSubjectList = ref<SubjectPlan>()
    const status = ref<number>()
    const maxYear = ref<number>()

    const fetchProf = async (params: ProfReq) => {
        try {
            const response = await getInfo(params);
            
            profListSt.value = response.data.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const fetchDetail = async (params: ProfReq) => {
        try {
            const response = await detailPlan(params);
            
            profDetail.value = response.data.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const fetchList = async (params: SubjectPlanSearch) => {
        try {
            const response = await listPlan(params);
            
            profSubjectList.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const fetchYear = async () => {
        try {
            const response = await getMaxYear();
            
            maxYear.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }


    return {
        profListSt,
        fetchProf,
        status,
        profDetail,
        fetchDetail,
        fetchList,
        profSubjectList,
        fetchYear,
        maxYear
    }
})