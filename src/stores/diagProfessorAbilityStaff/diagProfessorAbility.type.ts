export type DiagProfAbilityStaffListModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date | string;
  diagDurEnd: Date | string;
  statusNm: string;
  statusCode: string;
  publicInfo: string;
  indvInfoAgrYn: string;
};

export type DiagProfAbilityStaffResultModel = {
  diagSeq: string;
  diagNm: string;
  excutionDate: Date | string;
  statusNm: string;
};

export type DiagProfAbilityPublicInfoReqModel = {
  diagSeq: string;
};

export type DiagProfInfoModel = {
  stdNo: string;
  stdNm: string;
  genderNm: string;
  deptNm: string;
  experienceNm: string;
  staffPstnNm: string;
  diagGuide: string;
};

export type ProfAbilityModel = {
  profAbilitySeq: string;
  profAbilityNm: string;
  listChildAbility: Array<ChildProfAbilityModel>;
};

export type ChildProfAbilityModel = {
  profAbilityChldAbilitySeq: string;
  chldAbilityNm: string;
};

export type DiagProfAbilityStaffDataStepReqModel = {
  profAbilitySeq: string;
  childAbilitySeq: string;
  diagSeq: string;
};

export type DiagProfAbilityStaffQuestionModel = {
  elemSeq: string;
  elemNm: string;
  cont: string;
  answerChoose: string;
  rsltSeq: string;
  answerLevel: number;
  listAnswer: Array<DiagProfAbilityStaffAnswerModel>;
};

export type DiagProfAbilityStaffAnswerModel = {
  answerSeq: string;
  cont: string;
  answerLevel: number;
};

export type DiagProfAbilityStaffSaveModel = {
  diagSeq: string;
  listQuestion: Array<DiagProfAbilityStaffQuestionModel>;
};

export type DiagProfAbilityStaffDetailResultModel = {
  stdNo: string;
  stdNm: string;
  genderNm: string;
  deptNm: string;
  experienceNm: string;
  staffPstnNm: string;
  listWisePride: Array<DiagProfAbiStaffWisePrideModel>;
};

export type DiagProfAbiStaffWisePrideModel = {
  wisePrideSeq: string;
  wisePrideNm: string;
  category: string;
  content: string;
  listProgram: Array<DiagProfAbiStaffProgramModel>;
};

export type DiagProfAbiStaffProgramModel = {
  programSeq: string;
  programNm: string;
  url: string;
};
