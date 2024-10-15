export type EduCourseNewSbjtModel = {
  tempid: string;
  sbjtSeq: string;
  sbjtNm: string;
  currDivCd: string;
  credit: number;
  hrs: number;
  thry: number;
  practice: number;
  openGradeCd: string;
  openTermCd: string;
  newCont: string;
  eduCourseSeq: string;
  useYn: string;
  delYn: string;
};

export type  VSbjtInfoModel = {
  sbjtCd: string
  sbjtNm: string
  termCd: string
  termNm: string
  gradeCd: string
  gradeNm: string
  divCd: string
}

export type VSbjtPageable = {
  sbjtCd: string
  sbjtNm: string
  acqCredit: string
  sustDivCd: string
  page: number
  size: number
  sort: string
}

export type ListAbility = {
  subjectSelected : Array<MajorAbilityModel>
}
export type MajorAbilityModel = {
  eduCourseSeq: string
  majorCapaSeq: string
  majorCapaNm: string
  chldCapaSeq: string
  chldCapaNm: string
}

// SBJT_CAND
export type SbjtCandFormModel = {
  sbjtCandRegDTOS: Array<SbjtCandRegModel>
  proStep: string
}

export type SbjtCandRegModel = {
  sbjtCd: string
  newreYn: string
  openRsn: string
  suitScore: string
  valScore: string
  selcCd: string
  finalVerfCd: string
  eduCourseSeq: string
  chldCapaSeq: string
  eduGoalClarityCd: string
  eduSectorConsCd: string
  currOrganValdtCd: string
  abilityArchPossiCd: string
  selectYn: string
}

// SBJT_STATE
export type SbjtStateFormModel = {
  sbjtStateReqDTOS: Array<SbjtStateRegModel>
  proStep: string
}

export type SbjtStateRegModel = {
  divCd: string
  sbjtCd: string
  mjcpCons: string
  cancelRsn: string
  eduCourseSeq: string
}
