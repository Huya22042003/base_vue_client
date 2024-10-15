export type SurveyInSchoolListModel = {
  rowNumb: number;
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  quantityAnswer: number;
  quantityTarget: number;
  surveyUrl: string;
  regDate: Date;
  regBy: string;
};

export type SurveyInSchoolSearchModel = {
  diagNm: string;
  status: string;
  regBy: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyInSchoolReqModel = {
  diagSeq: string | null;
  diagNm: string;
  diagDurStr: string;
  diagDurEnd: string;
  diagnosticGuide: string;
  listIdProfessor: Array<string>;
  listQuestion: Array<SurveyInSchoolQuestionModel>;
  isDisabled: boolean;
  isCallSurvey: boolean;
  surveyUrl: string;
};

export type SurveyInSchoolQuestionModel = {
  qusSeq: string | null;
  qusTypeCd: string;
  cont: string;
  ordNo: number;
  delYn: string;
  listAnswer: Array<SurveyInSchoolAnswerModel>;
};

export type SurveyInSchoolAnswerModel = {
  ansSeq: string | null;
  cont: string;
  ordNo: number;
  delYn: string;
};

export type SurveyStudentInfoSearchModel = {
  univCd: string;
  deptCd: string;
  genderCd: string;
  gradeCd: string;
  stdInfo: string;
  personCd: string;
  diagSeq: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyProfessorInfoSearchModel = {
  univCd: string;
  deptCd: string;
  positionNm: string;
  profNm: string;
  profNo: string;
  diagSeq: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyStudentInfoListModel = {
  stdNo: string;
  stdNm: string;
  univNm: string;
  deptNm: string;
  genderNm: string;
  gradeNm: string;
  personNm: string;
  checkedFlag: boolean;
  disabledCheckbox: boolean;
};

export type SurveyProfessorInfoListModel = {
  profNo: string;
  profNm: string;
  univNm: string;
  deptNm: string;
  positionNm: string;
  checkedFlag: boolean;
  disabledCheckbox: boolean;
};

export type SurveyInSchoolDetailReqModel = {
  diagSeq: string;
};

export type SurveyInSchoolListPopupModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  regDate: Date;
  regBy: string;
};

export type SurveyInSchoolSearchPopupModel = {
  diagNm: string;
  regBy: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyInSchoolResultModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  quantityTarget: number;
  diagGuide: string;
  quantityAnswer: number;
  listQuestion: Array<SurveyInSchoolResultQuestionModel>;
};

export type SurveyInSchoolResultQuestionModel = {
  qusSeq: string;
  cont: string;
  listDataChart: Array<number>;
};
