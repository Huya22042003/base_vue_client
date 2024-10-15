export type ProfCreModel = {
    profLearnSeq?: string,
    methNm?: string,
    defN?: string,
    useYn?: string,
}

export type ProfInitModel = {
    rowNumber?: number,
    profLearnSeq?: string,
    methNm?: string,
    defN?: string,
    useYn?: string,
    regDate?: string,
    regId?: string,
}

export type ProfIdModel ={
    profLearnSeq?: string,
}

export type PageableModel = {
    page?: number
    size?: number
    sort?: string
}