export type LevelOfSchoolSearchModel = {
  year: string;
  termCd: string;
  gradeCd: string;
};

export type LevelOfSchoolListDTO = {
  deptCd: string;
  deptNm: string;
  scoreDept: number;
  jobSeq: string;
  jobNm: string;
  jobAbilCd: string;
  scoreJob: number;
  jobAbilSeq: string;
  jobAbilNm: string;
  scoreJobAbility: number;
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
};

export type LevelOfSchoolDeptModel = {
  deptCd: string;
  deptNm: string;
  scoreDept: number;
  rowSpan: number;
  listJob: LevelOfSchoolJobModel[];
};

export type LevelOfSchoolJobModel = {
  jobSeq: string;
  jobNm: string;
  scoreJob: number;
  rowSpan: number;
  listJobAbility: LevelOfSchoolJobAbilityModel[];
};

export type LevelOfSchoolJobAbilityModel = {
  jobAbilSeq: string;
  jobAbilNm: string;
  jobAbilCd: string;
  scoreJobAbility: number;
  rowSpan: number;
  listJobCapa: LevelOfSchoolJobCapaModel[];
};

export type LevelOfSchoolJobCapaModel = {
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
};
