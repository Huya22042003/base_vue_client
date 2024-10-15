export type SocialServeAplcnResponseModel = {
    rowNumBer: Number
    sociServeSeq: string
    serveTypeCd: string
    serveTypeNm: string
    serveTtl: string
    serveCont: string
    actTime: string
    serveDurStr: string
    serveDurEnd: string
    recrDurStr: string
    recrDurEnd: string
    stsCd: string
    stsNm: string
    recrMemb: string
    volunteerSoci: string
    activitySoci: string
    serveLoc: string
    attachFileSeq: string
    timeWork: string
    url: string
    mgrNm: string
    mgrCntc: string
    sustRsltCd: string
    aplcnSeq: string

    serveDurTime: string
    recrDurTime: string
}

export type SocialServeAplcnRequestModel = {
    sociServeSeq: string
    aplcnSeq: string
    servePortalId: string
}

export type SocialServeAplcnSearchModel = {
    stsCd: string | string[]

    serveTtl: string

    serveTypeCd: string

    serveDurStr: string | null

    serveDurEnd: string | null

    page: number
    size: number
    sort: string
}
