export type SubjectProfileResponseModel = {
    rowNumBer: Number
    eduYear: string
    deptNm: string
    sbjtNm: string
    sbjtCd: string
    sustDivNm: string
    gradeNm: string
    termNm: string
    staffNm: string
};


export type SubjectProfileSearchModel = {
    sbjtNm: string
    sbjtCd: string 
    sustDvCd: string | null
    gradeCd: string | null
    termCd: string | null
    page: number
    size: number
    sort: string
};
