import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export type JobEduCoreJobSelcListModel = {
  coreJobSelcSeq: string;
  eduCursSeq: string;
  jobNm: string;
  defn: string;
  typeNm: string;
  listNcsSysClassification: Array<JobEduNcsSysClassificationModel>;
};

export type JobEduNcsSysClassificationModel = {
  classSystemListSeq: string;
  jobCapaStndSeq: string;
  ncsKcsClassCd: string;
  ncsKcsClassNm: string;
  mainClassSeq: string;
  mainClassNm: string;
  midClassSeq: string;
  midClassNm: string;
  subClassSeq: string;
  subClassNm: string;
  detailClassSeq: string;
  detailClassNm: string;
  delYn: string;
  listMainClass: Array<CodeMngModel>;
  listMidClass: Array<CodeMngModel>;
  listSubClass: Array<CodeMngModel>;
  listDetailClass: Array<CodeMngModel>;
};

export type JobEduJobCapaReqModel = {
  code: string | CodeMngModel[];
  type: string;
};

export type JobEduVerifyCoreJobListModel = {
  coreJobSelcSeq: string;
  jobNm: string;
  listNcsKcs: Array<JobEduVerifyNcsKcsModel>;
};

export type JobEduVerifyNcsKcsModel = {
  code: string;
  listVerifyJobAbility: Array<JobEduVerifyJobAbilityModel>;
};

export type JobEduVerifyJobAbilityModel = {
  jobAbilSeq: string;
  classSysCd: string;
  classSysNm: string;
  jobAbilCd: string;
  jobAbilNm: string;
  eduNeed: number;
  jobImpt: number;
  average: number;
  useYn: string;
  isCheck: boolean;
};

export type JobEduVerifyChildCoreJobListModel = {
  coreJobSelcSeq: string;
  eduCursSeq: string;
  jobNm: string;
  listNcsKcs: Array<JobEduVerifyChildNcsKcsModel>;
};

export type JobEduVerifyChildNcsKcsModel = {
  code: string;
  rowSpan: number;
  listJobAbility: Array<JobEduVerifyCmmnJobAbilityModel>;
};

export type JobEduVerifyCmmnJobAbilityModel = {
  jobAbilSeq: string;
  jobAbilCd: string;
  jobAbilNm: string;
  classSysCd: string;
  classSysNm: string;
  listJobCapaUnit: Array<JobEduVerifyJobCapaUnitModel>;
  rowSpan: number;
};

export type JobEduVerifyJobCapaUnitModel = {
  jobCapaUnitSeq: string;
  capaUnitNm: string;
  isCheck: boolean;
  listJobCapaUnitPerform: Array<JobEduVerifyJobCapaUnitPerformModel>;
  rowSpan: number;
};

export type JobEduVerifyJobCapaUnitPerformModel = {
  capaUnitPerformStnrdSeq: string;
  jobPerformStnrdVerfSeq: string;
  cont: string;
  isCheck: boolean;
  unuseRsn: string;
};
