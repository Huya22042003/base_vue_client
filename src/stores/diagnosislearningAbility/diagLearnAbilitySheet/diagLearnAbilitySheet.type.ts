export type LearnAbilitySearchModel = {
  surveyNm?: string;
  useYn?: string;
  regId: string;
  multiLangUseYn?: string;
  stsCd?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type LearnAbilityListModel = {
  surveySeq?: string;
  rowNumb?: number;
  surveyNm?: string;
  regId?: string;
  useYn?: string;
  multiLangUseYn?: string;
  stsCd?: string;
  regDate?: Date;
};

export type LearnAbilitySurveyCrudModel = {
  surveySeq?: string;
  surveyNm?: string;
  multiLanguage?: string;
  useYn?: string;
  stsCd?: string;
  listLearnAbility?: Array<LearnAbilityModel>;
};

export type LearnAbilityModel = {
  learnAbilitySeq?: string;
  learnAbilityNm?: string;
  defaultLanguage?: string;
  collapseFlag?: boolean;
  isFullEntryKR?: boolean;
  isFullEntryCN?: boolean;
  isFullEntryEN?: boolean;
  listChildAbility?: Array<LearnChildAbilityModel>;
};

export type LearnChildAbilityModel = {
  learnAbilityChldAbilitySeq?: string;
  chldAbilityNm?: string;
  listAbilityCmpnElem?: Array<LearnAbilityCmpnModel>;
};

export type LearnAbilityCmpnModel = {
  learnComponentSeq?: string;
  learnComponentNm?: string;
  listQueAnsLanguage?: Array<LearnAbilityLanguageDTO>;
};

export type LearnAbilityLanguageDTO = {
  codeLanguage?: string;
  listquesContent?: Array<LearnAbilityQuesAnsModel>;
};

export type LearnAbilityQuesAnsModel = {
  quesSeq?: string;
  quesContent?: string;
  qusNumOrd?: number;
  delYn: string
};

export type LearnAbilitySurveyDetailModel = {
  surveySeq?: string;
};

export type LearnAbilitySurveyPopUpSearchModel = {
  surveyNm?: string;
  regId: string;
  multiLangUseYn?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type LearnAbilitySurveyPopUpListModel = {
  surveySeq?: string;
  rowNumb?: number;
  surveyNm?: string;
  regId?: string;
  multiLangUseYn?: string;
  regDate?: Date;
};
