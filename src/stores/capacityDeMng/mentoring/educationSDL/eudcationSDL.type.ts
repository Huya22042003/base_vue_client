import type { MenteeResDTO, MentorResDTO } from "../mentoring.type";

export type TeamSDLInfoDTO = {
    id: String;
    teamNm: String;
    campus: String;
    mentor: MentorResDTO;
    mentee: MenteeResDTO[];
}

export type EducationSDLResDTO = {
    id: String;
    rowNumb: String;
    campus: String;
    teamNm: String;
    stdMentor: String;
    mentorNm: String;
    menteeSize: String;
    status: String;
    listPlan: String;
}

export type EducationSDLFilterDTO = {
    campusCd: String;
    statusCd: String;
    teamNm: String;
    mentorMenteeNm: String;
    page: number;
    size: number;
    sort: String;
}