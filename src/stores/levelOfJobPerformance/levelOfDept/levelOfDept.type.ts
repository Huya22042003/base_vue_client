export type LevelOfDeptSearchModel = {
  year: string;
  termCd: string;
  gradeCd: string;
  deptCd: string;
};

export type LevelOfDeptListModel = {
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
};

export type LevelOfDeptJobInfoModel = {
  jobSeq: string;
  jobNm: string;
  rowSpan: number;
  listTypeNm: Array<LevelOfDeptJobCategoryModel>;
};

export type LevelOfDeptJobCategoryModel = {
  typeNm: string;
  rowSpan: number;
  listJobAbility: Array<LevelOfDeptJobAbilityModel>;
};

export type LevelOfDeptJobAbilityModel = {
  jobAbilSeq: string;
  jobAbilNm: string;
  jobAbilCd: string;
  scoreJobAbility: number;
  sbjtNm: string;
  rowSpan: number;
  listJobCapa: Array<LevelOfDeptJobCapaUnitModel>;
};

export type LevelOfDeptJobCapaUnitModel = {
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
};
