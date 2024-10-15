export type LearnAbility = {
  learnAbilitySeq: string;
  learnAbilityNm: string;
  defn: string;
  useYn: string;
  delYn: string;
  chldList: LearnChldAbility[];
};

export type LearnChldAbility = {
  learnAbilityChldAbilitySeq: string;
  chldAbilityNm: string;
  defn: string;
  useYn: string;
  delYn: string;
};

export type LearnAbilityRes = {
  learnAbilityReqDTOS: LearnAbility[];
  learnAbiDel: LearnAbility[];
  chldAbiDel: LearnChldAbility[];
}