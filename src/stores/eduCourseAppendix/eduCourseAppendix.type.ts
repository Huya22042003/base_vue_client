export type EduCourseDocSearchModel = {
  page: number;
  size: number;
  sort: string;
  eduCourseSeq: string;
};

export type EduCourseApdxModel = {
  apdxSeq: string;
  ttl: number;
  eduCursSeq: string;
  fimFileName: string;
  fimFileOrgName: string;
};
