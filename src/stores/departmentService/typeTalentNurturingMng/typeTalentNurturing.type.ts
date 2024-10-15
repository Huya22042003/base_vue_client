export type TaltNrtgTypeResDTO = {
  id: string;
  deptCd: string;
  deptmentNm: string;
  typeNm: string;
  defn: string;
  afterGradTrack: string
  regId: string;
  regDate: string;
  useYn: string;
};

export type TaltNrtgTypeFilterDTO = {
  dept: string;
  typeTalent: string;
  delYn: string;
  page: number;
  size: number;
  sort: string;
};

export type JobFilterDTO = {
  idTalt: string;
  listId: Array<string>;
};

export type JobReqDTO = {
  id: string;
  jobNm: string;
  defn: string;
  useYn: string;
};

export type JobResDTO = {
  id: string;
  jobNm: string;
  defn: string;
  useYn: string;
};

export type TaltNrtgTypeReqDTO = {
  id: string;
  deptCd: string;
  typeNm: string;
  defn: string;
  afterGradTrack: string
  useYn: string;
};

export type TaltNrtgTypeDetailDTO = {
  id: string;
  deptCd: string;
  deptNm: string;
  typeNm: string;
  defn: string;
  afterGradTrack: string
  useYn: string;
};

export type SimpleDeptInfoDTO = {
  deptCd: string;
  deptNm: string;
}

export type TaltNrtgTypeCbbDTO = {
  deptInfoList: Array<SimpleDeptInfoDTO>
}
