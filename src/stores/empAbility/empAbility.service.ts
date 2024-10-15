import http from "@/utils/http";
import type {
    EmpAbilitySearchModel, EmpAbilityCre, EmpId, EmpName,
    OneAbilityList,
    ElemPageSearchDTO
    , ChldIdDTO
    , ElemDetailDTO
    , ElemIdDTO
    , EmpAbilitySubLevel
} from "./empAbility.type"
const url = '/a/empAbility'

export const insert = (data: EmpAbilityCre) => {
    return http.post(`${url}/regEmp/create`, data);
}
export const listReg = (data: OneAbilityList) => {
    return http.post(`${url}/regEmp/`, data);
}
export const detailReg = (data: EmpId) => {
    return http.post(`${url}/regEmp/detail`, data);
}
export const deleteReg = (data: EmpId) => {
    return http.post(`${url}/regEmp/delete`, data);
}


export const checkDouble = (data: EmpName) => {
    return http.post(`${url}/regEmp/checkDouble`, data);
}


export const subElemList = (data: ElemPageSearchDTO) => {
    return http.post(`${url}/subElem/`, data);
}

export const subElemDetail = (params: ChldIdDTO) => {
    return http.post(`${url}/subElem/detail`, params);
};

export const saveElem = (params: ElemDetailDTO) => {
    return http.post(`${url}/subElem/saveElem`, params);
};

export const checkElemDel = (params: ElemIdDTO) => {
    return http.post(`${url}/subElem/delElem`, params);
};

export const getDetailSub = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/subEmp/detailSub`, data);
}

export const checkDelChld = (data: ChldIdDTO) => {
    return http.post(`${url}/subEmp/chkDel`, data);
}

export const checkDelEmp = (data: EmpId) => {
    return http.post(`${url}/subEmp/delete`, data);
}

export const checkDelAllEmp = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/subEmp/chkDelAll`, data);
}

export const delAllLevel = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/subEmp/delSubAll`, data);
}

export const saveSubEmp = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/subEmp/create`, data);
}

export const editSubReg = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/subEmp/updateSub`, data);
}

export const editReg = (data: EmpAbilitySubLevel) => {
    return http.post(`${url}/regEmp/updProf`, data);
}

