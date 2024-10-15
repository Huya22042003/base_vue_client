export type StudentLectureResponseModel = {
    id: string
    eduYear: string
    majorNm: string
    termNm: string
    deptNm: string
    sbjtNm: string
    sustDivNm: string
    gradeNm: string
    divNm: string
    trainingMonthYear: string
}

export type StudentLectureSearchModel = {
    eduYear: string
    gradeYear: string
    termNm: string
    subjectNm: string
    staffNm: string

    page: number
    size: number
    sort: string
}

export type StudentLectureDetailResponseModel = {
    rowNumber: string
    id: string
    majorNm: string
    deptNm: string
    gradeNm: string
    stdId: string
    userNm: string
    phone: string
}

export type StudentLectureDetailSearchModel = {
    lectureId: string
    deptNm: string
    gradeNm: string
    userNm: string
    stdId: string

    page: number
    size: number
    sort: string
}

export type SelectBoxEduYearModel = {
    id: string
    upId: string
    name: string
}