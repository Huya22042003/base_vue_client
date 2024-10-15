export type CoreCompDiagnosisModel = {
  diagSeq: string | null;
  languageYn: string;
  name: string;
  nameCn: string;
  nameEn: string;
  year: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  publicInfoYn: string;
  diagnosticGuide: string;
  diagnosticGuideCn: string;
  diagnosticGuideEn: string;
  listUniversity: Array<string>[];
  listDepartment: Array<string>[];
  genderObject: "";
  listGender: Array<string>[];
  listGrade: Array<string>[];
  listPeopleInvolved: Array<string>[];
  listSubjectiveType: SubjectiveType[];
  coreAbilitySurveySeq: string;
  coreAbilitySurveyNm: string;
  isDisabled: boolean;
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

export type DiagCoreAbilitySearchModel = {
  diagNm: string;
  multiLanguage: string;
  stsCd: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagCoreAbilityListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  stsCd: string;
  multiLangUseYn: string;
  quantityTarget: number;
  regDate: Date;
};
