export type JobAbilityReg = {
  jobAbilSeq: string;
  typeCd: string;
  jobCapaHightLevel: string;
  jobCapaMediumLevel: string;
  jobCapaLowLevel: string;
  jobCapaDetailLevel: string;
  jobAbilNm: string;
  jobAbilCd: string;
  jobAbilYear: string;
  ver: string;
  defn: string;
  learnModuleNm: string;
  lvl: string;
};

export type JobAbilityData = {
  rowNumber: string;
  jobAbilSeq: string;
  typeCd: string;
  typeNm: string;
  hightNo: string;
  hightNm: string;
  mediumNo: string;
  mediumNm: string;
  lowNo: string;
  lowNm: string;
  detailNo: string;
  detailNm: string;
  jobAbilCd: string;
  jobAbilNm: string;
  lvl: string;
  ver: string;
  learnModuleNm: string;
  jobAbilYear: string;
  defn: string;
  mediumList: Array<JobCapaStandard>;
  lowList: Array<JobCapaStandard>;
  detailList: Array<JobCapaStandard>;
  haveVer: string;
  hightCapa: string;
  mediumCapa: string;
  lowCapa: string;
  detailCapa: string;
};

export type SearchData = {
  typeCd: string;
  hightCd: string;
  mediumCd: string;
  lowCd: string;
  detailCd: string;
  jobAbilNm: string;
  size: number;
  page: number;
  sort: string;
};

export type JobCapaStandard = {
  jobCapaStndSeq: string;
  jobCapaStndNm: string;
  jobCapaStndCd: string;
  upJobCapaStndSeq: string;
};

export type JobCapaUnit = {
  order: string;
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  performList: Array<JobCapaUnitPerform>;
  know: string;
  skil: string;
  attit: string;
  useYn: string;
  jobAbilSeq: string;
  delYn: string;
};

export type JobCapaUnitPerform = {
  order: string;
  capaUnitPerformStnrdSeq: string;
  cont: string;
  delYn: string;
  jobCapaUnitSeq: string;
};

export type JobScope = {
  jobAbilSeq: string;
  consdInfo: string;
  relDoc: string;
  tool: string;
  metl: string;
};

export type JobHistory = {
  jobAbilSeq: string;
  jobAbilCd: string;
  jobAbilNm: string;
  authNm: string;
  supportYear: string;
};


export type CheckVer = {
  ver: string;
  seq: string;
};