export type NewEducationScheduleModel = {
  rowNum: number
  writeSchdlSeq: string,
  deptCd: string
  year: string
  deptUniNm: string
  deptNm: string
  strDate: string
  endDate: string
  newCreationTime: string
  regId: string
  regDate: string
  regNm: string
}
export type NewEducationScheduleReqModel = {
  writeSchdlSeq: string,
  deptCd: string
  year: string
  semester: string
  strDate: string
  endDate: string
}

export type NewEducationScheduleSearchModel = {
  year: string
  deptNm: string
  specializedUniversity: string
  page: number,
  size: number,
  sort: string
}
