export type LearnComponent = {
    learnComponentSeq: string;
    learnComponentNm: string;
    learnAbilityChldAbilitySeq: string;
    useYn: string;
    delYn: string;
    status: string;
}

export type LearnComponentSearch = {
    learnNmSearch: string;
    childNmSearch: string;
    writeSearch: string;
    page: number;
    size: number;
    sort: string;
}

export type LearnComponentRes = {
    learnComponentSeq: string;
    learnComponentNm: string;
    learnAbilityChldAbilitySeq: string;
    chldAbilityNm: string;
    learnAbilityNm: string;
    writeStatus: string;
    regId: string;
    regDate: Date;
}

export type LearnComponentSeq = {
    chldSeq: string;
}

export type LearnComponentDetail = {
    learnComponentSeq: string;
    learnComponentNm: string;
    learnAbilityChldAbilitySeq: string;
    chldAbilityNm: string;
    learnAbilityNm: string;
    useYn: string;
}