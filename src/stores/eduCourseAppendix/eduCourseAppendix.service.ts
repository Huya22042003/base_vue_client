import http from '@/utils/http'
import { SITE_ADMIN } from "@/constants/common.const";
import type { EduCourseApdxModel, EduCourseDocSearchModel } from './eduCourseAppendix.type';
import type { EduCourseSeqModel } from '../eduProcessCreation/eduCourse/eduProcess.type';

const url = `${SITE_ADMIN}/appendix/`

export const getEduDocByEducourse = (data: EduCourseDocSearchModel) => {
    return http.post(url + 'list', data)
}

export const getAppendixByEducourse = (data: EduCourseSeqModel) => {
    return http.post(url + 'apdx', data)
}

export const createEducourseAppendix = (data: EduCourseApdxModel) => {
    return http.post(url, data)
}