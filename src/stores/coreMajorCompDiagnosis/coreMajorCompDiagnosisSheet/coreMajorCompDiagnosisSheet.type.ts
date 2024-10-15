export type MajorCapaSurveySearchModel = {
  surveyNm: string;
  // univCd: string;
  // deptCd: string;
  multiLangUseYn: string;
  regBy: string;
  startDate: string;
  endDate: string;
  page: number;
  stsCd: string;
  size: number;
  sort: string;
};

export type MajorCapaSurveyListModel = {
  surveySeq: string;
  rowNumb: number;
  surveyNm: string;
  univNm: string;
  deptNm: string;
  multiLangUseYn: string;
  regBy: string;
  stsCd: string;
  regDate: Date;
};

export type MajorCapaSurveyDetailModel = {
  surveySeq: string;
};

export type MajorCapaSurveyCrudModel = {
  surveySeq?: string;
  surveyNm?: string;
  multiLanguage?: string;
  univNm: string;
  deptNm?: string;
  stsCd?: string;
  listMajorCapa?: Array<MajorCapaModel>;
};

export type MajorCapaModel = {
  majorCapaSeq: string;
  majorCapaNm: string;
  defaultLanguage?: string;
  collapseFlag?: boolean;
  isFullEntry?: boolean;
  listQuestion: Array<MajorCapaDiagQusModel>;
};

export type MajorCapaDiagQusModel = {
  qusNumOrd: number;
  listQusItem: Array<MajorCapaDiagQusItemModel>;
};

export type MajorCapaDiagQusItemModel = {
  qusSeq: string | null;
  multiLanguageCd: string;
  content: string;
  delYn: string;
};

export type MajorCapaSurveySearchPopupModel = {
  surveyNm: string;
  multiLangUseYn: string;
  regBy: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type MajorCapaSurveyListPopupModel = {
  surveySeq: string;
  surveyNm: string;
  univNm: string;
  deptNm: string;
  multiLangUseYn: string;
  regBy: string;
  regDate: Date;
};