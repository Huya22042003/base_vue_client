export type ResultDiagBaseLearnSearchModel = {
  diagNm: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type ResultDiagBaseLearnListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  statusCd: string;
  statusNm: string;
  quantityTarget: number;
  quantityAnswer: number;
  regDate: Date;
};

export type DiagResultBaseLearnReqModel = {
  diagSeq: string;
};

export type DiagResultBaseLearnDetailModel = {
  diagSeq: string;
  diagNm: string;
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

export type DiagResultBaseLearnGraphicReqModel = {
  baseLearnItemSeq: string;
  diagSeq: string;
};

export type DiagResultBaseLearnGraphicResModel = {
  qusSeq: string;
  qusNumOrd: number;
  cont: string;
  listDataChart: Array<number>;
  listAnswer: Array<string>;
  listColumnTable: Array<DataColumnTable>;
};

export type DiagListBaseLearnModel = {
  baseLearnItemSeq: string;
  itemNm: string;
  collapseFlag: boolean;
  listGraphic: Array<DiagResultBaseLearnGraphicResModel>;
};

export type DataColumnTable = {
  level: string;
  countAnswer: number;
};
