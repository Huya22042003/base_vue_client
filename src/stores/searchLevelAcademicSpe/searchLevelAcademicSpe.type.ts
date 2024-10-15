export type SearchModel = {
    major?: string 
    deptNm?: string 
    status?: string 
    studyYn?: string 
    stdId?: string 
    sexCd?: string 
    grade?: string
    page?: number;
    size?: number;
    sort?: string; 
}

export type DiagTargetMemberModel = {
    major?: string 
    deptNm?: string 
    userNm?: string 
    stdId?: string 
    sexNm?: string 
    gradeNm?: string 
    shregStsNm?: string 
    sustDivNm?: string 
    gradYn?: string 
    sbjtNm?: string 
    scores?: Record<string, number>
    link?: string;
    diagSeq?: string;
    yearNm?: string;
}

export type IdModel = {
    id?: string
    deptCd?: string
}

export type DataChart = {
    majorCapaSeq?: string 
    majorCapaNm?: string 
    studentScore?: number 
    mediumScore?: number 
}