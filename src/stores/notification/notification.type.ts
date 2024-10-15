export type NotificationResponseModel = {
    rowNumber: Number
    noticeSeq: string
    ttl: string
    readCnt: string
    regDate: string
    topFixYn: string
    staffNm: string
}
export type NotificationSearchModel = {
    ttl: string
    page: number
    size: number
    sort: string
}
export type NotificationDetailModel = {
    noticeSeq: number
    ttl: string
}

export type NotificationDetailResponseModel = {
    rowNumber: Number
    totalCount: Number
    noticeSeq: string
    ttl: string
    cont: string
    attachFileSeq: string
    readCnt: string
    regDate: string
    topFixYn: string
    staffNm: string
}

export type NotiIdModel = {
    noticeSeq: number
}