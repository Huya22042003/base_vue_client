export type AbilityCoreAndChild = {
    coreAbilitySeq: string;
    coreAbilityNm: string;
    chldAbilityNm: string;
    chldAbilitySeq: string;
    cmpnElemSeq: string;
    writeStatus: string;
    regId: string;
    regDate: string;
}

export type AbilitySearch = {
    coreNmSearch: string;
    childNmSearch: string;
    writeSearch: string;
    page: number;
    size: number;
    sort: string;
}

export type AbilityDetail = {
    coreAbilitySeq: string;
    chldAbilitySeq: string;
}

export type AbilityCmpnElem = {
    cmpnElemSeq: string;
    elemNm: string;
    coreAbilitySeq: string;
    chldAbilitySeq: string;
    useYn: string;
    delYn: string;
}