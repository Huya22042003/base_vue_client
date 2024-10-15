export type SearchCurr = {
    deptNm?: string,
    currNm?: string,
    page?: number,
    size?: number,
    sort?: string
}

export type CurrInfo = {
    currDivSeq?: string,
    deptNm?: string,
    currDivNm?: number,
    useYn?: number,
    regNm?: string,
    regDate?: string,
    defn?: string
}

export type DeptInfo = {
    deptCd?: string,
    deptNm?: string,
}

export type CurrReg = {
    currDivSeq?: string,
    deptCd?: string,
    currDivNm?: string,
    defn?: string,
    useYn?: string,
}