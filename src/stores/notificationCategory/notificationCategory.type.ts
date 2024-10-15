export type NotificationCategoryModel = {
    rowNum: number
    id: string
    ttl: string
    readCnt: string
    cont: string
    openYn: string
    topFixYn: string
    useYn: string
    regDate: Date,
    regId: String,
}

export type NotificationCategorySearchModel = {
    ttl: string
    openYn: string
    regId: string
    page?: number
    size?: number
    sort?: string
}

export type SiteNotificationCategoryModel = {
    id: string
    topFixYn: string
}

export type NoticeIdRes = {
    id: string
}

export type NoticeUpdateModel = {
    noticeSeq: string
    targetSiteCd: string
    ttl: string
    cont: string
    openYn: string
    topFixYn: string
    attachFileSeq: string
}

export type CodeSiteModel = {
    cdId: string
    cdNm: string
}

export type NotiCategoryDetailModel = {
    noticeSeq: string
    targetSiteCd: string
    ttl: string
    readCnt: string
    cont: string
    openYn: string
    topFixYn: string
    attachFileSeq: string
    useYn: string
    regDate: Date,
    regId: string,
    modifyId: string,
    modifyDate: string
}



