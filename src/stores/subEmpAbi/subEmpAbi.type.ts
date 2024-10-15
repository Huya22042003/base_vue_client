export type EmpAbilitySub = {
    empAbilitySeq: string;
    empAbilityNm: string;
    temporaryYn: string;
    empAbilityChldCreDTOs: EmpAbilityChld[];
    empAbiDel: EmpAbilityChld[];
    empElemDel: EmpAbilityElem[];
}

export type EmpAbilityChld = {
    empAbilityChldAbilitySeq: string;
    chldAbilityNm: string;
    defn: string;
    empAbilitySeq: string;
    temporaryYn: string;
    useYn: string;
    empAbilityElemCreDTOS: EmpAbilityElem[];
    status: string;
}

export type EmpAbilityElem = {
    cmpnElemSeq: string;
    elemNm: string;
    defn: string;
    empAbilitySeq: string;
    empAbilityChldAbilitySeq: string;
    useYn: string;
    status: string;
}

export type EmpSubSearch = {
    page: number;
    size: number;
    sort: string;
}

export type EmpSubAbility = {
    rowNum1: string;
    ability1levelSeq: string;
    abiLevelNm: string;
    stsUse: string;
    regNm: string;
    regDate: string;
}