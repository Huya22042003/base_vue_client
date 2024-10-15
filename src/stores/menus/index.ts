import {defineStore} from 'pinia'
import {ref} from 'vue'
import type { ListMenuResponse, menuRequests } from './menu.type'
import { getList, getListMn } from './menu.service'
import { MESSAGE_ERROR_API } from '@/constants/common.const'


export const menuStores = defineStore('menuStores', () => {
    const list = ref([])
    const listMn= ref([])
    const fetchMenus = async (query?:any) => {
        try {
            const response = await getList<ListMenuResponse>(query)
            list.value = response.data.data
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    return {
        list,
        fetchMenus,
    }
})
