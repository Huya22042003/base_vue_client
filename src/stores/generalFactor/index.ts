import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AbilityCmpnElem, AbilityCoreAndChild, AbilityDetail, AbilitySearch } from './generalFactor.type'
import { checkRmAbilityCmpn, detailCoreAndChildAbility, dupAbilityCmpn, listCoreAndChildAbility } from './generalFactor.service'
import { MESSAGE_ERROR_API } from '@/constants/common.const'

export const cmpnAbiStore = defineStore('cmpnAbiStore', () => {
    const cmpnList = ref<AbilityCmpnElem[]>([])
    const coreChildList = ref<AbilityCoreAndChild[]>([])
    const status = ref<number>()
    const errorResponse = ref<any>();
  
    const fetchDetail = async (coreAndChild : AbilityDetail) => {
      try {
        const response = await detailCoreAndChildAbility(coreAndChild)
        cmpnList.value = response.data.data
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API)
      }
    }

    const fetchList = async (coreAndChild : AbilitySearch) => {
      try {
        const response = await listCoreAndChildAbility(coreAndChild)
        coreChildList.value = response.data
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API)
      }
    }

    const checkDupNm = async (params : Array<any>) => {
      try {
        const response = await dupAbilityCmpn(params)
        coreChildList.value = response.data
        status.value = response.status
      } catch (error) {
        status.value = error.response.status;
        errorResponse.value = error.response.data;
      }
    }

    const checkRmAbi = async (params : Array<any>) => {
      try {
        const response = await checkRmAbilityCmpn(params)
        coreChildList.value = response.data
        status.value = response.status
      } catch (error) {
        status.value = error.response.status;
        errorResponse.value = error.response.data;
      }
    }

    return {
      cmpnList,
      status,
      fetchDetail,
      coreChildList,
      fetchList,
      checkDupNm,
      checkRmAbi
    }
  })