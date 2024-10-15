import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export type SubjectProfileFilterDTO = {
  eduCourseSeq?: string;
  sbjtCd?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type SubjectProfileResDTO = {
  rowNum: string;
  sbjtType: string;
  major: string;
  sbjtCd: string;
  sbjtNm: string;
  eduYear: string;
  semester: string;
  gpa: string;
  totalHrs: string;
  thryHrs: string;
  pracHrs: string;
  status: string;
  statusNm: string;
};

export type SubjectProfileDetailDTO = {
  sbjtNm: string;
  sbjtCd: string;
  sustDivNm: string;
  totalHrs: number;
  thryHrs: number;
  practiceHrs: number;
  termCd: string;
  termNm: string;
  gradeCd: string;
  gradeNm: string;
  jobAbility: JobAbilityResDTO[];
  prflSeq: string;
  sbjtOver: string;
  eduGoal: string;
  eduCont: string;
  eduInfo: string;
  otherDeptCoursePsblYn: string;
  remoteClassYn: string;
  eduCursSeq: string;
  teachLearMethod: string[];
  evalMethod: string[];
  teachClassification: string[];
  unitNcs: string[];
  unitKcs: string[];
  jobCapaUnit: JobCapaUnitResDTO[];
  listEvalMethod:CodeMngModel[];
  evalSel: string[],
  listProfLearnMng:CodeMngModel[];
  profEvalSel: string[],
  listCurriculum:CodeMngModel[];
  curriculumSel: string[],
};

export type JobAbilityResDTO = {
  taltNm: string;
  jobNm: string;
  abilNm: string;
  moduleNm: string;
  typeCd: string;
};

export type JobCapaUnitResDTO = {
  capaNm: string;
  abilCd: string;
  capaPer: string[];
  know: string;
  skil: string;
  attit: string;
};

export type SubjectProfileReqDTO = {
  sbjtCd: string;
  eduCursSeq: string;
  prflSeq: string;
  sbjtOver: string;
  eduGoal: string;
  eduCont: string;
  eduInfo: string;
  otherDeptCoursePsblYn: string;
  remoteClassYn: string;
  evalSel: string[];
  profEvalSel: string[];
  curriculumSel: string[];
}