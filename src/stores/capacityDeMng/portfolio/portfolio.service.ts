import http from "@/utils/http";
import type { SearchPortModel } from "./portfolio.type";
import {SITE_ADMIN} from '@/constants/common.const'

const url = `/${SITE_ADMIN}/portfolio`

export const getListPort = (data : SearchPortModel) => {
    return http.post(`${url}/list`, data);
} 

export const getListDept = () => {
    return http.get(`${url}/listDept`);
} 