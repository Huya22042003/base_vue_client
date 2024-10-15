export type SearchModel = {
  surveyNm?: String;
  regId?: String;
  useYn?: String;
  stsCd?: String;
  startDate?: String;
  endDate?: String;
  page?: Number;
  size?: Number;
  sort?: String;
};
export type AbilitySurveyModel = {
  rowNumber?: number;
  surveySeq?: string;
  surveyNm?: string;
  stsCd?: string;
  useYn?: string;
  ansId?: string;
  regDate?: string;
};
export type SurveyCrudModel = {
  surveySeq?: string;
  surveyNm?: string;
  useYn?: string;
  stsCd?: string;
  listWisePride?: Array<WisePrideModel>;
};
export type WisePrideModel = {
  wisePrideSeq?: string;
  wisePrideNm?: string;
  defaultProfAbility?: string;
  collapseFlag?: boolean;
  listProfAbility?: Array<AbilityModel>;
};
export type AbilityModel = {
  profAbilitySeq?: string;
  profAbilityNm?: string;
  isCheck?: boolean;
  listAbilityChld: Array<AbilityChldModel>;
};
export type AbilityChldModel = {
  profAbilityChldAbilitySeq?: string;
  chldAbilityNm?: string;
  listAbilityElem: Array<AbilityCmpnElemModel>;
};
export type AbilityCmpnElemModel = {
  cmpnElemSeq?: string;
  elemNm?: string;
  defn?: string;
  listAbilityDiagQus: Array<AbilityDiagQusModel>;
};
export type AbilityDiagQusModel = {
  qusSeq?: string;
  cont?: string;
  lvlCd?: string;
  lvlNm?: string;
};
export type SurveyDetailModel = {
  surveySeq?: string;
};
export type SearchPopupModel = {
  surveyNm?: String;
  regId?: String;
  startDate?: String;
  endDate?: String;
  page?: Number;
  size?: Number;
  sort?: String;
};
export type AbilitySurveyPopupModel = {
  surveySeq?: string;
  surveyNm?: string;
  regId?: string;
  regDate?: string;
};