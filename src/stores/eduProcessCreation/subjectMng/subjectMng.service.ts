import http from "@/utils/http";
import type {
  CreateSubjectFilterDTO,
  CreateSubjectReqDTO,
  NewSubjectFilterDTO,
  NewSubjectReqDTO,
  SaveCreateSubjectDTO,
  SubMngSameReplaceMappingModel,
  SubMngSaveSameReplaceMappingModel,
  SubMngSaveSbjtCandModel,
  SubMngSbjtInfoSearchModel,
  VSbjtPageableDto,
} from "./subjectMng.type";
import { SITE_ADMIN } from "@/constants/common.const";
import type { EduCourseDetailReqDTO } from "../eduCourse/eduProcess.type";

const url = `${SITE_ADMIN}/edu-course/`;

export const getNewSubject = (req: NewSubjectFilterDTO) => {
  return http.post(url + "get-new-subject", req);
};

export const saveNewSubject = (req: NewSubjectReqDTO) => {
  return http.post(url + "save-new-subject", req);
};

export const getCreateSubject = (req: CreateSubjectFilterDTO) => {
  return http.post(url + "get-create-subject", req);
};

export const getCreateSubjectForm = (req: CreateSubjectFilterDTO) => {
  return http.post(url + "get-form-create-subject", req);
};

export const getSubMngMappingSubject = (req: EduCourseDetailReqDTO) => {
  return http.post(url + "get-mapping-subject", req);
};

export const saveSubMngCoreAndMapping = (req: SubMngSaveSbjtCandModel) => {
  return http.post(url + "save-mapping-subject", req);
};

export const getAllVSbjtInfo = (req: VSbjtPageableDto) => {
  return http.post(url + "show-subject", req);
};

export const saveCreateSubjectForm = (req: SaveCreateSubjectDTO) => {
  return http.post(url + "save-create-subject", req);
};

export const getSubMngSbjtInfoListDTO = (req: SubMngSbjtInfoSearchModel) => {
  return http.post(url + "get-sub-mng-sbjt-info", req);
};

export const getSubMngSameReplaceMapping = (req: EduCourseDetailReqDTO) => {
  return http.post(url + "get-same-replace-mapping", req);
};

export const saveSubMngSameReplaceMapping = (
  req: SubMngSaveSameReplaceMappingModel
) => {
  return http.post(url + "save-same-replace-mapping", req);
};
