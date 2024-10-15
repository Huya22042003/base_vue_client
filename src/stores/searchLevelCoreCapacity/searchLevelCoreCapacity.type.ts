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
export type CoreModel = {
    index?: number
    coreAbilitySeq?: string
    coreAbilityNm?: string
    diagNm?: string
    yearNm?: string
    chldList?: Array<ChldModel>
}

export type ChldModel = {
    index?: number
    chldAbilitySeq?: string
    chldAbilityNm?: string
    coreAbilitySeq?: string
    elemList?: Array<ElemMdel>
}

export type ElemMdel = {
    index?: number
    answerLevel?: string
    cmpnElemSeq?: string
    elemNm?: string
    chldAbilitySeq?: string
}

export type ResultIdModel = {
    id?: string,
    stdId?: string
}