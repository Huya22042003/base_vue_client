export type ResultDiagMajorCapaSearchModel = {
  diagNm: string;
  deptNm: string;
  multiLanguage: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type ResultDiagMajorCapaListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  deptNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  statusCd: string;
  statusNm: string;
  multiLangUseYn: string;
  quantityTarget: number;
  quantityAnswer: number;
  regDate: Date;
};

export type DiagResultMajorCapaReqModel = {
  diagSeq: string;
};

export type ResultDiagMajorCapaDetailModel = {
  diagSeq: string;
  diagNm: string;
  multiLanguageUseYn: string;
  diagDurStr: string;
  diagDurEnd: string;
  year: string;
  termCd: string;
  statusNm: string;
  deptNm: string;
  genderNm: string;
  gradeNm: string;
  personNm: string;
  quantityAnswer: number;
  quantityTarget: number;
};

export type ResultListMajorCapaModel = {
  majorCapaSeq: string
  majorCapaNm: string
}

export type DiagResultMajCapaChartGraphicReqModel = {
  diagSeq: string
  majorCapaSeq: string
}

export type DiagResultMajCapaChartGraphicResModel = {
  majorCapaDiagQus: string;
  qusNumOrd: number;
  listDataChart: [];
}