export type WiseTalentResponseModel = {
  eduYear: string
  termNm: string
  majorNm: string
  deptNm: string
  gradeNm: string
  stdId: string
  userNm: string
  finalDiagDate: string
}

export type WiseTalentSearchModel = {
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
