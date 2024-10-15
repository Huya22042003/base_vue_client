export type SurveyOutSchoolListModel = {
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

export type SurveyOutSchoolSearchModel = {
  diagNm: string;
  regBy: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyOutSchoolReqModel = {
  diagSeq: string | null;
  diagNm: string;
  diagDurStr: string;
  diagDurEnd: string;
  diagnosticGuide: string;
  listQuestion: Array<SurveyOutSchoolQuestionModel>;
  isDisabled: boolean;
  isCallSurvey: boolean;
  surveyUrl: string;
};

export type SurveyOutSchoolQuestionModel = {
  qusSeq: string | null;
  qusTypeCd: string;
  cont: string;
  ordNo: number;
  delYn: string;
  listAnswer: Array<SurveyOutSchoolAnswerModel>;
};

export type SurveyOutSchoolAnswerModel = {
  ansSeq: string | null;
  cont: string;
  ordNo: number;
  delYn: string;
};

export type SurveyOutSchoolDetailReqModel = {
  diagSeq: string;
};

export type SurveyOutSchoolListPopupModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  regDate: Date;
  regBy: string;
};

export type SurveyOutSchoolSearchPopupModel = {
  diagNm: string;
  regBy: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type SurveyOutSchoolResultModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  diagGuide: string;
  quantityAnswer: number;
  listQuestion: Array<SurveyOutSchoolResultQuestionModel>;
};

export type SurveyOutSchoolResultQuestionModel = {
  qusSeq: string;
  cont: string;
  listDataChart: Array<number>;
};
