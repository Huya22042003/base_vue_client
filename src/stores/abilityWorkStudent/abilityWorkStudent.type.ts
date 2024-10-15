export type AbilityWorkStdResponseDTO = {
    subjectInfo: SubjectInfoDTO;
    jobCapaUnitList: JobCapaUnitDTO[];
    studentInfoList: StudentInfoDTO[];
}

export type JobCapaUnitDTO = {
    jobAbilSeq: string;
    jobAbilNm: string;
    jobCapaUnitSeq: string;
    capaUnitNm: string;
    userJobPerformEvalScoreSeq: string;
    score: number;
}

export type StudentInfoDTO = {
    rowNum: number;
    stdId: string;
    stdNm: string;
    attendScore: number;
    shregStsNm: string;
    jobCapaUnitList: JobCapaUnitDTO[];
}

export type SubjectInfoDTO = {
    lectCd: string;
    sbjtNm: string;
    deptNm: string;
    yearTerm: string;
    gradeDiv: string;
    acqJpaTotalHour: string;
    thryPrac: string;
    sustDivNm: string;
    staffNm: string;
    numStudent: number;
    regDate: string;

    // List
    uniNm: string;
    eduYear: string;
    status: string;
    userJobPerformEvalSeq: string;
    tempSaveYn: string;
}


export type AbilityWorkStdDTO = {
    lectCd: string;
    userJobPerformEvalSeq: string;
}

export interface UserJobPerformEvalReqDTO {
    userJobPerformEvalSeq: string;
    lectCd: string;
    tempSaveYn: string;
    finalGradeConfrmYn: string;
    studentInfoList: StudentInfoDTO[];
}

export type AbilityWorkSearchDTO = {
    year: string;
    term: string;
    sbjtNm: string;
    status:string;
    page: number;
    size: number;
    sort: string;
}
