export type AbilityTalentResponseModel = {
  eduYear: string
  termNm: string
  majorNm: string
  deptNm: string
  gradeNm: string
  stdId: string
  userNm: string
  abilityScore: string
}

export type AbilityTalentSearchModel = {
  abilitySeq: string
  majorNm: string
  deptNm: string
  stdId: string
  userNm: string
  eduYear: string
  gradYear: string

  page: number
  size: number
  sort: string
}

export type TabAbilityGoodResponseModel = {
  id: string
  name: string
}
