import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { EduCourseCqiFilterDetail } from "../cqiTrainingProcess.type";
import type { SelectStaffFilterDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";

const url = `${SITE_ADMIN}/edu-course-cqi`;

export const getMajorOverview = (params: EduCourseCqiFilterDetail) => {
  return http.post(`${url}/overview`, params);
};

export const getSelectStaffTypeCqi = (data: SelectStaffFilterDTO) => {
  return http.post(url + '/get-select-staff', data)
}