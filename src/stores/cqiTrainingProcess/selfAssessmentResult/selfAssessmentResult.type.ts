export type EduCourseCqiEvalStnrdReqModel = {
  eduCourseCqiSeq: string;
  evalItemCd: string;
};

export type EduCourseCqiEvalStnrdModel = {
  evalItemCd: string;
  evalItemNm: string;
  listEvalStnrdCont: Array<EduCourseCqiEvalStnrdContModel>;
  eduCursCqiEvalImprSeq: string;
  impr: string;
  goal: string;
};

export type EduCourseCqiEvalStnrdContModel = {
  evalStnrdSeq: string;
  cont: string;
  eduCursCqiEvalRsltSeq: string;
  score: number;
  rslt: string;
};
