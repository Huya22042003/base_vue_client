export type QnaStaffModel = {
    rowNumber?: string,
    qnaSeq?: string,
    qusTtl?: string,
    qusCont?: string
    regId?: string,
    regDate?: string,
    stsCd?: string,
    ansId?: string,
    ansCont?: string,
    ansDate?: string,
}

export type QnaStaffCreModel = {
    qnaSeq?: string,
    qusTtl?: string,
    qusCont?: string,
}

export type Pageable = {
    page?: number,
    size?: number,
    sort?: string,
}