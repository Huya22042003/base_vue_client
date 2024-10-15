export type CqiScheduleModel = {
  rowNum: number
  writeSchdlSeq: string
  deptCd: string
  termNm: string
  termCd: string
  term: string
  year: string
  deptNm: string
  deptUniNm: string
  strDate: string
  endDate: string
  setupTime: string
}

export type CqiScheduleReqModel = {
  writeSchdlSeq: string
  deptCd: string
  year: string
  termCd: string
  strDate: string
  endDate: string
}
export type CqiScheduleSearchModel = {
  year: string
  deptNm: string
  termCd: string | null
  specializedUniversity: string
  page: number
  size: number
  sort: string
}
