export type CoreAbilityJobModel = {
    coreAbilSeq?: string;
    coreAbilNm?: string;
    chldAbilSeq?: string;
    chldAbilNm?: string;
    status?: string;
    regId?: string;
    regDate?: string;
};

export type CoreAbilityJobSearchModel = {
    coreAbilityNm?: string;
    chldAbilityNm?: string;
    status?: string;
    page?: number;
    size?: number;
    sort?: string;
};

export type BaseJobCapa = {
    baseJobCapaSeq?: string;
    mainSeq?: string;
    chldSeq?: string;
    delYn?: string;
};

export type ChldBaseReg = {
    chldAbilSeq?: string;
    baseItemList?: Array<ChldBaseItem>
};

export type ChldBaseItem = {
    seq?: string;
    baseJobCapaSeq?: string;
    delYn?: string;
};