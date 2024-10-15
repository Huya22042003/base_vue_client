import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export type ActionIndexKsaResDTO = {
    id: String;
    universityMajor: String;
    dept: String;
    capacityMajor: String;
    lowerGrade: String;
    constitutiveFactor: String;
    isAction: String;
    createdBy: String;
    createdDate: string;
}

export type SimpleListBoxDTO = {
    id: String;
    value: String;
}

export type ActionIndexKsaLoadFilterDTO = {
    major: CodeMngModel[];
    dept: CodeMngModel[];
    majorCapa: CodeMngModel[];
    chldCapa: CodeMngModel[];
}

export type ActionIndexKsaFilterDTO = {
    major: String;
    dept: String;
    majorCapa: String;
    chldCapa: String;
    majorElem: String;
    status: String;
    page: number;
    size: number;
    sort: String;
}

export type ElementItemDTO = {
    id: String;
    actionDetail: String;
    highPoint: String;
    middlePoint: String;
    lowPoint: String;
    consciousness: SimpleListBoxDTO[];
    technique: SimpleListBoxDTO[];
    attitude: SimpleListBoxDTO[];
}

export type ActionIndexKsaDetailDTO = {
    elemId: String;
    universityMajor: String;
    dept: String;
    capacityMajor: String;
    lowerGrade: String;
    constitutiveFactor: String;
    actionIndexKsa: ElementItemDTO[];
}

export type ActionIndexKsaReqDTO = {
    elemId: String;
    actionIndexKsa: ElementItemDTO[]
}