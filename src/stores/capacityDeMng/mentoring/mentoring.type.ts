export type MentorResDTO = {
    id: String;
    name: String;
    code: String;
    scoreMedium: String;
    yearEdu: String;
    major: String;
    department: String;
    phone: String;
    receiver: String;
    bankNm: String;
    bankCode: String;
    isStudy: String;
    studyNm: String;
}

export type MenteeResDTO = {
    id: String;
    name: String;
    code: String;
    scoreMedium: String;
    yearEdu: String;
    major: String;
    department: String;
    phone: String;
    receiver: String;
    bankNm: String;
    bankCode: String;
    isStudy: String;
    studyNm: String;
}

export type AtcReportResDTO = {
    eduSeq: String;
    plan: ActPlanDetailResDTO[];
    report: ActReportDetailDTO[];
}

export type ActReportDetailDTO = {
    id:String;
    planSeq:String;
    subjectMn:String;
    target:String;
    eduAddress:String;
    eduDate:string;
    eduStart:String;
    eduEnd:String;
    cont:String;
    share:String;
    planNextWeek:String;
}

export type ActPlanDetailResDTO = {
    id: String;
    week: String;
    cont: String;
}

export type ActPlanResDTO = {
    teamIntro: String;
    subjectNm: String;
    topic: String;
    planNextWeek: String;
    methodEdu: String;
    documentEdu: String;
    actPlanEdu: ActPlanDetailResDTO[];
}