export type DashboardFilterDTO = {
    year?: string;
    targetCd?: string;
}

export type DashboardResDTO = {
    donutChart: ListDonutChartDTO;
    listCoreCompetency: DiagDashboardResDTO[];
    listEducation: DiagDashboardResDTO[];
    coreAbilityChart: ListCoreAbilityChartDTO;
}

export type ListDonutChartDTO = {
    eduCourseCreate: DonutChartResDTO;
    eduCourseApprove: DonutChartResDTO;
    slfReportCreate: DonutChartResDTO;
    slfReportApprove: DonutChartResDTO;
    lecturePlanOne: DonutChartResDTO;
    lecturePlanTwo: DonutChartResDTO;
    cqiOne: DonutChartResDTO;
    cqiTwo: DonutChartResDTO;
}

export type DonutChartResDTO = {
    label: string[],
    series: number[]
}

export type DiagDashboardResDTO = {
    diagSeq: string;
    year: string;
    diagNm: string;
    startDiag: string;
    endDiag: string;
    totalMember: number;
    totalObject: number;
}

export type ListCoreAbilityChartDTO = {
    listLabel: Array<string>;
    coreCompetencySemester1: number[];
    coreCompetencySemester2: number[];
    educationSemester1: number[];
    educationSemester2: number[];
}

export type NoticeDashboardDTO = {
    id: string;
    targetSiteCd: string;
    cont: string;
    regNm: string;
    regDate: string;
}

export type FileBoardDashboardDTO = {
    id: string;
    cont: string;
    regNm: string;
    regDate: string;
}

export type DashboardStaffResDTO = {
    lectPlan: LectPlanDocResStaffDTO[];
    listCqi: CqiResStaffDTO[];
    listNotice: NoticeStaffRestDTO[];
    listSocialServe: SociServeRestDTO[];
}

export type CqiResStaffDTO = {
    lectCd:string;
    yearTerm:string;
    eduYear:string;
    divNm:string;
    inchProfStfId:string;
    sbjtNm:string;
    acqCredit:string;
    sustDivNm:string;
    deptNm:string;
    gradeNm:string;
    staffNm:string;
    status:string;
    statusNm:string;
    year:string;
    cqiSeq:string;
    uniDeptNm:string;
    deptDivCd:string;
}

export type LectPlanDocResStaffDTO = {
    lectCd: string;
    yearTerm: string;
    eduYear: string;
    divNm: string;
    inchProfStfId: string;
    sbjtNm: string;
    acqDivNm: string;
    sustDivNm: string;
    deptNm: string;
    gradeNm: string;
    staffNm: string;
    status: string;
    statusNm: string;
    year: string;
    major: string;
}

export type NoticeStaffRestDTO = {
    id: string;
    targetSiteCd: string;
    cont: string;
    regNm: string;
    regDate: string;
}

export type SociServeRestDTO = {
    id: string;
    typeSocial: string;
    typeCd: string;
    status: string;
    topic: string;
    timeSocialStart: string;
    timeSocialEnd: string;
    timeRecruitmentStart: string;
    timeRecruitmentEnd: string;
}