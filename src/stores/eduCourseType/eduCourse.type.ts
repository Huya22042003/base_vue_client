export type EduCreModel = {
    eduCourseTypeSeq?: string,
    typeNm?: string,
    defN?: string,
    useYn?: string,
}

export type EduInitModel = {
    eduCourseTypeSeq?: string,
    typeNm?: string,
    defN?: string,
    useYn?: string,
    regDate?: string,
    regId?: string,
}

export type EduIdModel ={
    eduCourseTypeSeq?: string
}

export type PageableModel = {
    page?: number
    size?: number
    sort?: string
}