export type GoodTalentResponseModel = {
  eduYear: string
  majorNm: string
  deptNm: string
  gradeNm: string
  stdId: string
  userNm: string
  avg: string
  abil1Nm: string
  score1: string
  abil2Nm: string
  score2: string
  abil3Nm: string
  score3: string
  abil4Nm: string
  score4: string
}

export type GoodTalentSearchModel = {
  majorNm: string
  deptNm: string
  stdId: string
  userNm: string
  eduYear: string
  gradYear: string,
  page: number
  size: number
  sort: string
}
