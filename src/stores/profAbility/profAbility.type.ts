export type WisePrideCreDTO = {
  wisePrideSeq: string;
  wisePrideNm: string;
  temporaryYn: string
  defn: string;
  useYn: string;
  compeResDTOS: ConstiCompeCreDTO[];
};

export type ConstiCompeCreDTO = {
  profAbilityRsltCmpnSeq: string;
  standardScoreMin: string
  standardScoreMax: string
  contDefn: string;
  lvlCd: string;
  profAbilitySeq: string;
  useYn: string;
  compeProgCreDTOS: ConstiCompeProgResDTO[];
};

export type ConstiCompeProgResDTO = {
  profAbilityRsltCmpnProgSeq: string;
  lvlCd: string;
  progNm: string;
  url: string;
  profAbilityRsltCmpnSeq: string;
  useYn: string;
};

export type WisePrideAbiSearch = {
  page: number;
  size: number;
  sort: string;

}
// ==================================
export type WisePrideId = {
  wisePrideSeq: string
}

export type WisePrideSubDetailDTO = {
  wisePrideSeq: string
  wisePrideNm: string
  defn: string
  useYn: string
  temporaryYn: string
  profAbilityDetailDTOS: ProfAbilityDetailDTO[]
}

export type ProfAbilityDetailDTO = {
  profAbilitySeq: string
  profAbilityNm: string
  delYn: string
  defn: string
  temporaryYn: string
  chldCreDTOList: ProfAbilityChldDetailDTO[]
}

export type ProfAbilityChldDetailDTO = {
  profAbilityChldAbilitySeq: string
  chldAbilityNm: string
  profAbilitySeq: string
  useYn: string
  delYn: string
}

export type ProfChldId = {
  profAbilityChldSeq: string
}

export type ProfId = {
  profAbilitySeq: string
}

export type PopUpInfo = {
  id?: number,
  progNm?: string,
  url?: string,
  status?: string
}
