export type NewSubjectFilterDTO = {
  eduCourseSeq: string;
};

export type NewSubjectDTO = {
  sbjtSeq: string;
  sbjtNm: string;
  currDivCd: string;
  currDivNm: string;
  gpa: number;
  hrs: number;
  thry: number;
  prac: number;
  estbGradeCd: string;
  estGradeNm: string;
  estbTermCd: string;
  estbTermNm: string;
  newCont: string;
  eduCursSeq: string;
  isData: string;
};

export type NewSubjectReqDTO = {
  eduCourseSeq: string;
  listData: NewSubjectDTO[];
};

export type SubMngCoreAndMappingModel = {
  listMappingSubject: Array<SubMngMappingSubjectModel>;
  listCoreAbility: Array<SubMngCoreAbilityModel>;
  listChildAbility: Array<SubMngChildAbilityModel>;
  saveType: string;
};

export type SubMngMappingSubjectModel = {
  gradeCd: string;
  gradeNm: string;
  termCd: string;
  termNm: string;
  rowSpan: number;
  listSbjt: Array<SubMngSbjtCandModel>;
};

export type SubMngSbjtCandModel = {
  sbjtCandSeq: string;
  sbjtCd: string;
  sbjtNm: string;
  cateComplete: string;
  rowSpan: number;
  isCheck: boolean;
  listJobAbility: Array<SubMngCmmnJobAbilityModel>;
  listRateCoreAbility: Array<SubMngRateCoreAbilityModel>;
};

export type SubMngCmmnJobAbilityModel = {
  jobAbilSeq: string;
  jobAbilNm: string;
  listChild: Array<SubMngJobCapaUnitModel>;
};

export type SubMngJobCapaUnitModel = {
  abilMappSeq: string | null;
  childSeq: string;
  childNm: string;
  rate: string;
};

export type SubMngRateCoreAbilityModel = {
  abilMappSeq: string | null;
  coreAbilitySeq: string;
  coreChildAbilitySeq: string;
  rate: string;
};

export type SubMngCoreAbilityModel = {
  coreAbilitySeq: string;
  coreAbilityNm: string;
  countChildAbility: number;
};

export type SubMngChildAbilityModel = {
  childAbilitySeq: string;
  childAbilityNm: string;
  coreAbilitySeq: string;
};

export type SubMngSaveSbjtCandModel = {
  eduCourseSeq: string;
  saveType: string;
  listMappingSubject: Array<SubMngMappingSubjectModel>;
};

export type CreateSubjectResDTO = {
  jobSeq: string;
  taltNrtgTypeSeq: string;
  typeNm: string;
  jobNm: string;
  subjectNm: CreateListSbjtSelResDTO[];
};

export type CreateListSbjtSelResDTO = {
  sbjtCandSeq: string;
  jobSeq: string;
  sbjtCd: string;
  sbjtNm: string;
  acqGpa: string;
  tempSaveYn: string;
  jobAbility: CreateSubjectSelDTO[];
};

export type CreateSubjectSelDTO = {
  cdId: string;
  cdNm: string;
  keyJobCapa: Number;
  keyJobCapaPerform: Number;
  isDisable: boolean;
  jobCapa: CreateSubjectSelDTO[];
  jobCapaPerform: CreateSubjectSelDTO[];
};

export type CreateSubjectFormDTO = {
  jobAbility: AbilityFormDTO[];
  jobCapa: AbilityFormDTO[];
  jobCapaPerform: AbilityFormDTO[];
};

export type AbilityFormDTO = {
  cdId: string;
  cdNm: string;
  upCdId: string;
};

export type CreateSubjectFilterDTO = {
  eduCourseSeq: string;
};

export type VSbjtPageableDto = {
  sbjtCd: string;
  sbjtNm: string;
  acqCredit: string;
  sustDivCd: string;
  totalHrs: string;
  thryHrs: string;
  pracHrs: string;
  page: number;
  size: number;
  sort: string;
};

export type CreateSubjectReqDTO = {
  sbjtCandSeq: string;
  jobSeq: string;
  sbjtCd: string;
  eduCursSeq: string;
  tempSaveYn: string;
  delYn: string;
  jobAbility: AbilityFormDTO[];
  jobCapa: AbilityFormDTO[];
  jobCapaPerform: AbilityFormDTO[];
};

export type SubMngSaveSameReplaceMappingModel = {
  isSameSbjt: boolean;
  eduCourseSeq: string;
  listSameReplaceMapping: Array<SubMngSameReplaceMappingModel>;
};

export type SubMngSameListAndSameSbjtModel = {
  listSameReplaceMapping: Array<SubMngSameReplaceMappingModel>;
  sameSbjtYn: string;
};

export type SubMngSameReplaceMappingModel = {
  rowNum: number;
  sameReplaceMappSeq: string | null;
  eduCursSeq: string | null;
  sbjtBeforeCd: string | null;
  sbjtBeforeNm: string | null;
  gradeBeforeNm: string | null;
  termBeforeNm: string | null;
  sustDivBeforeNm: string | null;
  sbjtBeforeNmEng: string | null;
  acqGpaBefore: number | null;
  thryHrsBefore: number | null;
  pracHrsBefore: number | null;
  sbjtAfterCd: string | null;
  sbjtAfterNm: string | null;
  gradeAfterNm: string | null;
  termAfterNm: string | null;
  sustDivAfterNm: string | null;
  sbjtAfterNmEng: string | null;
  acqGpaAfter: number | null;
  thryHrsAfter: number | null;
  pracHrsAfter: number | null;
  sameReplaceDivCd: string;
  rsnFstCd: string;
  rsnSecCd: string;
  delYn: string;
};

export type SubMngSbjtInfoSearchModel = {
  sbjtNm: string;
  sbjtCd: string;
  sustDivCd: string;
  acqGpa: string;
  totalHrs: string;
  thryHrs: string;
  pracHrs: string;
  eduCourseSeq: string;
  type: string;
  listSbjtCd: Array<String>;
  page: number;
  size: number;
  sort: string;
};

export type SubMngSbjtInfoListModel = {
  sbjtCd: string;
  sbjtNm: string;
  sbjtNmEng: string;
  sustDivNm: string;
  acqGpa: number;
  totalHrs: number;
  thryHrs: number;
  pracHrs: number;
  gradeNm: string;
  termNm: string;
};

export type SaveCreateSubjectDTO = {
  eduCourseSeq: string;
  list: CreateSubjectReqDTO[];
};
