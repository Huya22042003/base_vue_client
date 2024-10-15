import http from "@/utils/http";
import {SITE_ADMIN} from '@/constants/common.const'
const url = `${SITE_ADMIN}/category`
export const getListData = (searchForm :any) => {
    return http.post(url + '/list', searchForm)
} 