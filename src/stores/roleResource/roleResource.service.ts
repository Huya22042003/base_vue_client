import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http"
import type { RoleSearchModel } from "./roleResource.type";
const url = `/${SITE_ADMIN}/role`;

export const getListData = (searchForm: RoleSearchModel) => {
    return http.post(url + '/list', searchForm)
}