export type EvalReportMngResDTO = {
    reportSeq:string;
    deptCd:string;
    deptNm:string;
    majorNm:string;
    yearEdu:string;
    statusCd:string;
    statusNm:string;
    regId:string;
    regDate:string;
}

export type EvalReportMngFilterDTO = {
    major:string;
    department:string;
    year:string;
    status:string;
    page:number;
    size:number;
    sort:string;
}

export type EvalReasonRejectResDTO = {
    id:string;
    userCreated:string;
    departCreated:string;
    reason:string;
}

export type EvalReasonRejectReqDTO = {
    id:string;
    reason:string;
}

export type EvalCriteriaReqDTO = {
    id:string;
    reason:string;
}

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
    scale:string;
    documentSel:string;
    ttl: string;
    document:string;
    fileUpLoad: Array<any>;
}

export type EvalDetailFilter = {
    idDept: string;
    year: string;
}

export type EvalFactorReqDTO = {
    id:string;
    departmentCd:string;
    year:string;
    plans:EvalCriteriaReqDTO[];
    dos:EvalCriteriaReqDTO[];
    checks:EvalCriteriaReqDTO[];
    acts:EvalCriteriaReqDTO[];
}

export type EvalFactorResDTO = {
    id:string;
    status: string;
    plans:EvalCriteriaResDTO[];
    dos:EvalCriteriaResDTO[];
    checks:EvalCriteriaResDTO[];
    acts:EvalCriteriaResDTO[];
}