export type CoreAbilitySearchModel = {
  surveyNm?: string;
  useYn?: string;
  regBy: string;
  multiLanguageUseYn?: string;
  stsCd?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type CoreAbilityListModel = {
  id?: string;
  rowNum?: number;
  surveyNm?: string;
  regBy?: string;
  useYn?: string;
  multiLangUseYn?: string;
  stsCd?: string;
  regDate?: Date;
  select?: string;
};

export type CoreAbilitySurveyCrudModel = {
  surveySeq?: string;
  surveyNm?: string;
  multiLanguage?: string;
  useYn?: string;
  stsCd?: string;
  listCoreAbility?: Array<CoreAbiSurCoreAbilityModel>;
};

export type CoreAbiSurCoreAbilityModel = {
  coreAbilitySeq?: string;
  coreAbilityNm?: string;
  defaultLanguage?: string;
  collapseFlag?: boolean;
  isFullEntryKR?: boolean;
  isFullEntryCN?: boolean;
  isFullEntryEN?: boolean;
  listChildAbility?: Array<CoreAbiSurChildAbilityModel>;
};

export type CoreAbiSurChildAbilityModel = {
  chldAbilitySeq?: string;
  chldAbilityNm?: string;
  listAbilityCmpnElem?: Array<CoreAbiSurAbilityCmpnElemModel>;
  listStorySituation?: Array<StorySituationLanguageModel>;
};

export type CoreAbiSurAbilityCmpnElemModel = {
  cmpnElemSeq?: string;
  elemNm?: string;
  listQuesAndAns?: Array<CoreAbiSurQuesAnsModel>;
};

export type StorySituationLanguageModel = {
  storySeq?: string;
  codeLanguage?: string;
  storyContent?: string;
};

export type CoreAbiSurQuesAnsModel = {
  quesSeq?: string;
  codeLanguage?: string;
  quesContent?: string;
  contentLevel1?: string;
  contentLevel2?: string;
  contentLevel3?: string;
  contentLevel4?: string;
  contentLevel5?: string;
};

export type CoreAbilitySurveyDetailModel = {
  id?: string;
};

export type CoreAbilitySearchPopupModel = {
  surveyNm?: string;
  regBy: string;
  multiLanguageUseYn?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type CoreAbilityListPopupModel = {
  id?: string;
  surveyNm?: string;
  regBy?: string;
  multiLangUseYn?: string;
  regDate?: Date;
  select?: string;
};