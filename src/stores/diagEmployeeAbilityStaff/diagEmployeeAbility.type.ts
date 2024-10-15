export type DiagEmpAbilityStaffListModel = {
  diagSeq: string;
  diagNm: string;
  diagDurStr: Date | string;
  diagDurEnd: Date | string;
  statusNm: string;
  statusCode: string;
  publicInfo: string;
  indvInfoAgrYn: string;
};

export type DiagEmpAbilityStaffResultModel = {
  diagSeq: string;
  diagNm: string;
  excutionDate: Date | string;
  statusNm: string;
};

export type DiagEmpAbilityPublicInfoReqModel = {
  diagSeq: string;
};

export type DiagEmpInfoModel = {
  stdNo: string;
  stdNm: string;
  genderNm: string;
  deptNm: string;
  experienceNm: string;
  staffPstnNm: string;
  diagGuide: string;
};

export type EmpAbilityModel = {
  empAbilitySeq: string;
  empAbilityNm: string;
  listChildAbility: Array<ChildEmpAbilityModel>;
};

export type ChildEmpAbilityModel = {
  empAbilityChldAbilitySeq: string;
  chldAbilityNm: string;
};

export type DiagEmpAbilityStaffDataStepReqModel = {
  empAbilitySeq: string;
  childAbilitySeq: string;
  diagSeq: string;
};

export type DiagEmpAbilityStaffQuestionModel = {
  elemSeq: string;
  elemNm: string;
  cont: string;
  answerChoose: string;
  rsltSeq: string;
  answerLevel: number;
  listAnswer: Array<DiagEmpAbilityStaffAnswerModel>;
};

export type DiagEmpAbilityStaffAnswerModel = {
  answerSeq: string;
  cont: string;
  answerLevel: number;
};

export type DiagEmpAbilityStaffSaveModel = {
  diagSeq: string;
  listQuestion: Array<DiagEmpAbilityStaffQuestionModel>;
};

export type DiagEmpAbilityStaffDetailResultModel = {
  stdNo: string;
  stdNm: string;
  genderNm: string;
  deptNm: string;
  experienceNm: string;
  staffPstnNm: string;
  listAbility1level: Array<DiagEmpAbiStaffAbility1levelModel>;
};

export type DiagEmpAbiStaffAbility1levelModel = {
  ability1levelSeq: string;
  ability1levelNm: string;
  category: string;
  content: string;
  listProgram: Array<DiagEmpAbiStaffProgramModel>;
};

export type DiagEmpAbiStaffProgramModel = {
  programSeq: string;
  programNm: string;
  url: string;
};
