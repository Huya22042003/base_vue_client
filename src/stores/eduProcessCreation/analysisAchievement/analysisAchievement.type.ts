// Edu Course Model
export type EduCourseResModel = {
  eduCursSeq: string;
  year: string;
  gradeNm: string;
  deptNm: string;
  eduCourseTypeNm: string;
  progStepNm: string;
  stsNm: string;
  stsCd: string;
  version: string;
  regBy: string;
  regDate: string;
};

export type EduCourseReqModel = {
  deptCd: string;
  year: string;
  eduCourseTypeSeq: any;
};

export type EduCourseSearchModel = {
  page: number;
  size: number;
  sort: string;
  year: string;
  gradeCd: string;
  deptCd: any;
  verCd: string;
};

export type EduCourseDetailReqDTO = {
  eduCourseSeq: string;
};

export type EduCourseDetailDTO = {
  eduCourseSeq: string;
  year: string;
  deptCd: string;
  deptNm: string;
  stage: string;
  parentStage: string;
  stsCd: string;
};

export type AnalysisAchievementModel = {
  eduCursSeq: string;
  year: string;
  deptCd: string;
  deptNm: string;
  startDate: string;
  endDate: string;
  listTerm: Array<AnalysisAchieTermModel>;
};

export type AnalysisAchieTermModel = {
  gradeCd: string;
  gradeNm: string;
  termCd: string;
  termNm: string;
  listSbjt: Array<AnalysisAchieSbjtModel>;
};

export type AnalysisAchieSbjtModel = {
  sbjtCandSeq: string;
  sbjtCd: string;
  sbjtNm: string;
  acqGpa: number;
  thryHrs: number;
  pracHrs: number;
  gradeCd: string;
  gradeNm: string;
  termCd: string;
  termNm: string;
  kcsYn: string;
  ncsYn: string;
};
