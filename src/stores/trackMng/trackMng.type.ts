export type TrackListOutput = {
    trackCourseSeq?: string,
    trackCourseNm?: string,
    useYn?: string,
    regId?: string,
    regDate?: string,
    numberSubject?: string,
    totalCredit?: string,
}

export type TrackId = {
    trackCourseSeq?: string,
}

export type TrackCre = {
    trackCourseSeq?: string,
    trackCourseNm?: string,
    trackCourseIntro?: string,
    useYn?: string,
    subjectList?: SubjectCre[],
}
export type TrackDetail = {
    trackCourseSeq?: string,
    trackCourseNm?: string,
    trackCourseIntro?: string,
    useYn?: string,
    regId?: string,
    regDate?: string,
}

export type SubjectDetail = {
    trackCourseSbjtSeq?: string,
    sbjtNm?: string,
    sbjtEng?: string,
    sbjtCd?: string,
    sustDivNm?: string,
    acqCredit?: string,
    totalHrs?: string,
    thryHrs?: string,
}

export type DetailOutput = {
    trackDetail?: TrackDetail,
    subjectDetailList?: SubjectDetail[]
}

export type SearchSubject = {
    name?: string,
    code?: string,
    classify?: string,
    credits?: string,
    page?: number,
    size?: number,
    sort?: string,
}

export type PageableModel = {
    page?: number
    size?: number
    sort?: string
}
export type SubjectCre = {
    sbjtCd?: string,
    delYn?: string,
    trackCourseSbjtSeq?: string
}