export type TeachingScheduleModel = {
  rowNum: number
  writeSchdlSeq: string
  deptCd: string
  termNm: string
  termCd: string  
  term: string  
  year: string
  deptUniNm: string
  deptNm: string
  strDate: string
  endDate: string
  setupTime: string
}

export type TeachingScheduleReqModel = {
  writeSchdlSeq: string
  deptCd: string
  year: string
  termCd: string 
  strDate: string
  endDate: string
}
export type TeachingScheduleSearchModel = {
  year: string
  deptNm: string
  termCd: string | null
  specializedUniversity: string
  page: number
  size: number
  sort: string
}
