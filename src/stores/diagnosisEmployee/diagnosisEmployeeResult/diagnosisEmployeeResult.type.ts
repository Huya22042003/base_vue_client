export type DiagResultEmpAbilitySearchModel = {
  diagNm: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagResultEmpAbilityListModel = {
  diagSeq: string;
  rowNumb: number;
  year: string;
  termCd: string;
  diagNm: string;
  diagDurStr: Date;
  diagDurEnd: Date;
  statusCd: string;
  statusNm: string;
  quantityTarget: number;
  quantityAnswer: number;
  regDate: Date;
};

export type DiagResultEmpAbilityReqModel = {
  diagSeq: string;
};

export type DiagResultEmpAbilityDetailModel = {
  diagSeq: string;
  diagNm: string;
};

export type DiagResultEmpAbiDetailListModel = {
  rowNumb: string;
  staffNm: string;
  staffNo: string;
  departmentNm: string;
  staffPstnNm: string;
  experienceNm: string;
  genderNm: string;
  dateDiag: Date;
  scores: Map<string, number>;
};

export type DiagResultEmpAbiDetailSearchModel = {
  diagSeq: string;
  staffNm: string;
  staffNo: string;
  departmentCd: string;
  staffPstnCd: string;
  experienceCd: string;
  genderCd: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagAbility1LevelModel = {
  ability1levelSeq: string;
  ability1levelNm: string;
};

// Detail Staff No

export type ItemAbility1LevelEmpModel = {
  ability1levelSeq: string;
  ability1levelNm: string;
  score: number;
  numberQus: number;
  levelNm: string;
};

export type ItemEmpAbilityEmpModel = {
  empAbilitySeq: string;
  empAbilityNm: string;
  totalScore: number;
  numberQus: number;
};

export type DiagResultDetailEmpModel = {
  targMembSeq: string;
  staffNm: string;
  staffNo: string;
  departmentNm: string;
  staffPstnNm: string;
  experienceNm: string;
  genderNm: string;
  dateDiag: Date;
  listAbility1level: Array<ItemAbility1LevelEmpModel>;
  listEmpAbility: Array<ItemEmpAbilityEmpModel>;
};

export type DiagResultDetailEmpReqModel = {
  diagSeq: string;
  staffNo: string;
};
