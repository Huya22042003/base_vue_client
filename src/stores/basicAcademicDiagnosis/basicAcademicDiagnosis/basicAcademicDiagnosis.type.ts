export type DiagBaseLearnReqModel = {
  diagSeq: string;
  name: string;
  year: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  publicInfoYn: string;
  diagnosticGuide: string;
  listUniversity: [];
  listDepartment: [];
  genderObject: string;
  listGender: [];
  listGrade: [];
  listPeopleInvolved: [];
  baseLearnSurveySeq: string;
  baseLearnSurveyNm: string;
  isDisabled: boolean;
};

export type DiagBaseLearnSearchModel = {
  diagNm: string;
  stsCd: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagBaseLearnListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  stsCd: string;
  quantityTarget: number;
  regDate: Date;
};

export type DiagBaseLearnDetailModel = {
  diagSeq: string;
};
