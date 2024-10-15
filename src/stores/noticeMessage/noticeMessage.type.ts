export type NoticeMessageModel = {
    rowNum?: string
    altkSeq?: string
    ttl?: string
    sendDate?: string
    rcptYn?: string
    deptNm?: string
}

export type SearchModel = {
    ttlSearch?: string
    regId?: string
    sendStsCd?: string
    page?: number
    size?: number
    sort?: string
}

export type SearchStudentModel = {
    userNm?: string
    deptCd?: string
    sexCd?: string
    gradeCd?: string
    stdId?: string
    page?: number
    size?: number
    sort?: string
}

export type StudentModel = {
    stdId?: string
    userNm?: string
    deptNm?: string
    sexNm?: string
    gradeNm?: string
}

export type StudentCreModel = {
    targMembNo?: string
    altkSeq?: string
    rcptYn?: string
}

export type NotiMessCreModel = {
    ttl?: string
    cont?: string
    bkngSendDate?: string
    sendStsCd?: string
    sendDate?: string
    allimTalkTarMenCreDTOList?: StudentCreModel[];
}

export type NoticeIdModel = {
    altkSeq?: string
}

export type NoticeDetailModel = {
    altkSeq?: string
    ttl?: string
    cont?: string
    bkngSendDate?: string
    studentDetailDTOS?: StudentModel[];
}