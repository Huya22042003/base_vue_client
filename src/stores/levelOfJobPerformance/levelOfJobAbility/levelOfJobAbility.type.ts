export type LevelOfJobAbilitySearchModel = {
  year: string;
  termCd: string;
  gradeCd: string;
  deptCd: string;
  jobSeq: string;
};

export type LevelOfJobAbilityListModel = {
  jobSeq: string;
  jobNm: string;
  typeNm: string;
  jobAbilSeq: string;
  jobAbilNm: string;
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
  scoreJobAbil: number;
  scoreJob: number;
  sbjtNm: string;
  deptNm: string;
};

export type JobListLevelModel = {
  jobSeq: string;
  jobNm: string;
};
