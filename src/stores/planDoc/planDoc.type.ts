export type PlanDocRequest = {
  planDocDTO: PlanDocModel;
  lectEvalList: LectEvalLst;
  lectBookList: LectBookLst;
  progPlanList: ProgPlan[];
  lectEvalLearnList: EvalMethod[];
};

export type LectEvalLst = {
  eval1: LectEval;
  eval2: LectEval;
  eval3: LectEval;
  eval4: LectEval;
  eval5: LectEval;
};

export type LectBookLst = {
  mainTextbooks: LectBook;
  additionalTextbooks: LectBook;
  otherTextbook: LectBook;
};

export type PlanDocModel = {
  lectPlanDocSeq: string;
  profEduPhil: string;
  sbjtOver: string;
  sbjtLearnGoal: string;
  priSubjKnow: string;
  cqiApplyIssue: string;
  profLearnMeth: string;
  asgnCont: string;
  asgnFeedMeth: string;
  userImprtIssue: string;
  profMethOther: string;
  stsCd: string;
  lectCd: string;
};

export type LectEval = {
  lectEvalStnrdSeq: string;
  evalElemCd: string;
  evalStnrdMeth: string;
  rate: number;
};

export type LectBook = {
  bookSeq: string;
  bookDivCd: string;
  bookNm: string;
  auth: string;
  publ: string;
  etc: string;
};

export type ProgPlan = {
  classProgPlanSeq: string;
  week: number;
  classCont: string;
  classMeth: string;
  classOprtCd: string;
  prepIssue: string;
};

export type EvalMethod = {
  lectEvalLearnSeq: string;
  evalMethodSeq: string;
  lectPlanDocSeq: string;
  rate: number;
  itemSeq: string;
};

export type ProfMethod = {
  methNm: string;
  profLearnMethSeq: string;
};

export type ProfReq = {
  lectPlanDocSeq: string;
};

export type LectPlanRes = {
  profLearnList: ProfMethod[];
  subjectInfo: SubjectInfo;
  abilityMajor: AbilityMajor[];
  methResponseList: ProfMethod[];
};

export type SubjectInfo = {
  sbjtCd: string;
  sbjtNm: string;
  sustDivNm: string;
  acqCredit: string;
  gradeEvalMethNm: string;
  classType1: string;
  classType2: string;
  totalHrs: string;
  staffNm: string;
};

export type AbilityMajor = {
  lvlNm: string;
  actnIndi: string;
  elemNm: string;
  majorCapaNm: string;
  chldCapaNm: string;
  typeNm: string;
};

export type SubjectPlan = {
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
  lectPlanDocSeq: string;
  uniDeptNm: string;
};

export type SubjectPlanSearch = {
  yearTerm: string;
  sbjtNm: string;
  profNm: string;
  year: string;
  status: string;
  page: number;
  size: number;
  sort: string;
};
