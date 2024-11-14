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