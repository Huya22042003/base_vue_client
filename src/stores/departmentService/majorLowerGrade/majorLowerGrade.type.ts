export type DeptInfoResDTO = {
    rowNumb: string;
    id: string;
    universityMajor: string;
    dept: string;
    regId: string;
    regDate: string;
};

export type DeptInfoFilterDTO = {
    universityMajor: string;
    dept: string;
    page: number;
    size: number;
    sort: string;
};

export type SimpleDeptInfoDTO = {
    deptCd: string;
    deptNm: string;
}

export type MajorCapaDetailDTO = {
    deptCd: string;
    deptment: string;
    major: string;
    listMajor: UnivesityMajorReqDTO[];
}

export type MajorCapaReqDTO = {
    major: string;
    deptment: string;
    listMajor: UnivesityMajorReqDTO[];
}

export type UnivesityMajorReqDTO = {
    id: string;
    name: string;
    define: string;
    lowerGrade: LowerGradeReqDTO[];
}

export type LowerGradeReqDTO = {
    id: string;
    name: string;
    define: string;
    useYn: string;
}

export type DataConvert = {
    lowerItemId: string,
    lowerItemName: string,
    lowerItemDefine: string,
    lowerItemActive: string,
    lowerIndex: number,
    rowSpan: number,
    isFirst: boolean,
    majorItemId: string,
    majorItemName: string,
    majorItemDefine: string,
    majorIndex: number
}

