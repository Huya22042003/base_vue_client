export type DiagMajorCapaSearchModel = {
  diagNm: string;
  deptCd: string;
  multiLanguage: string;
  stsCd: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagMajorCapaListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  deptNm: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  stsCd: string;
  multiLangUseYn: string;
  quantityTarget: number;
  regDate: Date;
};

export type DiagDeptInfoModel = {
  cdId: string;
  cdNm: string;
};

export type DiagMajorCapaReqModel = {
  diagSeq: string;
  multiLangUseYn: string;
  diagNmCh: string;
  diagNmEn: string;
  diagNm: string;
  year: string;
  termCd: string;
  diagDurStr: string;
  diagDurEnd: string;
  stsCd: string;
  publicInfoYn: string;
  diagnosticGuide: string;
  diagnosticGuideCn: string;
  diagnosticGuideEn: string;
  majorCapaDeptCd: string;
  majorCapaDeptNm: string;
  genderObject: string;
  listGender: Array<string>;
  listGrade: string;
  listPeopleInvolved: Array<string>;
  listSubjectiveType: SubjectiveType[];
  majorCapaSurveySeq: string;
  majorCapaSurveyNm: string;
  isDisabled: boolean
};

export type SubjectiveType = {
  sbvtNumOrd: number;
  listItem: Array<SubjectiveTypeItem>;
};

export type SubjectiveTypeItem = {
  sbvtSeq: string | null;
  multiLanguageCd: string;
  content: string;
  delYn: string;
};
