import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { EduCourseCqiEvalStnrdReqModel } from "./selfAssessmentResult.type";

const url = `${SITE_ADMIN}/edu-course-cqi`;

export const getListEduCourseCqiEvalStnrd = (
  data: EduCourseCqiEvalStnrdReqModel
) => {
  return http.post(`${url}/list-cqi-eval-stnrd`, data);
};
