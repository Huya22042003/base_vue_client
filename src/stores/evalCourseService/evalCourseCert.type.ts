export type EvalCriteriaResDTO = {
    id:string;
    sectorCd:string;
    evalElemCd:string;
    factor:string;
    criteria:string;
    explain:string;
    note:string;
    scaleMet:string;
    scaleInsuf:string;
    scaleNmet:string;
    scaleSel:string;
    scoreMet:number;
    scoreInsuf:number;
    scoreNmet:number;
    scale:string;
    documentSel:string;
    ttl:string;
    document:string;
}

export type EvalCriteriaReqDTO = {
    id:string;
    scaleSel:string;
}

export type ApproveEvalCourseDetailDTO = {
    id:string;
    major:string;
    department:string;
    statusCd:string;
    status:string;
    totalScale:number;
    summaryResult:string;
    summaryOpinion:string;
    plans:EvalCriteriaResDTO[];
    dos:EvalCriteriaResDTO[];
    checks:EvalCriteriaResDTO[];
    acts:EvalCriteriaResDTO[];
}

export type ApproveEvalCourseResDTO = {
    rowNumb:string;
    id:string;
    statusCd:string;
    statusNm:string;
    major:string;
    departmentCd:string;
    department:string;
    yearEdu:string;
    registerNm:string;
    registerDate:string;
    approveNm:string;
    approveDate:string;
}

export type EducationCourseFilterDTO = {
    createdId:String;
    page:number;
    size:number;
    sort:string;
}

export type EducationCourseResDTO = {
    id:string;
    yearEdu:string;
    deptCd:string;
    department:string;
    type:string;
    created:string;
}

export type EvalCourseCertFilter = {
    major:string;
    department:string;
    yearEdu:string;
    status:string;
    page:number;
    size:number;
    sort:string;
}

export type EvalCourseOpinionFilterDTO = {
    reportId:string;
}

export type EvalCourseOpinionResDTO = {
    id:string;
    createdName:string;
    department:string;
    opinion:string;
}

export type EvalCourseRegistDTO = {
    eduYear:string;
    departmentCd:string;
}

export type EvalCourseReqDTO = {
    id:string;
    result:string;
}

export type EvalCourseResDTO = {
    rowNumb:string;
    id:string;
    statusCd:string;
    statusNm:string;
    major:string;
    departmentCd:string;
    department:string;
    yearEdu:string;
    approve:string;
    approveDate:string;
}

export type EvalEduCourseDetailDTO = {
    id:string;
    status: string;
    yearEdu:string;
    deptNm:string;
    typeEdu:string;
    countDept:string;
    mngDept:string;
    staffNm:string;
    phone:string;
    email:string;
    rslt:string;
}

export type RegistEduCourseApproveDTO = {
    id:string;
    reason:string|null;
}

export type ApproveEvalCourseReqDTO = {
    id:string;
    opinion:string;
    status:string;
    plans:EvalCriteriaReqDTO[];
    dos:EvalCriteriaReqDTO[];
    checks:EvalCriteriaReqDTO[];
    acts:EvalCriteriaReqDTO[];
}