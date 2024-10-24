import type { EduCourseOverviewDTO } from "./overview/overview.type";
import type { EduCourseCqiEvalStnrdModel } from "./selfAssessmentResult/selfAssessmentResult.type";

export type EduCourseCqiListModel = {
  rowNum: number;
  eduCursSeq: string;
  year: string;
  deptCd: string;
  deptNm: string;
  eduCursTypeSeq: string;
  eduCourseTypeNm: string;
  eduCourseTypeCd: string;
  stsCd: string;
  stsNm: string;
  regBy: string;
  regDate: string;
  typeOfRedirect: string;
  eduCourseCqiSeq: string;
};

export type EduCourseCqiSearchModel = {
  year: string;
  deptNm: string;
  page: number;
  size: number;
  sort: string;
};

export type EduCourseCqiFilterDetail = {
  deptCd: string;
  year: string;
  type: string;
}

export type EduCourseCqiReq = {
  eduCursCqiSeq: string;
  year: string;
  deptCd: string;
  eduCursTypeSeq: string;
  stsCd: string;
  usagePlan: string;
  overview: EduCourseOverviewDTO;
  evalStnrd: EduCourseCqiEvalStnrdModel[];
}