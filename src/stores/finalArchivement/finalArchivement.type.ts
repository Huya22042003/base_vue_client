export type FinalAchiSearchModel = {
    sbjtNm: string
    page: number
    size: number
    sort: string
    yearEdu: string
    termEdu: string
    status: string
}

export type LectInfoIdModel = {
    lecCd: string
    userJobPerformEvalSeq: string
}

export type FinalAchiListModel = {
    creYear: string
    deptNm: string
    uniNm: string
    sbjtNm: string
    yearEdu: string
    gradeNm: string
    divNm: string
    status: string
    lectCd: string
    userJobPerformEvalSeq: string
    finalGradeConfrmYn: string
    staffNm: string
    sbjtCd: string
    termNm: string
    sustDivNm: string
    jobCapaEvalStrDate:string
    jobCapaEvalEndDate:string
    
}

export type FinalAchiRltModel = {
    apCnt: string
    bpCnt: string
    cpCnt: string
    dpCnt: string
    fCnt: string
    apRate: string
    bpRate: string
    cpRate: string
    dpRate: string

    fRate: string
    a0Cnt: string
    b0Cnt: string
    c0Cnt: string
    d0Cnt: string
    a0Rate: string
    b0Rate: string
    c0Rate: string
    d0Rate: string

    bigB0: string
    percentBigB0: string
    scoreMedi: string
    evalType: string
    bigA0: string
    percentBigA0: string
    cntStd: string

}

export type FinalAchiMngModel = {
    rowNum: string
    stdNm: string
    stdId: string
    shregStsNm: string
    divNm: string
    attendScore: string
    ranking: string
    rankRate: string
    finalScore: string
    level: string
}

export type FinalAchiDetailModel = {
    cntStd: number
    aveScore: string
    abilArchEvalRlstInfoDTO: FinalAchiRltModel
    achievementMngDTOList: []
    studentScoreListDTOList: []
}

export type UserJobModel = {
    userJobPerformEvalSeq: string
    finalGradeConfrmYn: string
}

export type StdScoreListModel = {
    stdId: string
    scoreList: string
} 