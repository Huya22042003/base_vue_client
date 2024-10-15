import http from "@/utils/http";
import {SITE_ADMIN} from '@/constants/common.const'
import type {EduCourseNewSbjtModel, SbjtCandFormModel, SbjtStateFormModel} from '@/stores/designAndDevelopment/designAndDevelopment.type'
import type {PageableModel} from '@/stores/common.type'
import type { EduCourseSeqModel } from "../eduProcessCreation/eduCourse/eduProcess.type";
const url = `${SITE_ADMIN}/design-and-devlopment`

export const getSubjectInfoList = () => {
    return http.get(`${url}/subject`);
}

export const getSubjectRegistedInfoList = (eduCourseSeq: String) => {
    return http.get(`${url}/${eduCourseSeq}`);
}

export const createNewListSubject = (eduCourseNewSbjtDtoList: Array<EduCourseNewSbjtModel>) =>{
    return http.post(`${url}`,eduCourseNewSbjtDtoList)
}

export const deleteSubject = (sbjtSeq: String) =>{
    return http.put(`${url}/${sbjtSeq}`)
}

export const getSubjectInfoGrid = (pageDto: PageableModel) => {
   return http.post(`${url}/list/sbj`, pageDto);
}

export const getMajorAbilityInfo = (eduCourseSeq: String) =>{
    return  http.get(`${url}/majorAbilty/${eduCourseSeq}`);
}

export const createSbjtCand = (param: SbjtCandFormModel) =>{
    return  http.post(`${url}/sbjtCand`, param);
}

export const getSbjtCand = (param: EduCourseSeqModel) =>{
    return  http.post(`${url}/sbjtCandList`, param);
}

export const createSbjtState = (param: SbjtStateFormModel) =>{
    return  http.post(`${url}/sbjtState`, param);
}

export const getSbjtState = (param: EduCourseSeqModel) =>{
    return  http.post(`${url}/sbjtStateList`, param);
}

export const getSbjtSchedule = (param: EduCourseSeqModel) =>{
    return  http.post(`${url}/schedule`, param);
}

export const getVerification = (param: EduCourseSeqModel) =>{
    return  http.post(`${url}/verification`, param);
}
