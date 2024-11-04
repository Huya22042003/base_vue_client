// Edu Course Model
export type EduCourseResModel = {
    eduCursSeq: string;
    year: string;
    gradeNm: string;
    deptNm: string;
    eduCourseTypeNm: string;
    progStepNm: string;
    stsNm: string;
    stsCd: string;
    version: string;
    regBy: string;
    regDate: string;
    checkedFlag: boolean;
    checkedShow: boolean;
    isSave: boolean;
}

export type EduCourseReqModel = {
    deptCd: string
    year: string
    eduCourseTypeSeq: any
}
  
export type EduCourseSearchModel = {
    page : number
    size : number
    sort : string
    year: string
    gradeCd: string
    deptCd: any
    verCd: string
}

export type EduCourseDetailReqDTO = {
    eduCourseSeq: string
}

export type EduCourseDetailDTO = {
    eduCourseSeq: string;
    year: string;
    deptCd: string;
    deptNm: string;
    stage: string;
    parentStage: string;
    stsCd: string;
    typeNm: string;
    version: string;
}

export type EduCourseSelReqDTO = {
    dataCd: string;
    dataNm: string;
    selCd: string;
    refrSeq: string;
    etc: string;
    eduCourseSeq: string;
}

export type EduCourseDescSelDTO = {
    upCdId: string[];
    refrSeq: string;
    eduCourseSeq: string;
}

export type EduCourseSelRegistDTO = {
    proStep: string;
    eduCourseSelReqDTOs: EduCourseSelReqDTO[];
    eduCourseDescSelDTO: EduCourseDescSelDTO;
}

export type EduCourseSelResDTO = {
    dataCd: string;
    dataNm: string;
    selCd: string;
    refrSeq: string;
    refrNm: string;
    etc: string;
    eduCourseSeq: string;
}

export type EduCourseDescResDTO = {
    dataSeq: string;
    dataCd: string;
    dataNm: string;
    cont: string;
    refrSeq: string;
    eduCourseSeq: string;
}

export type EduCourseDescReqDTO = {
    dataSeq: string;
    dataCd: string;
    dataNm: string;
    proStep: string;
    cont: string;
    refrSeq: string;
    eduCourseSeq: string;
}