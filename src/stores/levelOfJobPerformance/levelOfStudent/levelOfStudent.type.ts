export type LevelOfStudentSearchModel = {
  year: string;
  termCd: string;
  gradeCd: string;
  deptCd: string;
  stdNo: string;
  stdNm: string;
};

export type LevelOfStudentListModel = {
  stdId: string;
  stdNm: string;
  jobSeq: string;
  jobNm: string;
  typeNm: string;
  jobAbilSeq: string;
  jobAbilNm: string;
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
  scoreJobAbility: number;
  scoreJob: number;
  scoreStudent: number;
};

export type JobCapaUnitOfStudent = {
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  scoreJobCapa: number;
};

export type JobAbilityOfStudent = {
  jobAbilSeq: string;
  jobAbilNm: string;
  jobCapaUnits: JobCapaUnitOfStudent[];
  scoreJobAbility: number;
  rowSpan: number;
  typeNm: string; 
};

export type JobOfStudent = {
  jobSeq: string;
  jobNm: string;
  typeNm: string;
  jobAbilities: JobAbilityOfStudent[];
  scoreJob: number;
  rowSpan: number;
};

export type StudentLevelOfStudent = {
  stdId: string;
  stdNm: string;
  jobs: JobOfStudent[];
  scoreStudent: number;
  rowSpan: number;
};
