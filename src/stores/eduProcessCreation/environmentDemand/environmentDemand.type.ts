export type EnvironmentDemandListModel = {
  dataSeq: string;
  dataCd: string;
  dataNm: string;
  cont: string;
};

export type EnvironDemTitleModel = {
  code: string;
  title: string;
  listEnvironDemand: Array<EnvironmentDemandListModel>;
};

export type EnvironDemSaveModel = {
  eduCourseSeq: string;
  progStepCd: string;
  listEnvironDem: Array<EnvironDemTitleModel>;
};

export type EnvironDemReqModel = {
  eduCourseSeq: string;
  upCdId: string;
  upRefrId: string;
};

export type EnvironDemandShowReqModel = {
  eduCourseSeq: string;
  upCdId: string;
};

export type EnvironDemandShowSaveModel = {
  eduCourseSeq: string;
  progStepCd: string;
  listEnvironDemand: Array<EnvironmentDemandListModel>;
};
