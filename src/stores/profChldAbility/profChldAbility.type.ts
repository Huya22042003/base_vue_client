export type ProfAbilityDTO = {
  wisePrideSeq: string;
  temporaryYn: string;
  isDelAll: string;
  profCreDTOList: ProfAbilityCreDTO[];
  profDel: ProfAbilityCreDTO[];
  chldDel: ProfAbilityChldCreDTOn[];
};

export type ProfAbilityCreDTO = {
  profAbilitySeq: string;
  profAbilityNm: string;
  defn: string;
  wisePrideSeq: string;
  temporaryYn: string
  useYn: string;
  status: string;
  majorIndex: string
  delYn: string
  profAbilityChldCreDTOS: ProfAbilityChldCreDTOn[];
};

export type ProfAbilityChldCreDTOn = {
  profAbilityChldAbilitySeq: string;
  chldAbilityNm: string;
  defn: string;
  profAbilitySeq: string;
  useYn: string;
  delYn: string;
  status: string;
};


export type ProfAbility = {
  rowNum: number;
  profAbilitySeq: string;
  profAbilityNm: string;
  writeYn: string;
  regId: string;
  regDate: Date;
};

export type ProfSearch = {
  page: number;
  size: number;
  sort: string;
};

export type ProfAbilityChldIdDTO = {
  profAbilityChldSeq: string;

};

export type ProfAbilityIdDTO = {
  profAbilitySeq: string;

};

export type ElemPageSearchDTO = {
  profAbilityNm: string
  subAbilityNm: string
  stsAbility: string
  stsDel: string
};


export type ElemDetailObDTO = {
  cmpnElemSeq: string
  elemNm: string
  useYn: string
  defn: string
};

export type ElemDetailDTO = {
  profAbilityChldAbilitySeq: string
  profAbilitySeq: string
  profNm: string
  subNm: string
  elemDetailOb: ElemDetailObDTO[]
};

export type ChldIdDTO = {
  profAbilityChldSeq: string
  delYn: string
};

export type ElemIdDTO = {
  cmpnElemSeq: string
};