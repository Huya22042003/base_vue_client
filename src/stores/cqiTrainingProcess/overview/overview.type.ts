import type { EduCourseCqiEvalStnrdModel } from "../selfAssessmentResult/selfAssessmentResult.type";

export type EduCourseOverviewDTO = {
  eduCursCqiSeq: string;
  year: string;
  deptCd: string;
  eduCursTypeSeq: string;
  stsCd: string;
  usagePlan: string;
  majorOverviewState: EduCourseOverviewStateDTO[];
  majorOverviewGroup: EduCourseOverviewGroupDTO[];
};

export type EduCourseOverviewStateDTO = {
  eduCursCqiStateSeq: string;
  stateDivCd: string;
  state: string | number;
};

export type EduCourseOverviewGroupDTO = {
  eduCursCqiGroupSeq: string;
  divCd: string;
  staffNo: string;
  nm: string;
  posi: string;
  aff: string;
  majField: string;
  remark: string;
  id?: string;
};
