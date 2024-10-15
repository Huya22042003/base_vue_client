import {defineStore} from 'pinia'
import {ref} from 'vue'

import { MESSAGE_ERROR_API } from '@/constants/common.const'
import type { Cqi, CqiInfoBasic, CqiSearch, CqiSeq, CqiSubject } from './cqi.type'
import { getBasicInfo, getDetail, getMaxYear, listCqi } from './cqi.service'

export const cqiStore = defineStore('cqiStore', () => {
    const cqiList = ref<CqiSubject>()
    const basicInfo = ref<CqiInfoBasic>()

    const cqiDetail = ref<Cqi>()
    const status = ref<number>()
    const maxYear = ref<number>()

    const fetchList = async (params: CqiSearch) => {
        try {
            const response = await listCqi(params);
            
            cqiList.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const fetchBasicInfo = async (params: CqiSeq) => {
        try {
            const response = await getBasicInfo(params);
            
            basicInfo.value = response.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const fetchDetail = async (params: CqiSeq) => {
        try {
            const response = await getDetail(params);
            
            cqiDetail.value = response.data.data
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
        cqiDetail,
        status,
        fetchDetail,
        fetchList,
        cqiList,
        basicInfo,
        fetchBasicInfo,
        fetchYear,
        maxYear
    }
})