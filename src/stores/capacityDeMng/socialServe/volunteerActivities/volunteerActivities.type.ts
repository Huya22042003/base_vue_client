export type SocialServeResDTO = {
    rowNumb: string;
    id: string;
    status: string;
    topic: string;
    timeSocialStart: string;
    timeSocialEnd: string;
    timeSocial: string;
    timeRecruitmentStart: string;
    timeRecruitmentEnd: string;
    timeRecruitment: string;
    recruitmentNumb: string;
    regisNumb: string;
    fieldSocial: string;
    typeSocial: string;
    objectSocial: string;
}

export type SocialServeFilterDTO = {
    status: string;
    topic: string;
    typeSocial: string;
    fieldSocial: string;
    objectSocial: string;
    page: number;
    size: number;
    sort: string;
}

export type SocialServeSimpleDTO = {
    cdId: string;
    cdNm: string;
    upCdId: string;
    etc: string;
}

export type SocialServeReqDTO = {
    id: string;
    typeServe: SocialServeSimpleDTO;
    topic: string;
    contentVolunteer: string;
    timeActive: string;
    activeDateStart: string;
    activeDateEnd: string;
    activeDay: SocialServeSimpleDTO[];
    recruitmentDateStart: string;
    recruitmentDateEnd: string;
    recruitmentNumb: string;
    objectServe: SocialServeSimpleDTO[];
    fieldServe: SocialServeSimpleDTO[];
    addressServe: string;
    url: string;
    personCharge: string;
    numberCharge: string;
}

export type SocialServeDetailDTO = {
    id: string;
    typeVolunteer: string;
    topic: string;
    contentVolunteer: string;
    uptimeAdmitted: number;
    workTimeStart: string;
    workTimeEnd: string;
    activeDay: SocialServeSimpleDTO[];
    recruitmentTimeStart: string;
    recruitmentTimeEnd: string;
    recruitmentQuantity: number;
    objectServe: SocialServeSimpleDTO[];
    fieldServe: SocialServeSimpleDTO[];
    addressVolunteer: string;
    url: string;
    personCharge: string;
    numberCharge: string;
    chargePhone: {
        first: string,
        between: string,
        last: string
    },
    objectVolunteer: string[],
    fieldVolunteer: string[],
    workDate: {
        id: string, 
        cdNm: string, 
        hour: number, 
        minute: number, 
        checked: boolean
    } []
}

export type FormDetailUserFilterDTO = {
    id: string;
    page: number;
    size: number;
    sort: string;
}

export type SocialResearchFilterDTO = {
    major: string;
    department: string;
    year: string;
    name: string;
    divActive: string;
    socialTitle: string;
    typeDiv: string;
    page: number;
    size: number;
    sort: string;
}

export type SocialIndividualFilterDTO = {
    status: string;
    major: string;
    department: string;
    name: string;
    page: number;
    size: number;
    sort: string;
}