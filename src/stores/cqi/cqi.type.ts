export type Cqi = {
  cqiSeq: string;
  tchrAnlsOpin: string;
  gradeAnlsOpin: string;
  nextImprDmdIssue: string;
  stsCd: string;
  lectCd: string;
};

export type LectEval = {
    lectEvalSeq: string;
  lectEvalItemSeq: string;
  cqiSeq: string;
  evalCd: string;
};

export type CqiRequest = {
  cqiDTO: Cqi;

};

export type CqiSearch = {
  yearTerm: string;
  sbjtNm: string;
  profNm: string;
  year: string;
  status: string;
  page: number;
  size: number;
  sort: string;
};

export type CqiSubject = {
  lectCd: string;
  yearTerm: string;
  divNm: string;
  inchProfStfId: string;
  sbjtNm: string;
  acqCredit: string;
  sustDivNm: string;
  deptNm: string;
  gradeNm: string;
  staffNm: string;
  status: string;
  year: string;
  cqiSeq: string;
  uniDeptNm: string;
};

export type CqiSeq = {
  cqiSeq: string;
  lectPlanDocSeq: string;
  lectCd: string;
};

export type SubjectInfoDetail = {
  yearTerm: string;
  sbjtNm: string;
  acqCredit: string;
  createdDate: Date;
  yearCreate: string;
  sustDivNm: string;
  numLect: number;
  staffNm: string;
};

export type CqiAbility = {
  lvlNm: string;
  actnIndi: string;
  elemNm: string;
  majorCapaNm: string;
  chldCapaNm: string;
  typeNm: string;
  itemSeq: string;
  methNm: string;
};

export type CqiInfoBasic = {
  subjectInfoDetail: SubjectInfoDetail;
  cqiAbilityList: CqiAbility[];

};
