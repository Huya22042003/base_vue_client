export type QnaModelList = {
    rowNumber?: string,
    qnaSeq?: string,
    qusTtl?: string,
    qusCont?: string,
    stsCd?: string,
    regId?: string,
    regDate?: string,
    ansId?: string,
    ansDate?: string,
    regCode?: string,
    regDept?: string,
    ansCode?: string,
    ansDept?: string,
    ansCont?: string,
}

export type SearchModelQa ={
    qusTtl?: string
    regId?: string
    stsCd?: string
    startDate?: string
    endDate?: string
    ansId?: string
    page?: number,
    size?: number,
    sort?: string,
}

export type AnsModel ={
    qnaSeq?: string
    ansCont?: string
}

