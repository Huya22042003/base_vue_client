export type CapstoneDesignApproveDTO = {
  id: string;
  content: string;
  listDetail: ExcellenceRegisterReqDTO[];
};

export type CapstoneDesignDetailDTO = {
  idCert: String;
  lessonId: string;
  cqiId: string;
  code: string;
  name: string;
  register: string;
  type: string;
  fieldRegister: string;
  status: string;
  dataEval: ExcellenceRegisterResDTO[];
  dataEvalDegist: ExcellenceRegisterResDTO[];
  dataEvalOperate: ExcellenceRegisterResDTO[];
  dataEvalAchievement: ExcellenceRegisterResDTO[];
};

export type CapstoneDesignFilerDTO = {
  id: String;
};

export type ExcellenceRegisterReqDTO = {
  id: string;
  scoreEval: string;
  content: string;
};

export type ExcellenceRegisterResDTO = {
  id: string;
  divCd: string;
  divNm: string;
  score: string;
  scoreEval: string;
  content: string;
  supportIssue: string;
};

export type HyflexAlReqDTO = {
  id: string;
  content: string;
  listEval: HyflexClassroomEvalDTO[];
  opinionAll: OpinionAllResDTO[];
};

export type HyflexAlResDetailDTO = {
  id: String;
  name: string;
  code: string;
  register: string;
  trackRegister: string;
  operatingMethod: string;
  applicationProcess: string;
  trackCd: string;
  status: string;
  content?: string;
  dataEval: HyflexClassroomEvalDTO[];
  dataAfterClass: HyflexClassroomEvalDTO[];
  dataTrackAClass: HyflexClassroomEvalDTO[];
  dataTrackBClass: HyflexClassroomEvalDTO[];
  dataTrackAClassSelect: HyflexClassroomEvalDTO[];
  dataTrackBClassSelect: HyflexClassroomEvalDTO[];
  dataBeforeClass: HyflexClassroomEvalDTO[];
  opinionAll: OpinionAllResDTO[];
  opinionAfterClass: OpinionAllResDTO;
  opinionTrackAClass: OpinionAllResDTO;
  opinionTrackBClass: OpinionAllResDTO;
  opinionBeforeClass: OpinionAllResDTO;
};

export type HyflexClassroomEvalDTO = {
  id: String;
  divCd: String;
  topic: string;
  factorEval: String;
  score: String;
  scoreResult: number;
  useYn:String;
};

export type OpinionAllResDTO = {
  id: String;
  opinion: String;
  divCd: String;
};

export type ReasonRejectDTO = {
  id: string;
  reason: string;
};

export type ReasonRejectResDTO = {
  approveName: string;
  department: string;
  reason: string;
};

export type SubjectApproveFilterResDTO = {
  type: string;
  status: string;
  subjectName: string;
  register: string;
  approveName: string;
  page: number;
  size: number;
  sort: string;
};

export type SubjectApproveResDTO = {
  id: string;
  typeCd: string;
  type: string;
  fieldNm: string;
  statusCd: string;
  status: string;
  yearEdu: string;
  semester: string;
  yearSemester: string;
  name: string;
  sustNm: string;
  year: string;
  register: string;
  registerDate: string;
  approveName: string;
  approveDate: string;
};
