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
    gradYn?: string 
    sustDivNm?: string 
    sbjtNm?: string 
    scores?: Record<string, number>
    link?: string;
    diagSeq?: string;
    yearTerm?: string;
}

export type IdModel = {
    id?: string
}

export type DataChart = {
    learnAbilitySeq?: string 
    learnAbilityNm?: string 
    studentScore?: number 
    mediumScore?: number 
}