export type EduCourseApdxSearchModel = {
  eduCourseSeq: string;
  page: number;
  size: number;
  sort: string;
};

export type EduCourseApdxModel = {
  rowNumb: number;
  apdxSeq: string;
  ttl: string;
  eduCursSeq: string;
  fimFileName: string;
  fimFileOrgName: string;
};

export type EduCourseApdxSaveModel = {
  apdxSeq: string | null;
  ttl: string;
  eduCursSeq: string;
};
