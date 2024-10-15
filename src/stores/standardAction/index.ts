import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AbilityCmpnElemItem, AbilityCmpnElemItemResponse, AbilityItemSearch, AbilityItemSeq, CoreAndChild } from './standDardAction.type'
import { codeAndChildList, detailAbilityCmpnElemItem, listAbilityCmpnElemItem } from './standDardAction.service'
import { MESSAGE_ERROR_API } from '@/constants/common.const'

export const standActionStore = defineStore('standActionStore', () => {
    const cmpnItemList = ref<AbilityCmpnElemItem[]>([])
    const coreChild = ref<CoreAndChild[]>([])
    const cmpnItem = ref<AbilityCmpnElemItemResponse>()
    
    const status = ref<number>()
  
    const fetchList = async (coreAndChild : AbilityItemSearch) => {
      try {
        const response = await listAbilityCmpnElemItem(coreAndChild)
        cmpnItemList.value = response.data
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API)
      }
    }

    const fetchDetail = async (itemSeq : AbilityItemSeq) => {
      try {
        const response = await detailAbilityCmpnElemItem(itemSeq)
        cmpnItem.value = response.data.data
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API)
      }
    }

    const fetchSearch = async () => {
      try {
        const response = await codeAndChildList()
        coreChild.value = response.data.data
        status.value = response.status
      } catch (error) {
        throw new Error(MESSAGE_ERROR_API)
      }
    }

    

    return {
    cmpnItemList,
      status,
      fetchList,
      fetchDetail,
      cmpnItem,
      fetchSearch,
      coreChild
    }
  })