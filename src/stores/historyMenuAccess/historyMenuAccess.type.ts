export type HisMenuAccessResponse = {
    rowNumber: string
    url: string
    userId: string
    name: string
    connDate: string
    menuNm: string
}

export type HisMenuAccessRequest = {
    strDate: string
    endDate: string
    user: string
    name: string
    menuNm: string

    page: number
    size: number
    sort: ''
}
