export type EduCourseCqiListModel = {
  rowNum: number;
  eduCursSeq: string;
  year: string;
  deptCd: string;
  deptNm: string;
  eduCourseTypeNm: string;
  stsCd: string;
  stsNm: string;
  regBy: string;
  regDate: string;
  typeOfRedirect: string;
};

export type EduCourseCqiSearchModel = {
  year: string;
  deptNm: string;
  page: number;
  size: number;
  sort: string;
};
