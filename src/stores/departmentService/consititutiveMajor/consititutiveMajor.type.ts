export type DataSearch = {
    universityMajor: string;
    dept: string;
    capactityMajor: string;
    lowerGrade: string;
    status: string;
    page: number;
    size: number;
    sort: string;
}

export type DataResponse = {
    rowNumb: string;
    majorUniversity: string;
    dept: string;
    majorCapaNm: string;
    chldCapaId: string;
    chldCapaNm: string;
    status: string;
    regId: string;
    regDate: string;
}

export type ChldCapaDetailDTO = {
    chldCapaId: string;
    major: string;
    dept: string;
    majorCapaId: string;
    majorCapa: string;
    chldCapaNm: string;
    majorCapaElem: MajorCapaElemAddDTO[];
};

export type MajorCapaElemAddDTO = {
    id: string;
    name: string;
    useYn: string;
};

export type ChldCapaReqDTO = {
    chldCapaId: string;
    major: string;
    dept: string;
    majorCapa: string;
    chldCapaNm: string;
    majorCapaElem: MajorCapaElemAddDTO[];
};

export type SimpleChldCapaDTO = {
    cdId:string;
    cdNm:string;
}

export type ChldCapaFormDTO = {
    listDept: SimpleChldCapaDTO[];
    listMajorCapa: SimpleChldCapaDTO[];
    listChldCapa: SimpleChldCapaDTO[];
    listMajor: SimpleChldCapaDTO[];
}
