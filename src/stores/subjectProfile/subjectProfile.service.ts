import http from "@/utils/http";
import {SITE_STAFF} from '@/constants/common.const'
import type { SubjectProfileSearchModel } from "./subjectProfile.type";
const url = `${SITE_STAFF}/subjectLectures`
export const getListData = (searchForm: SubjectProfileSearchModel) => {
    return http.post(url + '/list', searchForm)
} 