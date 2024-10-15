export type SelectSubjectResDTO = {
    lectCd:string;
    yearEdu:string;
    semester:string;
    department:string;
    subjectNm:string;
    sustDivNm:string;
    gradeNm:string;
    staffNm:string;
    divNm:string;
}

export type SelectSubjectFilterDTO = {
    page:number;
    size:number;
    sort:string;
}

export type SubjectCertFilterDTO = {
    yearEdu:string;
    subjectNm:string;
    teacher:string;
    type:string;
    statusCert:string;
    page:number;
    size:number;
    sort:string;
}

export type SubjectCertResDTO = {
    id:string;
    status:string;
    statusNm:string;
    typeCd:string;
    type:string;
    yearEdu:string;
    semester:string;
    department:string;
    name:string;
    fieldNm:string;
    sustDivNm:string;
    gradeNm:string;
    staffNm:string;
    year:string;
}

export type CapstoneRequestDTO = {
    idCert:string;
    fieldSubject:string;
}

export type CapstoneResponseDTO = {
    idCert:string;
    codeLect:string;
    divSubject:string;
    fieldRegister:string;
    teacher:string;
    department:string;
    yearEdu:string;
    typeSubject:string;
}

export type HyflexRequestDTO = {
    idCert:string;
    track:string;
    method:string;
    progress:string;
    week:string;
    introduce:string;
}

export type HyflexResponseDTO = {
    idCert:string;
    subjectNm:string;
    subjectCode:string;
    divSubject:string;
    teacher:string;
    department:string;
    feature:string;
    track:string;
    method:string;
    progress:string;
    week:string;
    introduce:string;
}

export type ReasonRejectResDTO = {
    approveName:string;
    department:string;
    reason:string;
}