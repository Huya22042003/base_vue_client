export type DeptEduGoalFilterDTO = {
    page: number;
    size: number;
    sort: string;
};

export type DeptEduGoalDetailFilterDTO = {
    dept?: String;
    year?: String;
};

export type DeptEduGoalResDTO = {
    year: string;
    major: string;
    deptCd: string;
    deptNm: string;
    regId: string;
    regDate: string;
};

export type SimpleDeptEduDTO = {
    id: string;
    value: string;
};

export type DeptEduGoalDetailDTO = {
    major: string;
    dept: string;
    year: number|string;
    visionDept: SimpleDeptEduDTO[];
    modelDept: SimpleDeptEduDTO[];
    targetDept: SimpleDeptEduDTO[];
    planDept: SimpleDeptEduDTO[];
    roadGraduationDept: SimpleDeptEduDTO[];
    certificateDept: SimpleDeptEduDTO[];
};

export type DeptEduGoalReqDTO = {
    dept: string;
    year: number|string;
    visionDept: SimpleDeptEduDTO[];
    modelDept: SimpleDeptEduDTO[];
    targetDept: SimpleDeptEduDTO[];
    planDept: SimpleDeptEduDTO[];
    roadGraduationDept: SimpleDeptEduDTO[];
    certificateDept: SimpleDeptEduDTO[];
};
