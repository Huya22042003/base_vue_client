export type SimpleDeptInfoDTO = {
  deptCd: string
  deptNm: string
}
export type MeetReportEduCbbDTO = {
  deptInfoList: Array<SimpleDeptInfoDTO>
}

export type MeetAtteReqDTO = {
  atteSeq: string
  nm: string
  posi: string
  aff: string
  divCd: string
}

export type MeetReportEduFilterDTO = {
  deptNm: "",
  year: "",
  bsinesDivCd: "",
  delYn: string
  page: number
  size: number
  sort: string
}

export type MeetReportEduResDTO = {
  docuSeq: string
  majorNm: string
  deptNm: string
  year: string
  agnd: string
  meetDate: string
  regNm: string
  regDate: string
  deptCd: string
  meetTime: string
  loc: string
  cont: string
  bsinesDivCd: string
  bsinesDivEtc: string
  sbjt: string
  cost: string
  vote: string
  writer: string
}

export type MeetReportEduReqDTO = {
  docuSeq: string
  majorNm: string
  year: string
  sbjt: string
  meetDate: string
  deptCd: string
  meetTime: string
  loc: string
  cont: string
  listMeetAtte: Array<MeetAtteReqDTO>
}

export type SelectListFilterDTO = {
  id: string
  name: string
  type: string
  deptId: string
  lstIdSelect: Array<string>
  page: number
  size: number
  sort: string
}

export type SelectListResDTO = {
  userCd: string
  majorNm: string
  deptCd: string
  deptNm: string
  userNm: string
  year: string
  posi: string
}