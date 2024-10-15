import http from "@/utils/http"
import {SITE_ADMIN} from '@/constants/common.const'
import type { ResourceRoleRequestModel } from "./resourceRole.type"

const url = `${SITE_ADMIN}/resources-roles`
export const findResourceRoleById = (id: string) => {
    return http.post(url +  '/', id)
}

export const createResourceRole = (data: ResourceRoleRequestModel) => {
    return http.post(url +  '/createResourceRole', data)
}