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
    countAction?: string 
    scores?: Record<string, number>
    link?: string;
    diagSeq?: string;
    yearNm?: string;
    diagNm?: string;
}

export type IdModel = {
    id?: string
}
export type MajorModel = {
    index?: number
    majorCapaSeq?: string
    majorCapaNm?: string
    diagNm?: string
    yearNm?: string
    majorQusList?: Array<MajorQusModel>
}

export type MajorQusModel = {
    index?: number
    majorCapaSeq?: string
    qusNumOrd?: string
    answerLevel?: string
}

export type ResultIdModel = {
    id?: string,
    stdId?: string
}