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
  jobAbilCd: string;
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
  scoreJobAbil: number;
  sbjtNm: string;
  deptNm: string;
};

export type JobListLevelModel = {
  jobSeq: string;
  jobNm: string;
};

export type LevelOfJobInfoModel = {
  jobSeq: string;
  jobNm: string;
  deptNm: string;
  rowSpan: number;
  listTypeNm: Array<LevelOfJobCategoryModel>;
};

export type LevelOfJobCategoryModel = {
  typeNm: string;
  rowSpan: number;
  listJobAbility: Array<LevelOfJobAbilityModel>;
};

export type LevelOfJobAbilityModel = {
  jobAbilSeq: string;
  jobAbilNm: string;
  jobAbilCd: string;
  scoreJobAbility: number;
  sbjtNm: string;
  rowSpan: number;
  listJobCapa: Array<LevelOfJobCapaUnitModel>;
};

export type LevelOfJobCapaUnitModel = {
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
};
