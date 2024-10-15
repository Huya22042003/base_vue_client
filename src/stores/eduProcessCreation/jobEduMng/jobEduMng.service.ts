import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type { EduCourseDetailReqDTO } from "../eduCourse/eduProcess.type";
import type {
  JobEduCoreJobSelcListModel,
  JobEduJobCapaReqModel,
  JobEduVerifyChildCoreJobListModel,
  JobEduVerifyCoreJobListModel,
} from "./jobEduMng.type";

const url = `${SITE_ADMIN}/edu-course`;

export const getJobEduCoreJobSelcList = (data: EduCourseDetailReqDTO) => {
  return http.post(url + "/get-core-job-selc", data);
};

export const getListJobCapa = (data: JobEduJobCapaReqModel) => {
  return http.post(url + "/get-list-job-capa", data);
};

export const saveClassSystemList = (
  data: Array<JobEduCoreJobSelcListModel>
) => {
  return http.post(url + "/save-class-system", data);
};

export const getListVerifyJobAbility = (data: EduCourseDetailReqDTO) => {
  return http.post(url + "/get-list-verify-job-ability", data);
};

export const saveListVerifyJobAbility = (
  data: Array<JobEduVerifyCoreJobListModel>
) => {
  return http.post(url + "/save-list-verify-job-ability", data);
};

export const getListVerifyChildCoreJob = (data: EduCourseDetailReqDTO) => {
  return http.post(url + "/get-verify-child-core-job", data);
};

export const saveListVerifyChildCoreJob = (
  data: Array<JobEduVerifyChildCoreJobListModel>
) => {
  return http.post(url + "/save-verify-child-core-job", data);
};
