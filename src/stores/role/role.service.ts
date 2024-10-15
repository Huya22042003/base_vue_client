import http from '@/utils/http'
import type {Roles} from './role.type'
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/roles`;

export const getList = async (param: any) => {
    return await http.post(`${url}/list`, param)
}

export const getDetailRole = async (params: Roles) => {
    return await http.post(`${url}/detail`, params)
}

export const createRole = async (params: Roles) => {

    return await http.post(`${url}/`, params)
}

export const updateRole = async (data: Roles) => {
    return await http.put(`${url}/`, data)
}

export const deleteRole = async (roleId: Array<string>) => {
    return await http.delete(`${url}/${roleId}`)
}
