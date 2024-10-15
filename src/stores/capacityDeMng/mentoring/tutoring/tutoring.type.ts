import type { MenteeResDTO, MentorResDTO } from "../mentoring.type";

export type TutoringResDTO = {
    id: String;
    rowNumb: String;
    campus: String;
    team: String;
    stdMentor: String;
    mentorNm: String;
    stdMentee: String;
    menteeNm: String;
    status: String;
    report: String;
}

export type TutoringFilterDTO = {
    campusCd: String;
    statusCd: String;
    teamNm: String;
    mentorMenteeNm: String;
    page: number;
    size: number;
    sort: String;
}

export type TeamTutorInfoDTO = {
    id: String;
    teamNm: String;
    campus: String;
    mentor: MentorResDTO;
    mentee: MenteeResDTO;
}