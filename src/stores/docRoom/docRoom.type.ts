export type DocRoomModel = {
    rowNumber?: number
    metlSeq?: string
    ttl?: string
    cont?: string
    regId?: string
    regDate?: string
    fileStatus?: string
}

export type DocRoomSearchModel = {
    ttl?: string
    createdBy?: string
    regStrDate?: String
    regEndDate?: String
    page?: number;
    size?: number;
    sort?: string;
}
export type DocRoomCreModel = {
    metlSeq?: string
    ttl?: string
    cont?: string
}

export type DocIdModel = {
    metlSeq?: string
}