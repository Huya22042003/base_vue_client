export type EduMeetingReportSearchModel = {
  eduCourseSeq: string;
  page: number;
  size: number;
  sort: string;
};

export type EduMeetingReportListModel = {
  rowNum: number;
  docuSeq: string;
  businessDivNm: string;
  year: string;
  deptNm: string;
  sbjt: string;
  regBy: string;
  regDate: Date;
};
