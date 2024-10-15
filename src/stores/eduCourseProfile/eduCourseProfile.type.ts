import type { EduCourseSelReqModel } from "../eduProcessCreation/eduCourse/eduProcess.type"

export type EduCoursePrflPageInitModel = {
    eduCoursePrflPageResDTOS : any
    profileStatisticDTO: ProfileStatisticModel
}

export type ProfileStatisticModel = {
    total: number
    area: number
    capacity: number
    future: number
    startUp: number
    global: number
}
  
export type EduCoursePrflSearchModel = {
    page : number
    size : number
    sort : string
    eduCourseSeq: string
    sbjtCd: string
    sbjtNm: any
    sbjtStt: string
    sustDivCd : string
    termCd: string
    gradeCd: string
    createdStt: any
}

export type EduCoursePrflReqModel = {
    sbjtCd : string

    priSbjtCd : string

    classType1Cd : string

    classType2Cd : string

    sbjtOver : string

    sbjtGoal : string

    sbjtMainCont : string

    labe : string

    evalMethSeqMidt : string

    evalMethSeqLast : string

    evalMethSeqOcca : string

    evalMethSeqAssi : string

    evalMethSeqAttend : string

    eduCourseSeq : string

    isLast : boolean

    eduCourseSelReqDTOS : Array<EduCourseSelReqModel>

    eduCourseArchStnrdDTOS : Array<EduCourseArchStnrdModel>
}

export type EduCourseArchStnrdModel = {
    eduCourseSeq: string
    archStnrdCd: string
    itemSeq: string
}

export type EduCoursePrflSelModel = {
    eduCourseSeq: string
    sbjtCd: string
    prflSeq: string
}

export type EduCoursePrflResModel = {
    eduCourseSeq : string

    sbjtCd : string

    sbjtNm : string

    sbjtNmEng : string

    sustDivNm : string

    priSbjtCd : string

    priSbjtNm : string

    thryHrs : string

    practiceHrs : string

    classType1Cd : string

    classType2Cd : string

    sbjtStt : string

    openRsn : string

    sbjtOver : string

    sbjtGoal : string

    sbjtMainCont : string

    labe : string

    evalMethSeqAttend : string

    evalMethSeqMidt : string

    evalMethSeqLast : string

    evalMethSeqOcca : string

    evalMethSeqAssi : string

    evalMethMidtNm : string

    evalMethLastNm : string

    evalMethOccaNm : string

    evalMethAssiNm : string

    evalMethAttendNm : string

    prflSeq : string

    proEvalMeth: any

    archStnrdInitDTOS : Array<ArchStnrdInitModel>

    profileEvalMethodDTOS : Array<ProfileEvalMethodModel>
}

export type ArchStnrdInitModel = {
    majorCapaSeq : string

    majorCapaNm : string

    chldCapaSeq : string

    chldCapaNm : string

    cmpnElemSeq : string

    elemNm : string

    itemSeq : string

    actnIndi : string

    archStnrdCd : string
}

export type ProfileEvalMethodModel = {
    evalMethSeq: string
    methNm: string
}

export type SbjtSearchModel = {
    page : number

    size : number

    sort : string

    curSbjtCd: string

    sbjtCd: string

    sbjtNm: string

    sustDivCd: string

    credit: any

    eduCourseSeq: string
}

export type SbjtResModel = {
    sbjtCd: string

    sbjtNm: string

    sustDivNm: string

    credit: number
}
