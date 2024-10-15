export type EvalCreModel = {
    evalMethSeq?: string,
    methNm?: string,
    defN?: string,
    useYn?: string,
}

export type EvalInitModel = {
    evalMethSeq?: string,
    methNm?: string,
    defN?: string,
    useYn?: string,
    regDate?: string,
    regId?: string,
}

export type EvalIdModel = {
    evalMethSeq?: string,
}

export type PageableModel = {
    page?: number
    size?: number
    sort?: string
}
