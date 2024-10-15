import {defineStore} from 'pinia'
import {ref} from 'vue'

import {
    deleteRole,
    getDetailRole,
    getList,
    updateRole,
    createRole
} from './role.service'
import type {
    roles,
    roleRequests,
    ListRoleResponse
} from './role.type'
import { MESSAGE_ERROR_API } from '@/constants/common.const'

export const rolesStore = defineStore('rolesStore', () => {
    const list = ref<roles[]>([])
    const role = ref<roles>()
    const status = ref<number>()

    const fetchRoles = async (params?: any) => {
        try {
            const response = await getList(params)

            list.value = response.data.data
            status.value = response.status
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }
    const deleteRoleById = async (roleId: string) => {
        try {
            await deleteRole(roleId)
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const getDetailRoleById = async (roleId: string) => {
        try {
            const res = await getDetailRole(roleId)
            role.value = res.data.data
        } catch (error) {
            throw new Error(MESSAGE_ERROR_API);
        }
    }

    const addRole = async (params: roles) => {        
        return await createRole(params)
    }

    const editRole = async (data: roles) => {
        return await updateRole(data)
    }
    return {
        list,
        role,
        fetchRoles,
        getDetailRoleById,
        deleteRoleById,
        addRole,
        editRole,
        status,
    }
})
