export type TrackInitModel = {
    rowNumber?: string;
    stdId?: string;
    userNm?: string;
    deptNm?: string;
    gradeNm?: string;
    trackCourseNm?: string;
    trackCourseSeq?: string;
    majorNm?: string;
    subjectHad?: string;
    totalSubject?: string;
    status?: string;
};

export type SearchTrack = {
    majorCd?: string;
    deptCd?: string;
    stdId?: string;
    userNm?: string;
    gradeCd?: string;
    trackCourseSeq?: string;
    status?: string;
    page?: number;
    size?: number;
    sort?: string;
};

export type TrackInfo = {
    trackCourseSeq?: string;
    trackCourseNm?: string;
};

export type TrackIdModel = {
    stdId?: string;
    trackCourseSeq?: string;
};

export type SubjectInTrack = {
    trackCourseSeq?: string;
    sbjtCd?: string;
    sbjtNm?: string;
    sbjtNmEng?: string;
    sustDivNm?: string;
    acqCredit?: string;
    thryHrs?: string;
    practiceHrs?: string;
    status?: string | undefined;
};