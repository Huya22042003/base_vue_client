export type SearchCurr = {
    page?: number,
    size?: number,
    sort?: string
}

export type CurrInfo = {
    currDivSeq?: string,
    currDivNm?: number,
    trackDiv?: string,
    useYn?: number,
    regNm?: string,
    regDate?: string,
    defn?: string
}

export type CurrReg = {
    currDivSeq?: string,
    trackDiv?: string,
    currDivNm?: string,
    defn?: string,
    useYn?: string,
}