import type { EduCourseDescResDTO, EduCourseSelResDTO } from "../eduCourse/eduProcess.type";

export type SelectStaffFilterDTO = {
    name: string;
    page: number;
    size: number;
    sort: string;
}

export type StaffInfoResDTO = {
    id: string;
    code: string;
    nm: string;
    affli: string;
    major: string;
    posi: string;
}

export type EduCourseCommFilterDTO = {
    eduCourseSeq: string;
}

export type EduCourseCommResDTO = {
    commSeq: string;
    divCd: string;
    id: string;
    nm: string;
    affli: string;
    major: string;
    eduCourseSeq: string;
    posi: string;
    remark: string;
}

export type EduCourseCommReqDTO = {
    commSeq: string;
    divCd: string;
    id: string;
    nm: string;
    affli: string;
    major: string;
    eduCourseSeq: string;
    posi: string;
    remark: string;
    delYn: string;
}

export type EduGoalFilterDTO = {
    eduCourseSeq: string;
}

export type EduGoalResDTO = {
    eduGoalSeq: string;
    eduYear: string;
    divCd: string;
    cont: string;
}

export type TypeTalentGoalResDTO = {
    schEduGoal:EduGoalResDTO[];
    deptEduGoal:EduGoalResDTO[];
    eduSel: EduCourseSelResDTO[];
    eduDesc: EduCourseDescResDTO[];
}

export type TaltNrtgFilterDTO = {
    eduCourseSeq: string;
}

export type TaltNrtgSelResDTO = {
    taltNrtgTypeSeq: string;
    typeNm: string;
    taltNrtgSelcSeq: string;
    jobImpt: Number;
    jobOl: Number;
    employFruitage: Number;
    deptVisn: Number;
    eduEfft: Number;
    majCd: string;
    majNm: string;
    selCd: string;
    selNm: string;
    check: Boolean;
}

export type TaltNrtgResDTO = {
    taltNrtgSeq: string;
    eduCourseSeq: string;
    evalDate: string;
    evalPartiCnt: Number;
    jobField: string;
    eduCourseType: string;
    taltNrtgSel: TaltNrtgSelResDTO[];
}

export type CoreJobFilterDTO = {
    eduCourseSeq: string;
}

export type CoreJobSelDTO = {
    jobSeq: string;
    taltNrtgTypeSeq: string;
    coreJobSelcSeq: string;
    eduCurseSeq: string;
    jobNm: string;
    typeNm: string;
    defn: string;
    visn: number;
    impt: number;
    psbl: number;
    factSutb: number;
    matlSutb: number;
    prfr: number;
    selcCd: string;
    check: Boolean;
}

export type AsisTobeEduCourseResDTO = {
    indexEduCourse: EduCourseSelResDTO[];
    eduCourseType: string;
    eduCourseJob: string;
    indexEduCourseDesc: EduCourseSelResDTO[];
    eduCourseTypeDesc: string;
    eduCourseJobDesc: string;
    taltNrtgSeq: string;
    asisLimits: string;
    tobeCursListDivCd: string;
    tobeTaltNrtgTypeDivCd: string;
    tobeCoreJobDivCd: string;
    tobeRsn: string;
}

export type ResultEduCourseResDTO = {
    eduCourseSeq: string;
    asisEduCourse: AsisTobeEduCourseResDTO;
    tobeEduCourse: AsisTobeEduCourseResDTO;
}

export type ResultEduCourseFilterDTO = {
    eduCourseSeq: string;
}

export type ResultEduCourseReqDTO = {
    eduCourseSeq: string;
    asisLimits: string;
    tobeCursListDivCd: string;
    tobeTaltNrtgTypeDivCd: string;
    tobeCoreJobDivCd: string;
    tobeRsn: string;
}