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
export type LearnModel = {
    index?: number
    learnAbilitySeq?: string
    learnAbilityNm?: string
    diagNm?: string
    yearNm?: string
    chldList?: Array<ChldModel>
}

export type ChldModel = {
    index?: number
    learnAbilityChldAbilitySeq?: string
    chldAbilityNm?: string
    learnAbilitySeq?: string
    learnComponentList?: Array<LearnComponent>
}

export type LearnComponent = {
    index?: number
    answerLevel?: string
    learnComponentSeq?: string
    learnComponentNm?: string
    learnAbilityChldAbilitySeq?: string
}

export type ResultIdModel = {
    id?: string,
    stdId?: string
}