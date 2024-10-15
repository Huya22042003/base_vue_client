export type AbilityCmpnElemItem = {
    itemSeq: string;
    actnIndi: string;
    actnStnrdBarsHigh: string;
    actnStnrdBarsMedl: string;
    actnStnrdBarsLow: string;
    cmpnElemSeq: string;
    cmpnElemNm: string;
    useYn: string;
    delYn: string;
    regDate: Date;
    regId: string;
}

export type AbilityItemSearch = {
    coreSeq: string;
    childSeq: string;
    cmpnElemNm: string;
    writeSearch: string;
    page: number;
    size: number;
    sort: string;
}

export type AbilityItemSeq = {
    cmpnElemSeq: string;
}

export type AbilityCmpnElemItemResponse = {
    itemSeq: string;
    actnIndi: string;
    actnStnrdBarsHigh: string;
    actnStnrdBarsMedl: string;
    actnStnrdBarsLow: string;
    cmpnElemSeq: string;
    cmpnElemNm: string;
    childAbilityNm: string;
    coreAbilityNm: string;
    useYn: string;
    delYn: string;
}

export type CoreAndChild = {
    coreList: [],
    childList: []
}