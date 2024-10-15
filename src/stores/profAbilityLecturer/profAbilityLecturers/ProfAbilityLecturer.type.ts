export type SearchModel = {
  diagNm?: string;
  stsCd?: string;
  diagDurStr?: string;
  diagDurEnd?: string;
  page?: number;
  size?: number;
  sort?: string;
};
export type DiagLecturerModel = {
  rowNumber?: String;
  diagYearTerm?: String;
  digaNm?: String;
  diagDurStr?: Date;
  diagDurEnd?: Date;
  stsCd?: String;
  target?: Number;
  regDate?: String;
};

export type DiagLecturerCrudModel = {
  diagSeq?: string;
  diagNm?: string;
  diagDurStr?: Date;
  diagDurEnd?: Date;
  year?: string;
  termCd?: string;
  diagGuide?: string;
  indvInfoAgrApplyYn?: string;
  stsCd?: string;
  listGender: Array<string>;
  listIndustrySector: Array<string>;
  listExperience: Array<string>;
  listProfLevel: Array<string>;
  surveySeq?: string;
  surveyNm?: string;
  isDisabled?: boolean;
};