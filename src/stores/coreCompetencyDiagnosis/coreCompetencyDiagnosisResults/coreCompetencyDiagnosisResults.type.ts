export type ResultDiagCoreAbilitySearchModel = {
  diagNm: string;
  multiLanguage: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type ResultDiagCoreAbilityListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  statusCd: string;
  statusNm: string;
  multiLangUseYn: string;
  quantityTarget: number;
  quantityAnswer: number;
  regDate: Date;
};

export type DiagResultCoreAbilityReqModel = {
  diagSeq: string;
};

export type DiagResultCoreAbilityDetailModel = {
  diagSeq: string;
  diagNm: string;
  multiLanguageUseYn: string;
  diagDurStr: string;
  diagDurEnd: string;
  year: string;
  termCd: string;
  statusNm: string;
  universityNm: string;
  departmentNm: string;
  genderNm: string;
  gradeNm: string;
  personNm: string;
  quantityAnswer: number;
  quantityTarget: number;
};

export type DiagResultChartGraphicReqModel = {
  coreAbilitySeq: string;
  diagSeq: string;
};

export type DiagResultChartGraphicResModel = {
  childAbilitySeq: string;
  childAbilityNm: string;
  listDataChart: [];
};

export type DiagListCoreAbilityModel = {
  coreAbilitySeq: string;
  coreAbilityNm: string;
};
