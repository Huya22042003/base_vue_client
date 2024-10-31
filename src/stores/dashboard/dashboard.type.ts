export type DashboardFilterDTO = {
  year?: string;
};

export type DashboardResDTO = {
  donutChart: ListDonutChartDTO;
  dashboardRate: DashboardRateDTO;
  noticeDashboard: NoticeDashboardDTO[];
  qaDashboard: NoticeDashboardDTO[];
  sbjtDeptResponse: SbjtDeptResponseDTO;
};

export type ListDonutChartDTO = {
  evalPlanDocOne: DonutChartResDTO;
  evalPlanDocTwo: DonutChartResDTO;
  evalJobPerformOne: DonutChartResDTO;
  evalJobPerformTwo: DonutChartResDTO;
  lecturePlanOne: DonutChartResDTO;
  lecturePlanTwo: DonutChartResDTO;
  cqiOne: DonutChartResDTO;
  cqiTwo: DonutChartResDTO;
};

export type DonutChartResDTO = {
  rateDoing: number;
  rateDone: number;
};

export type DashboardRateDTO = {
  stsDoing: string;
  rateDoing: number;
  stsDone: string;
  rateDone: number;
};

export type NoticeDashboardDTO = {
  id: string;
  cont: string;
  regNm: string;
  regDate: string;
  createdDate: string;
};

export type SbjtDeptResponseDTO = {
  labels: string[];
  sbjtCnt: number[];
};
//
export type DashboardStaffResDTO = {
  lectPlan: LectPlanDocResStaffDTO[];
  listCqi: CqiResStaffDTO[];
  listNotice: NoticeStaffRestDTO[];
  listSocialServe: SociServeRestDTO[];
};

export type CqiResStaffDTO = {
  lectCd: string;
  yearTerm: string;
  eduYear: string;
  divNm: string;
  inchProfStfId: string;
  sbjtNm: string;
  acqCredit: string;
  sustDivNm: string;
  deptNm: string;
  gradeNm: string;
  staffNm: string;
  status: string;
  statusNm: string;
  year: string;
  cqiSeq: string;
  uniDeptNm: string;
  deptDivCd: string;
};

export type LectPlanDocResStaffDTO = {
  lectCd: string;
  yearTerm: string;
  eduYear: string;
  divNm: string;
  inchProfStfId: string;
  sbjtNm: string;
  acqDivNm: string;
  sustDivNm: string;
  deptNm: string;
  gradeNm: string;
  staffNm: string;
  status: string;
  statusNm: string;
  year: string;
  major: string;
};

export type NoticeStaffRestDTO = {
  id: string;
  targetSiteCd: string;
  cont: string;
  regNm: string;
  regDate: string;
};

export type SociServeRestDTO = {
  id: string;
  typeSocial: string;
  typeCd: string;
  status: string;
  topic: string;
  timeSocialStart: string;
  timeSocialEnd: string;
  timeRecruitmentStart: string;
  timeRecruitmentEnd: string;
};

export type LecturePlanSchedule = {
  lectPlanDocWriteStrDate: string;
  lectPlanDocWriteEndDate: string;
  evalPlanDocWriteStrDate: string;
  evalPlanDocWriteEndDate: string;
  jobCapaEvalStrDate: string;
  jobCapaEvalEndDate: string;
  sbjtCqiWriteStrDate: string;
  sbjtCqiWriteEndDate: string;
  term: string;
  year: string;
};
