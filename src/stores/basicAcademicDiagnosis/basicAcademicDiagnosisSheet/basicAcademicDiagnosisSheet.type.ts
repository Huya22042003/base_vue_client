export type BaseLearnSurveySearchModel = {
  surveyNm?: string;
  useYn?: string;
  regBy: string;
  stsCd?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type BaseLearnSurveyListModel = {
  surveySeq?: string | null;
  rowNum?: number;
  surveyNm?: string;
  regBy?: string;
  useYn?: string;
  stsCd?: string;
  regDate?: Date;
  select?: string;
};

export type BaseLearnSurveyDetailModel = {
  surveySeq?: string | null;
};

export type BaseLearnSurveyCrudModel = {
  surveySeq?: string | null;
  surveyNm?: string;
  useYn?: string;
  stsCd?: string;
  listBaseLearnItem?: Array<BaseLearnItemModel>;
};

export type BaseLearnItemModel = {
  baseLearnItemSeq?: string | null;
  itemNm?: string;
  baseLearnItemNumOrd?: number;
  listQuestion?: Array<BaseLearnDiagQusModel>;
};

export type BaseLearnDiagQusModel = {
  qusSeq?: string | null;
  qusNumOrd?: number;
  cont?: string;
  delYn?: string;
  listAnswer?: Array<BaseLearnDiagQusViewModel>;
};

export type BaseLearnDiagQusViewModel = {
  viewSeq?: string | null;
  viewNumOrd?: number;
  cont?: string;
  ansYn?: string;
  delYn?: string;
};

export type BaseLearnSurveySearchPopupModel = {
  surveyNm?: string;
  regBy: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type BaseLearnSurveyListPopupModel = {
  surveySeq?: string | null;
  surveyNm?: string;
  regBy?: string;
  regDate?: Date;
  select?: string;
};