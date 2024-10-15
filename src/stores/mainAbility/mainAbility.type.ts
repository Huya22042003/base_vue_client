export type CoreAbility = {
  coreAbilitySeq: string;
  coreAbilityNm: string;
  defn: string;
  useYn: string;
  delYn: string;
  childAbilityList: ChildAbility[];
};

export type ChildAbility = {
  chldAbilitySeq: string;
  chldAbilityNm: string;
  defn: string;
  useYn: string;
  delYn: string;
};

export type CoreAbilityRes = {
  coreAbilityResDTOList: CoreAbility[];
  coreAbiDel: CoreAbility[];
  chldAbiDel: ChildAbility[];
}