export type LookupEvaluationPlanSearch = {
  firstYear: string,
  yearEdu: string,
  termEdu: string,
  sbjtNm: string,
  lectChar: string,
  stsReg: string,
  page: number,
  size: number,
  sort: string
}

export type LookupEvaluationPlan = {
  firstYear: string,
  termEdu: string,
  deptNm: string,
  sustDivNm: string,
  sbjtNm: string,
  sbjtCd: string,
  year: string,
  divNm: string,
  lectChar: string,
  currDivNm: null,
  stsReg: string,
  estbGradeCd: string,
  estbTermCd: string,
  stsCd: string
}