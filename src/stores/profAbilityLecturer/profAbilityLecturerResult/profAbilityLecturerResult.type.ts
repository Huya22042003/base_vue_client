export type DiagResultProfAbilitySearchModel = {
  diagNm: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  sort: string;
};

export type DiagResultProfAbilityListModel = {
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

export type DiagResultProfAbilityReqModel = {
  diagSeq: string;
};

export type DiagResultProfAbilityDetailModel = {
  diagSeq: string;
  diagNm: string;
};

export type DiagResultProfAbiDetailListModel = {
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

export type DiagResultProfAbiDetailSearchModel = {
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

export type DiagWisePrideAbilityModel = {
  wisePrideSeq: string;
  wisePrideNm: string;
};

// Detail Staff No

export type ItemWisePrideProfModel = {
  wisePrideSeq: string;
  wisePrideNm: string;
  score: number;
  numberQus: number;
  levelNm: string;
};

export type ItemProfAbilityProfModel = {
  profAbilitySeq: string;
  profAbilityNm: string;
  totalScore: number;
  numberQus: number;
};

export type DiagResultDetailProfModel = {
  targMembSeq: string;
  staffNm: string;
  staffNo: string;
  departmentNm: string;
  staffPstnNm: string;
  experienceNm: string;
  genderNm: string;
  dateDiag: Date;
  listWisePride: Array<ItemWisePrideProfModel>;
  listProfAbility: Array<ItemProfAbilityProfModel>;
};

export type DiagResultDetailProfReqModel = {
  diagSeq: string;
  staffNo: string;
};
