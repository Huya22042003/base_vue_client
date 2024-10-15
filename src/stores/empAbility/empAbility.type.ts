export type EmpAbilitySearchModel = {
    delYn: string
    useYn: string
    page: number
    size: number
    sort: ''
}

export type EmpAbiInitModel = {
    rowNum?: string,
    empAbilitySeq?: string,
    empAbilityNm?: string,
    regId?: string,
    regDate?: string,
}


export type EmpAbilityCre = {
    empAbilitySeq?: string
    empAbilityNm?: string
    defn?: string
    empAbilityRlstCreDTOs?: EmpAbilityRlst[]
}

export type EmpAbilityRlst = {
    empAbilityRsltCmpnSeq?: string
    empAbilitySeq?: string
    standardScoreMin?: string
    standardScoreMax?: string
    ability1levelSeq?: string
    lvlCd?: string
    contDefn?: string
    delYn?: string
    empAbilityProgCreDTOS?: EmpAbilityProg[]
}

export type EmpAbilityProg = {
    empAbilityRsltCmpnProgSeq?: string
    lvlCd?: string
    empAbilityRsltCmpnSeq?: string
    progNm?: string
    url?: string
    item_1?: string
    item_2?: string
    item_3?: string
    item_4?: string
    delYn?: string
}

export type PopUpInfo = {
    id?: number,
    progNm?: string,
    url?: string,
    status?: string
}



export type EmpAbilityDetailDTO = {
    empAbilitySeq?: string
    empAbilityNm?: string
    defn?: string
    empAbilityDetailRlstDTOs?: EmpAbilityRlst[]
}


//====================================

export type OneAbilityList = {
    rowNum: string
    ability1levelSeq: string
    ability1levelNm: string
    regNm: string
    regDate: string
}

export type OneAbilityPage = {
    page: number
    size: number
    sort: ''
}

export type OneAbilityCre = {
    ability1levelSeq?: string
    ability1levelNm?: string
    defn?: string
    useYn?: string
    temporaryYn?: string
    empAbilityRlstCreDTOs?: EmpAbilityRlst[]
}

export type EmpName = {
    name?: string
    ability1levelSeq?: string
}

export type ElemPageSearchDTO = {
    empAbilityNm: string
    subEmpAbilityNm: string
    stsAbility: string
};

export type ChldIdDTO = {
    empAbilityChldSeq: string
};

export type ElemDetailObDTO = {
    cmpnElemSeq: string
    elemNm: string
    useYn: string
    defn: string
};

export type ElemDetailDTO = {
    empAbilityChldAbilitySeq: string
    empAbilitySeq: string
    empNm: string
    subNm: string
    elemDetailOb: ElemDetailObDTO[]
};

export type ElemIdDTO = {
    cmpnElemSeq: string
};

export type EmpAbilitySubLevelCre = {
    ability1levelSeq?: string
    ability1levelNm?: string
    defn?: string
    useYn?: string
    delYn?: string
    temporaryYn?: string
    subCreDTOS?: AbilityChldCreDTOS[]
}

export type AbilityChldCreDTOS = {
    empAbilitySeq?: string
    empAbilityNm?: string
    defn?: string
    temporaryYn?: string
    empAbilityChldCreDTOs?: EmpAbilityChld[]
}

export type EmpAbilityChld = {
    chldAbilitySeq?: string
    chldAbilityNm?: string
    defn?: string
}

export type EmpAbilitySubLevel = {
    ability1levelSeq?: string
}

export type EmpId = {
    empAbilitySeq?: string
    delYn?: string
}

