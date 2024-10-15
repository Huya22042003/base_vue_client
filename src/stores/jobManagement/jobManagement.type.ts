export type JobListModel = {
  jobSeq: string;
  deptNm: string;
  taltNrtgTypeNm: string;
  jobNm: string;
  useYn: string;
  regBy: string;
  regDate: Date;
};

export type JobSearchModel = {
  deptNm: string;
  taltNrtgTypeNm: string;
  jobNm: string;
  page: number;
  size: number;
  sort: string;
};

export type JobTaltNrtgTypeListModel = {
  taltNrtgTypeSeq: string;
  typeNm: string;
};

export type JobSaveModel = {
  jobSeq: string;
  taltNrtgTypeSeq: string;
  jobNm: string;
  defn: string;
  relatedCertificates: string;
  useYn: string;
};

export type JobDetailModel = {
  deptNm: string;
  jobSeq: string;
  taltNrtgTypeSeq: string;
  jobNm: string;
  defn: string;
  relatedCertificates: string;
  useYn: string;
};
