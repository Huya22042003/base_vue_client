export type PortfolioModel = {
    stdId?: string;
    majorNm?: string;
    deptNm?: string;
    gradeNm?: string;
    userNm?: string;
    entrDivNm?: string;
    guideProfNm?: string;
    credit?: string;
    prevTermAvgScore?: string;
};

export type SearchPortModel = {
    majorNm?: string;
    deptNm?: string;
    gradeNm?: string;
    stdId?: string;
    userNm?: string;
    entrDivNm?: string;
    guideProfNm?: string;
    page?: number
    size?: number
    sort?: string
};

export type DeptModel = {
    deptCd?: string;
    deptNm?: string;
};
