export const SCREEN = {
  login: {
    path: '/login',
    name: 'Login',
  },
  home: {
    path: '/',
    name: 'Home'
  },
  notFound: {
    path: '/not-found',
    name: 'Not Found',
  },
  internalError: {
    path: '/internal-error',
    name: 'Internal Error',
  },
  unauthorized: {
    path: '/unauthorized',
    name: 'Unauthorized',
  },
  resourceManagement: {
    path: '/resource',
    name: 'resource',
  },
  roleResourceManagement: {
    path: '/role-resource',
    name: 'role-resource',
  },
  pathMenu: {
    path: '/menu',
    name: 'menu',
  },
  crudPathMenu: {
    path: '/menu/:mode',
    name: 'menu/',
  },
  subjectProfile: {
    path: '/subject-profile',
    name: 'subjectProfile'
  },
  teachPlan: {
    path: '/teach-plan',
    name: 'teachPlan',
  },
  detailSubject: {
    path: 'detail',
    name: 'detailSubject',
  },
  notification: {
    path: '/notification',
    name: 'notification',
  },
  detailNotification: {
    path: 'detail',
    name: 'detailNotification',
  },
  socialActivities: {
    path: '/social-activities',
    name: 'socialActivities',
  },
  detailSocialActivities: {
    path: 'detail/:type(personal|school)',
    name: 'detailSocialActivities',
  },
  cqi: {
    path: '/cqi',
    name: 'cqi',
  },
  detailCqi: {
    path: 'detail/:type(major|general)',
    name: 'detailCqi',
  },
  talentEduGoalsMngDept: {
    path: '/talent-edu-goals-dept',
    name: 'talentEduGoalsMngDept'
  },
  talentEduGoalsDeptAction: {
    path: '/talent-edu-goals-dept-action',
    name: 'talentEduGoalsMngDeptAction'
  },
  studentsReceiveLectures: {
    path: '/students-receive-lectures',
    name: 'studentsReceiveLectures',
  },
  detailStudentsReceiveLectures: {
    path: 'detail',
    name: 'detailStudentsReceiveLectures',
  },
  talentEduGoalsMng: {
    path: '/talent-edu-goals',
    name: 'talentEduGoalsMng'
  },
  typeTalentNurturingMngDept: {
    path: '/type-talent-nurturing-dept',
    name: 'typeTalentNurturingMngDept'
  },
  typeTalentNurturingCrudDept: {
    path: '/type-talent-nurturing-dept/:mode',
    name: 'typeTalentNurturingCrudDept'
  },
  majorLowerGradeDept: {
    path: '/major-lower-grade-dept',
    name: 'majorLowerGradeDept'
  },
  majorLowerGradeFormDept: {
    path: '/major-lower-grade-dept/:mode',
    name: 'majorLowerGradeFormDept'
  },
  consititutiveMajorDept: {
    path: '/consititutive-major-dept',
    name: 'consititutiveMajorDept'
  },
  consititutiveMajorFormDept: {
    path: '/consititutive-major-dept/:mode',
    name: 'consititutiveMajorFormDept'
  },
  actionIndexKsa: {
    path: '/action-index-ksa',
    name: 'actionIndexKsa'
  },
  actionIndexKsaForm: {
    path: '/action-index-ksa/:mode',
    name: 'actionIndexKsaForm'
  },
  meettingReportEdu: {
    path: '/metting-report-edu',
    name: 'meettingReportEdu'
  },
  meettingReportEduForm: {
    path: '/metting-report-edu/:mode',
    name: 'meettingReportEduForm'
  },
  roleCreate: {
    path: "/role/create",
    name: "roleCreate",
  },
  roleList: {
    path: "/role/list",
    name: "roleList",
  },
  roleEdit: {
    path: "/role/edit/",
    name: "roleEdit",
  },
  roleDetail: {
    path: "/role/detail/",
    name: "roleDetail",
  },
  talentEduUni: {
    path: '/talent-edu-uni',
    name: 'talentEduUni'
  },
  mainAbility: {
    path: '/main-ability',
    name: 'mainAbility'
  },
  generalFactor: {
    path: '/general-factor',
    name: 'generalFactor'
  },
  generalFactorCrud: {
    path: '/general-factor/create',
    name: 'generalFactorCrud'
  },
  standardAction: {
    path: '/standard-action',
    name: 'standardAction'
  },
  standardActionCrud: {
    path: '/standard-action/create',
    name: 'standardActionCrud'
  },
  moveMenu: {
    path: "/moveMenu",
    name: "moveMenu",
  },
  questAndAns: {
    path: '/qna-mng',
    name: 'questAndAns',
  },
  crudAns: {
    path: '/detail-ans/:mode',
    name: 'detailAns',
  },
  learnAbility: {
    path: '/learn-ability',
    name: 'learnAbility'
  },
  learnComponent: {
    path: '/learn-component',
    name: 'learnComponent'
  },
  learnComponentCrud: {
    path: '/learn-component/create',
    name: 'learnComponentCrud'
  },
  eduCourseType: {
    path: '/edu-course-type-mng',
    name: 'eduCourseType',
  },
  profLearn: {
    path: '/prof-learn-mng',
    name: 'profLearn',
  },
  evaluationMethod: {
    path: '/evaluation-method-mng',
    name: 'evaluationMethod',
  },
  trackMng: {
    path: '/track-mng',
    name: 'track-mng',
  },
  crudTrackMng: {
    path: '/detail-track/:mode',
    name: 'detail-track/',
  },
  empAbility: {
    path: "/emp-ability",
    name: "emp-ability",
  },
  createEmpAbility: {
    path: "/emp-action/:mode",
    name: "emp-action",
  },
  subEmpAbility: {
    path: "/sub-emp-ability",
    name: "sub-emp-ability",
  },
  subEmpAbList: {
    path: "/sub-emp-list",
    name: "sub-emp-list",
  },
  subElemAbList: {
    path: "/sub-emp-elem",
    name: "subEmpElem",
  },
  subElemAb: {
    path: "/sub-emp-elem-action",
    name: "subEmpElemAction",
  },
  bestTalent: {
    path: '/best-talent-mng',
    name: 'bestTalentMng',
  },
  goodTalent: {
    path: '/good-talent-mng',
    name: 'goodTalentMng',
  },
  intellectualTalent: {
    path: '/intellectual-talent-mng',
    name: 'intellectualTalentMng',
  },
  eliteTalentForType: {
    path: '/elite-talent-for-type-mng',
    name: 'eliteTalentForTypeMng',
  },
  eduScheduleCreative: {
    path: '/edu-schedule-creative',
    name: 'eduScheduleCreative',
  },
  portfolio: {
    path: '/portfolio',
    name: 'Portfolio',
  },
  trackingProcess: {
    path: '/tracking-process',
    name: 'trackingProcess',
  },
  trackingProcessDetail: {
    path: '/tracking-process/detail',
    name: 'trackingProcessDetail',
  },
  tutoring: {
    path: '/tutoring',
    name: 'tutoring',
  },
  tutoringDetail: {
    path: '/tutoring/detail',
    name: 'tutoringDetail',
  },
  educationSDL: {
    path: '/education-sdl',
    name: 'educationSDL',
  },
  educationSDLDetail: {
    path: '/education-sdl/detail',
    name: 'educationSDLDetail',
  },
  volunteerActivites: {
    path: '/volunteer-activities',
    name: 'volunteerActivites',
  },
  volunteerActivitesForm: {
    path: '/volunteer-activities/:mode',
    name: 'volunteerActivitesForm',
  },
  volunteerActivitesUserRegist: {
    path: '/volunteer-activities/user-regist',
    name: 'volunteerActivitesUserRegist',
  },
  researchVolunteerActivites: {
    path: '/volunteer-activities-research',
    name: 'researchVolunteerActivites',
  },
  volunteerIndividual: {
    path: '/volunteer-individual',
    name: 'volunteerIndividual',
  },
  coreCompetencyDiagnosticSheet: {
    path: "/core-competency-diagnosis-sheet",
    name: "coreCompetencyDiagnosticSheet",
  },
  coreCompetencyDiagnosticSheetCrud: {
    path: "/core-competency-diagnosis-sheet/:mode",
    name: "coreCompetencyDiagnosticSheetCrud",
  },
  coreCompetencyDiagnosis: {
    path: "/core-competency-diagnosis",
    name: "coreCompetencyDiagnosis",
  },
  coreCompetencyDiagnosisCrud: {
    path: "/core-competency-diagnosis/:mode",
    name: "coreCompetencyDiagnosisCrud",
  },
  coreCompetencyDiagnosisResultList: {
    path: "/core-competency-diagnosis-result",
    name: "coreCompetencyDiagnosisResultList",
  },
  coreCompetencyDiagnosisResult: {
    path: "/core-competency-diagnosis-result/:mode",
    name: "coreCompetencyDiagnosisResult",
  },
  coreMajorCompDiagnosisSheet: {
    path: "/core-major-diagnostic-sheet",
    name: "coreMajorDiagnosticSheet",
  },
  coreMajorCompDiagnosisSheetCrud: {
    path: "/core-major-diagnostic-sheet/:mode",
    name: "coreMajorDiagnosticSheetCrud",
  },
  coreMajorCompDiagnosis: {
    path: "/core-major-diagnostic",
    name: "coreMajorDiagnostic",
  },
  coreMajorCompDiagnosisCrud: {
    path: "/core-major-diagnostic/:mode",
    name: "coreMajorDiagnosticCrud",
  },
  coreMajorCompDiagnosisResultList: {
    path: "/core-major-diagnostic-result-list",
    name: "coreMajorDiagnosticResultList",
  },
  coreMajorCompDiagnosisResult: {
    path: "/core-major-diagnostic-result/:mode",
    name: "coreMajorDiagnosticResult",
  },
  diagnosisLearningAbilitySheet: {
    path: "/diagnosis-learning-ability-sheet",
    name: "diagnosisLearningAbilitySheet",
  },
  diagnosisLearningAbilitySheetCrud: {
    path: "/diagnosis-learning-ability-sheet/:mode",
    name: "diagnosisLearningAbilitySheetCrud",
  },
  diagnosisLearningAbility: {
    path: "/diagnosis-learning-ability",
    name: "diagnosisLearningAbility",
  },
  diagnosisLearningAbilityCrud: {
    path: "/diagnosis-learning-ability/:mode",
    name: "diagnosisLearningAbilityCrud",
  },
  diagnosisLearningAbilityResults: {
    path: "/diagnosis-learning-ability-results",
    name: "diagnosisLearningAbilityResults",
  },
  diagnosisLearningAbilityResultsCrud: {
    path: "/diagnosis-learning-ability-results/:mode",
    name: "diagnosisLearningAbilityResultsCrud",
  },
  diagnosingLecturerSheet: {
    path: "/diagnosis-lecturer-sheet",
    name: "diagnosingLecturerSheet",
  },
  diagnosingLecturerSheetCrud: {
    path: "/diagnosis-lecturer-sheet/:mode",
    name: "diagnosingLecturerSheetCrud",
  },
  diagnosingLecturer: {
    path: "/diagnosis-lecturer",
    name: "diagnosingLecturer",
  },
  diagnosingLecturerCrud: {
    path: "/diagnosis-lecturer/:mode",
    name: "diagnosingLecturerCrud",
  },
  diagnosingLecturerResults: {
    path: "/diagnosis-lecturer-results",
    name: "diagnosingLecturerResults",
  },
  diagnosingLecturerResultsCrud: {
    path: "/diagnosis-lecturer-results/:mode",
    name: "diagnosingLecturerResultsCrud",
  },
  diagnosingLecturerResultsProfCrud: {
    path: "/diagnosis-lecturer-results-prof/:mode",
    name: "diagnosingLecturerResultsProfCrud",
  },
  basicAcademicDiagnosisSheet: {
    path: "/basic-academic-diagnosis-sheet",
    name: "basicAcademicDiagnosisSheet",
  },
  basicAcademicDiagnosisSheetCrud: {
    path: "/basic-academic-diagnosis-sheet/:mode",
    name: "basicAcademicDiagnosisSheetCrud",
  },
  basicAcademicDiagnosis: {
    path: "/basic-academic-diagnosis",
    name: "basicAcademicDiagnosis",
  },
  basicAcademicDiagnosisCrud: {
    path: "/basic-academic-diagnosis/:mode",
    name: "basicAcademicDiagnosisCrud",
  },
  basicAcademicDiagnosisResult: {
    path: "/basic-academic-diagnosis-result",
    name: "basicAcademicDiagnosisResult",
  },
  basicAcademicDiagnosisResultCrud: {
    path: "/basic-academic-diagnosis-result/:mode",
    name: "basicAcademicDiagnosisResultCrud",
  },
  diagnosingEmployeeSheet: {
    path: "/diagnosis-employee-sheet",
    name: "diagnosingEmployeeSheet",
  },
  diagnosingEmployeeSheetCrud: {
    path: "/diagnosis-employee-sheet/:mode",
    name: "diagnosingEmployeeSheetCrud",
  },
  diagnosingEmployee: {
    path: "/diagnosis-employee",
    name: "diagnosingEmployee",
  },
  diagnosingEmployeeCrud: {
    path: "/diagnosis-employee/:mode",
    name: "diagnosingEmployeeCrud",
  },
  diagnosingEmployeeResults: {
    path: "/diagnosis-employee-results",
    name: "diagnosingEmployeeResults",
  },
  diagnosingEmployeeResultsCrud: {
    path: "/diagnosis-employee-results/:mode",
    name: "diagnosingEmployeeResultsCrud",
  },
  diagnosingEmployeeResultsEmpCrud: {
    path: "/diagnosis-employee-results-emp/:mode",
    name: "diagnosingEmployeeResultsEmpCrud",
  },
  searchLevelCapacity: {
    path: "/search-level-capacity",
    name: "searchLevelCapacity",
  },
  searchLevelCapacityDetail: {
    path: "/search-level-capacity/:mode",
    name: "searchLevelCapacityDetail",
  },
  searchLevelCapacityDetailResults: {
    path: "/search-level-capacity-relust/:mode",
    name: "searchLevelCapacityDetailResults",
  },
  searchLevelSpecialized: {
    path: "/search-level-specialized",
    name: "searchLevelSpecialized",
  },
  searchLevelSpecializedDetail: {
    path: "/search-level-specialized/:mode",
    name: "searchLevelSpecializedDetail",
  },
  searchLevelSpecializedResults: {
    path: "/search-level-specialized-relust/:mode",
    name: "searchLevelSpecializedResults",
  },
  searchLevelAbilityStudy: {
    path: "/search-level-ability-study",
    name: "searchLevelAbilityStudy",
  },
  searchLevelAbilityStudyDetail: {
    path: "/search-level-ability-study/:mode",
    name: "searchLevelAbilityStudyDetail",
  },
  searchLevelAbilityStudyResults: {
    path: "/search-level-ability-study-relust/:mode",
    name: "searchLevelAbilityStudyResults",
  },
  searchLevelAcademicSpe: {
    path: "/search-level-academic-specialized",
    name: "searchLevelAcademicSpe",
  },
  searchLevelAcademicSpeDetail: {
    path: "/search-level-academic-specialized/:mode",
    name: "searchLevelAcademicSpeDetail",
  },
  searchLevelOutlineSpe: {
    path: "/search-level-outline-specialized",
    name: "searchLevelOutlineSpe",
  },
  searchLevelOutlineSpeDetail: {
    path: "/search-level-outline-specialized/:mode",
    name: "searchLevelOutlineSpeDetail",
  },
  surveySatisfiedList: {
    path: "/survey-satisfaction",
    name: "surveySatisfiedList",
  },
  surveySatisfiedFom: {
    path: "/survey-satisfaction/:mode",
    name: "surveySatisfiedFom",
  },
  surveySatisfiedResult: {
    path: "/survey-satisfaction-result/:mode",
    name: "surveySatisfiedResult",
  },
  surveySatisfactionOffCampus: {
    path: "/survey-satisfaction-off-campus",
    name: "surveySatisfactionOffCampus"
  },
  surveySatisfactionOffCampusCrud: {
    path: "/survey-satisfaction-off-campus/:mode",
    name: "surveySatisfactionOffCampusCrud"
  },
  surveySatisfactionOffCampusResult: {
    path: "/survey-satisfaction-off-campus-result/:mode",
    name: "surveySatisfactionOffCampusResult"
  },
  historyLogin: {
    path: "/history-login",
    name: "history-login",
  },
  historyMenuAccess: {
    path: "/history-menu-access",
    name: "history-menu-access",
  },
  manageApprovedSubjects: {
    path: "/manage-approved-subjects",
    name: "manage-approved-subjects",
  },
  capstoneDesign: {
    path: "/capstone-design",
    name: "capstone-design",
  },
  hyflexAL: {
    path: "/hyflex-al",
    name: "hyflexAL",
  },
  approveSubjectStaff: {
    path: "/approve-subject-staff",
    name: "approveSubjectStaff"
  },
  capstoneDesignStaff: {
    path: "/capstone-design-staff",
    name: "capstoneDesignStaff"
  },
  hyflexALStaff: {
    path: "/hyflex-al-staff",
    name: "hyflexALStaff"
  },
  diagEmployeeAbilityStaff: {
    path: "/diag-employee-ability",
    name: "diagEmployeeAbilityStaff",
  },
  detailDiagEmployeeAbilityStaff: {
    path: "/diag-employee-ability/detail",
    name: "detailDiagEmployeeAbilityStaff",
  },
  resultDiagEmployeeAbilityStaff: {
    path: "/diag-employee-ability/result",
    name: "resultDiagEmployeeAbilityStaff",
  },
  diagProfessorAbilityStaff: {
    path: "/diag-professor-ability",
    name: "diagProfessorAbilityStaff",
  },
  detailDiagProfessorAbilityStaff: {
    path: "/diag-professor-ability/detail",
    name: "detailDiagProfessorAbilityStaff",
  },
  resultDiagProfessorAbilityStaff: {
    path: "/diag-professor-ability/result",
    name: "resultDiagProfessorAbilityStaff",
  },
  profChldAbility: {
    path: "/prof-chld-ability",
    name: "profChldAbility",
  },
  profChldList: {
    path: "/prof-chld-list",
    name: "profChldList",
  },
  profAbi: {
    path: "/prof-abi",
    name: "profAbi",
  },
  profAbiList: {
    path: "/prof-list",
    name: "profAbiList",
  },
  subElemList: {
    path: "/sub-elem",
    name: "subElem",
  },
  subElem: {
    path: "/sub-elem-action",
    name: "subElemAction",
  },
  subjectProfiles: {
    path: "/subject-profiles",
    name: "subject-profiles",
  },
  teachingPlans: {
    path: "/teaching-plans",
    name: "teachingPlans",
  },
  lookUpCQI: {
    path: "/look-up-cqi",
    name: "look-up-cqi",
  },
  talentTrainingReport: {
    path: "/talent-training-report",
    name: "talent-training-report",
  },
  notificationCategory: {
    path: '/notification-category',
    name: 'notification-category',
  },
  crudNotificationCategory: {
    path: '/notification-category/:mode',
    name: 'notification-category-create',
  },
  docRoom: {
    path: '/document-room',
    name: 'document-room',
  },
  crudDocRoom: {
    path: '/document-room/:mode',
    name: 'document-room-create',
  },
  notificationMessage: {
    path: '/notification-message',
    name: 'notification-message',
  },
  crudNotificationMessage: {
    path: '/notification-message/:mode',
    name: 'notification-message-create',
  },
  schTeachPlan: {
    path: "sch-teach-plan",
    name: "schTeachPlan",
  },
  schCqi: {
    path: "sch-cqi",
    name: "schCqi"
  },
  eduProcessCreation: {
    path: '/edu-process-creation',
    name: 'eduProcessCreation',
  },
  eduProcessCreationMng: {
    path: '/edu-process-creation/:mode(create|edit)',
    name: 'eduProcessCreationMng',
  },
  eduProcessApprovement: {
    path: '/edu-process-approvement',
    name: 'eduProcessApprovement',
  },
  eduSubjectProfileDetail: {
    path: '/edu-subject-profile-detail/edit',
    name: 'eduSubjectProfileDetail',
  },
  manageAssessmentReports: {
    path: "/manage-assessment-reports",
    name: "manageAssessmentReports",
  },
  manageAssessmentDetailReport: {
    path: "/manage-assessment-reports/detail",
    name: "manageAssessmentDetailReport",
  },
  registerCheckEduProcess: {
    path: "/register-check-edu-process",
    name: "registerCheckEduProcess",
  },
  evalCourseReport: {
    path: "/eval-course-report",
    name: "evalCourseReport"
  },
  evalCourseReportApprove: {
    path: "/eval-course-report-approve",
    name: "evalCourseReportApprove"
  },
  evalCourseReportApproveDetail: {
    path: "/eval-course-report-approve/detail",
    name: "evalCourseReportApproveDetail"
  },
  evalCourseReportDetail: {
    path: "/eval-course-report/detail",
    name: "evalCourseReportDetail"
  },
  userManagement: {
    path: "/user-management",
    name: "userManagement"
  },
  userManagementCrud: {
    path: "/user-management/:mode",
    name: "userManagementCrud"
  },
  qnaStaff: {
    path: '/qna-staff',
    name: 'qnaStaff',
  },
  qnaStaffDetail: {
    path: '/qna-staff/detail/:mode',
    name: 'qnaStaffDetail',
  },
  infoUniversity: {
    path: "/info-university",
    name: "infoUniversity"
  },
  infoUniversityAction: {
    path: "/info-university-action",
    name: "infoUniversityAction"
  },
  jobManagement: {
    path: "/job-management",
    name: "jobManagement"
  },
  learningModule: {
    path: "/learning-module",
    name: "learningModule"
  },
  CQITrainingProcess: {
    path: "/training-process",
    name: "CQITrainingProcess"
  },
  createTrainingProcess: {
    path: "create/:mode(major|general)",
    name: "createTrainingProcess"
  },
  coreAbilityJob: {
    path: "/core-ability-job",
    name: "coreAbilityJob"
  },
  coreAbilityJobDetail: {
    path: "/core-ability-job/detail",
    name: "coreAbilityJobDetail"
  },
  eduProcessMeetingMinutes: {
    path: "/edu-process-meeting-minutes",
    name: "eduProcessMeetingMinutes"
  },
  eduProcessMeetingMinutesCrud: {
    path: "/edu-process-meeting-minutes/:mode",
    name: "eduProcessMeetingMinutesCrud"
  },
  jobAbilityManagement: {
    path: "/job-ability-management",
    name: "jobAbilityManagement"
  },
  jobAbilityManagementCrud: {
    path: "/job-ability-management/:mode",
    name: "jobAbilityManagementCrud"
  },
  lookupReport: {
    path: "/lookup-report",
    name: "lookupReport"
  },
  lookupTechPlan: {
    path: "/lookup-tech-plan",
    name: "lookupTechPlan"
  },
  lookupAssessmentPlan: {
    path: "/lookup-assessment-plan",
    name: "lookupAssessmentPlan"
  },
  lookupSubjectCqi: {
    path: "/lookup-subject-cqi",
    name: "lookupSubjectCqi"
  },
  lookupAchievement: {
    path: "/lookup-achievement",
    name: "lookupAchievement"
  },
  lectureDesignSchedule: {
    path: "/lecture-design-schedule",
    name: "lectureDesignSchedule"
  },
  finalGradeManagement: {
    path: "/final-grade-management",
    name: "final-grade-management"
  },
  studentPerformanceAssessment: {
    path: "/student-performance-assessment",
    name: "student-performance-assessment"
  },
  jobCompetencyStudent: {
    path: "/job-competency-student",
    name: "job-competency-student"
  },
  jobCompetency: {
    path: "/job-competency",
    name: "job-competency"
  },
  jobCompetencyDepartment: {
    path: "/job-competency-department",
    name: "job-competency-department"
  },
  jobCompetencyUniversity: {
    path: "/job-competency-university",
    name: "job-competency-university"
  },
  studentPerformanceAssessmentDetail: {
    path: "/student-performance-assessment-detail",
    name: "student-performance-assessment-detail"
  },
  curriculumManagement: {
    path: "/curriculum-management",
    name: "curriculumManagement"
  },
  eduCourseRp: {
    path: "/edu-course-report",
    name: "edu-course-report"
  },
  eduCourseCqiApprove: {
    path: "/edu-course-cqi-approve",
    name: "eduCourseCqiApprove"
  },
  eduCourseCqiApproveMng: {
    path: "/edu-course-cqi-approve/detail",
    name: "eduCourseCqiApproveMng"
  },
  levelAchivmentStudent: {
    path: "/level-achivment-student",
    name: "levelAchivmentStudent"
  },
  lookupEvaluationPlan: {
    path: "/lookup-evaluation-plan",
    name: "lookupEvaluationPlan"
  },
  finalArchivement: {
    path: '/final-archivement',
    name: 'finalArchivement',
  },
  finalArchivementAction: {
    path: '/final-archivement-action',
    name: 'finalArchivementAction',
  },

}
