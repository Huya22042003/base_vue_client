export type LoginHisResModel = {
    rowNum: string
    slId: string
    url: string
    httpMethod: string
    rsNm: string
    rsType: string
    regDate: string
}

export type LoginHisSearchModel = {
    strDate: string
    endDate: string
    authority: string
    id: string
    name: string
    ipAccess: string

    page: number
    size: number
    sort: ''
}

export type ListRole = {
    cdId: string
    cdNm: string
}