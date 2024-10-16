import { SCREEN } from './screen';
import authMiddleware from '@/middleware/auth';
import logMiddleware from '@/middleware/log'

const getView = (path: any) => {
  return () => import(`@/views/${path}.vue`);
};

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: "계원예술대학교",
      middleware: [authMiddleware],
    },
    children: [
      {
        path: '',
        name: SCREEN.home.name,
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: SCREEN.pathMenu.path,
        name: SCREEN.pathMenu.name,
        component: () => import('../views/menu/List.vue')
      },
      {
        path: SCREEN.crudPathMenu.path,
        name: SCREEN.crudPathMenu.name,
        component: () => import('../views/menu/Crud.vue')
      },
      {
        path: SCREEN.resourceManagement.path,
        name: SCREEN.resourceManagement.name,
        component: () => import('../views/resourceManagement/List.vue')
      },
      {
        path: SCREEN.roleResourceManagement.path,
        name: SCREEN.roleResourceManagement.name,
        component: () => import('../views/roleResourceManagement/List.vue')
      },
      {
        path: SCREEN.notification.path,
        name: SCREEN.notification.name,
        children: [
          {
            path: '',
            name: "",
            component: () => import('@/views/schoolStaff/notification/index.vue'),
          },
          {
            path: SCREEN.detailNotification.path,
            name: SCREEN.detailNotification.name,
            component: () => import('@/views/schoolStaff/notification/DetailNoti.vue'),
          },
          {
            path: SCREEN.questAndAns.path,
            name: SCREEN.questAndAns.name,
            component: () => import('../views/qna/QuestionList.vue')
          },
          {
            path: SCREEN.crudAns.path,
            name: SCREEN.crudAns.name,
            component: () => import('../views/qna/CreateAns.vue')
          },
        ]
      },
      {
        path: SCREEN.teachPlan.path,
        name: SCREEN.teachPlan.name,
        children: [
          {
            path: '',
            name: "",
            component: () => import('@/views/schoolStaff/teachPlan/index.vue'),
          },
          {
            path: SCREEN.detailSubject.path,
            name: SCREEN.detailSubject.name,
            component: () => import('@/views/schoolStaff/teachPlan/CrudTeachPlan.vue'),
            // component: () => import('@/views/schoolStaff/teachPlan/DetailSubject.vue'),
          }
        ]
      },
      {
        path: SCREEN.socialActivities.path,
        name: SCREEN.socialActivities.name,
        children: [
          {
            path: '',
            name: '',
            component: () => import('@/views/schoolStaff/socialActivities/index.vue'),
          },
          {
            path: SCREEN.detailSocialActivities.path,
            name: SCREEN.detailSocialActivities.name,
            component: () => import('@/views/schoolStaff/socialActivities/DetailSocialActivities.vue'),
          },

        ]
      },
      {
        path: SCREEN.cqi.path,
        name: SCREEN.cqi.name,
        children: [
          {
            path: "",
            name: "",
            component: () => import('@/views/schoolStaff/cqi/index.vue'),
          },
          {
            path: SCREEN.detailCqi.path,
            name: SCREEN.detailCqi.name,
            // component: () => import('@/views/schoolStaff/cqi/DetailCQI.vue'),
            component: () => import('@/views/schoolStaff/cqi/CrudCqi.vue'),
          }
        ]
      },
      {
        path: SCREEN.studentsReceiveLectures.path,
        name: SCREEN.studentsReceiveLectures.name,
        children: [
          {
            path: "",
            name: "",
            component: () => import('@/views/schoolStaff/studentsReceiveLectures/index.vue'),
          },
          {
            path: SCREEN.detailStudentsReceiveLectures.path,
            name: SCREEN.detailStudentsReceiveLectures.name,
            component: () => import('@/views/schoolStaff/studentsReceiveLectures/DetailSubject.vue'),
          }
        ]
      },
      {
        path: SCREEN.subjectProfile.path,
        name: SCREEN.subjectProfile.name,
        component: () => import('@/views/schoolStaff/subjectProfile/index.vue')
      },
      {
        path: SCREEN.empAbility.path,
        name: SCREEN.empAbility.name,
        component: () => import('@/views/empAbility/regEmpAbi/EmpAbility.vue'),
      },
      {
        path: SCREEN.createEmpAbility.path,
        name: SCREEN.createEmpAbility.name,
        component: () => import('@/views/empAbility/regEmpAbi/CrudEmpAbility.vue'),
      },
      {
        path: SCREEN.subEmpAbility.path,
        name: SCREEN.subEmpAbility.name,
        component: () => import('@/views/empAbility/subEmpAbi/SubEmpAction.vue'),
      },
      {
        path: SCREEN.subEmpAbList.path,
        name: SCREEN.subEmpAbList.name,
        component: () => import('@/views/empAbility/subEmpAbi/SubEmpAbilityList.vue'),
      },
      {
        path: SCREEN.subElemAbList.path,
        name: SCREEN.subElemAbList.name,
        component: () => import('@/views/empAbility/subElemAbi/SubElemList.vue'),
      },
      {
        path: SCREEN.subElemAb.path,
        name: SCREEN.subElemAb.name,
        component: () => import('@/views/empAbility/subElemAbi/CrudSubElem.vue'),
      },
      {
        path: SCREEN.talentEduGoalsMngDept.path,
        name: SCREEN.talentEduGoalsMngDept.name,
        component: () => import('@/views/departmentMng/talentEduGoalsMng/TalentEduGoals.vue')
      },
      {
        path: SCREEN.talentEduGoalsDeptAction.path,
        name: SCREEN.talentEduGoalsDeptAction.name,
        component: () => import('@/views/departmentMng/talentEduGoalsMng/TalentEduGoalsAction.vue')
      },
      {
        path: SCREEN.typeTalentNurturingMngDept.path,
        name: SCREEN.typeTalentNurturingMngDept.name,
        component: () => import('@/views/departmentMng/typeTalentNurturingMng/TypeTalentNurturing.vue')
      },
      {
        path: SCREEN.typeTalentNurturingCrudDept.path,
        name: SCREEN.typeTalentNurturingCrudDept.name,
        component: () => import('@/views/departmentMng/typeTalentNurturingMng/formAdd/TypeTalentNurturingForm.vue')
      },
      {
        path: SCREEN.majorLowerGradeDept.path,
        name: SCREEN.majorLowerGradeDept.name,
        component: () => import('@/views/departmentMng/majorLowerGrade/MajorLowerGradeList.vue')
      },
      {
        path: SCREEN.majorLowerGradeFormDept.path,
        name: SCREEN.majorLowerGradeFormDept.name,
        component: () => import('@/views/departmentMng/majorLowerGrade/formAdd/MajorLowerGradeForm.vue')
      },
      {
        path: SCREEN.eduCourseType.path,
        name: SCREEN.eduCourseType.name,
        component: () => import('../views/eduCourseType/EduCourseTypeMngList.vue')
      },
      {
        path: SCREEN.profLearn.path,
        name: SCREEN.profLearn.name,
        component: () => import('../views/profLearn/ProfLearnMngList.vue')
      },
      {
        path: SCREEN.evaluationMethod.path,
        name: SCREEN.evaluationMethod.name,
        component: () => import('../views/evaluationMethod/EvaluationMethodList.vue')
      },
      {
        path: SCREEN.trackMng.path,
        name: SCREEN.trackMng.name,
        component: () => import('../views/trackMng/TrackList.vue')
      },
      {
        path: SCREEN.crudTrackMng.path,
        name: SCREEN.crudTrackMng.name,
        component: () => import('../views/trackMng/CrudTrack.vue')
      },
      {
        path: SCREEN.consititutiveMajorDept.path,
        name: SCREEN.consititutiveMajorDept.name,
        component: () => import('@/views/departmentMng/consititutiveMajor/ConsititutiveMajor.vue')
      },
      {
        path: SCREEN.consititutiveMajorFormDept.path,
        name: SCREEN.consititutiveMajorFormDept.name,
        component: () => import('@/views/departmentMng/consititutiveMajor/formAdd/ConsititutiveMajorForm.vue')
      },
      {
        path: SCREEN.bestTalent.path,
        name: SCREEN.bestTalent.name,
        component: () => import('../views/talentMng/BestTalentMng.vue')
      },
      {
        path: SCREEN.goodTalent.path,
        name: SCREEN.goodTalent.name,
        component: () => import('../views/talentMng/GoodTalent.vue')
      },
      {
        path: SCREEN.eliteTalentForType.path,
        name: SCREEN.eliteTalentForType.name,
        component: () => import('../views/talentMng/EliteTalentForType.vue')
      },
      {
        path: SCREEN.intellectualTalent.path,
        name: SCREEN.intellectualTalent.name,
        component: () => import('../views/talentMng/IntellectualTalent.vue')
      },
      {
        path: SCREEN.actionIndexKsa.path,
        name: SCREEN.actionIndexKsa.name,
        component: () => import('@/views/departmentMng/actionIndexKsa/ActionIndexKsa.vue')
      },
      {
        path: SCREEN.actionIndexKsaForm.path,
        name: SCREEN.actionIndexKsaForm.name,
        component: () => import('@/views/departmentMng/actionIndexKsa/formAdd/ActionIndexKsaForm.vue')
      },
      {
        path: SCREEN.meettingReportEdu.path,
        name: SCREEN.meettingReportEdu.name,
        component: () => import('@/views/departmentMng/meettingReportEdu/MeettingReportEdu.vue')
      },
      {
        path: SCREEN.meettingReportEduForm.path,
        name: SCREEN.meettingReportEduForm.name,
        component: () => import('@/views/departmentMng/meettingReportEdu/formAdd/MeettingReportEduForm.vue')
      },
      {
        path: SCREEN.subjectProfiles.path,
        name: SCREEN.subjectProfiles.name,
        component: () => import('@/views/trainingProcess/subjectProfiles/SubjectProfiles.vue')
      },
      {
        path: SCREEN.teachingPlans.path,
        name: SCREEN.teachingPlans.name,
        component: () => import('@/views/trainingProcess/teachingPlans/TeachingPlans.vue')
      },
      {
        path: SCREEN.lookUpCQI.path,
        name: SCREEN.lookUpCQI.name,
        component: () => import('@/views/trainingProcess/lookUpCQI/LookUpCQI.vue')
      },
      {
        path: SCREEN.talentTrainingReport.path,
        name: SCREEN.talentTrainingReport.name,
        component: () => import('@/views/trainingProcess/talentTrainingReport/TalentTrainingReport.vue')
      },
      {
        path: SCREEN.historyLogin.path,
        name: SCREEN.historyLogin.name,
        component: () => import('@/views/historyLogin/HistoryLogin.vue')
      },
      {
        path: SCREEN.historyMenuAccess.path,
        name: SCREEN.historyMenuAccess.name,
        component: () => import('@/views/historyMenuAccess/historyMenuAccess.vue')
      },
      {
        path: SCREEN.docRoom.path,
        name: SCREEN.docRoom.name,
        component: () => import('@/views/docRoom/DocRoom.vue')
      },
      {
        path: SCREEN.crudDocRoom.path,
        name: SCREEN.crudDocRoom.name,
        component: () => import('@/views/docRoom/CrudDocRoom.vue')
      },
      {
        path: SCREEN.moveMenu.path,
        name: SCREEN.moveMenu.name,
        component: getView('Menu'),
      },
      {
        path: SCREEN.profChldAbility.path,
        name: SCREEN.profChldAbility.name,
        component: () => import('@/views/profAbility/profChldAbility/ChldProfAbiAction.vue')
      },
      {
        path: SCREEN.profChldList.path,
        name: SCREEN.profChldList.name,
        component: () => import('@/views/profAbility/profChldAbility/ChldAbilityList.vue')
      },
      {
        path: SCREEN.profAbi.path,
        name: SCREEN.profAbi.name,
        component: () => import('@/views/profAbility/profAbilityMng/CrudProfAbility.vue')
      },
      {
        path: SCREEN.profAbiList.path,
        name: SCREEN.profAbiList.name,
        component: () => import('@/views/profAbility/profAbilityMng/ProfAbility.vue')
      },
      {
        path: SCREEN.subElemList.path,
        name: SCREEN.subElemList.name,
        component: () => import('@/views/profAbility/subElemMng/SubElemList.vue')
      },
      {
        path: SCREEN.subElem.path,
        name: SCREEN.subElem.name,
        component: () => import('@/views/profAbility/subElemMng/CrudSubElem.vue')
      },
      {
        path: SCREEN.portfolio.path,
        name: SCREEN.portfolio.name,
        component: () => import('../views/capacityDeMng/portfolio/Portfolio.vue'),
      },
      {
        path: SCREEN.trackingProcess.path,
        name: SCREEN.trackingProcess.name,
        component: () => import('../views/capacityDeMng/trackingProcess/TrackingProcess.vue'),
      },
      {
        path: SCREEN.trackingProcessDetail.path,
        name: SCREEN.trackingProcessDetail.name,
        component: () => import('../views/capacityDeMng/trackingProcess/TrackingProcessDetail.vue'),
      },
      {
        path: SCREEN.tutoring.path,
        name: SCREEN.tutoring.name,
        component: () => import('../views/capacityDeMng/tutoring/Tutoring.vue'),
      },
      {
        path: SCREEN.tutoringDetail.path,
        name: SCREEN.tutoringDetail.name,
        component: () => import('../views/capacityDeMng/tutoring/TutoringDetail.vue'),
      },
      {
        path: SCREEN.educationSDL.path,
        name: SCREEN.educationSDL.name,
        component: () => import('../views/capacityDeMng/educationSDL/EducationSDL.vue'),
      },
      {
        path: SCREEN.educationSDLDetail.path,
        name: SCREEN.educationSDLDetail.name,
        component: () => import('../views/capacityDeMng/educationSDL/EducationSDLDetail.vue'),
      },
      {
        path: SCREEN.volunteerActivites.path,
        name: SCREEN.volunteerActivites.name,
        component: () => import('../views/capacityDeMng/volunteerActivities/VolunteerActivitiesList.vue'),
      },
      {
        path: SCREEN.volunteerActivitesForm.path,
        name: SCREEN.volunteerActivitesForm.name,
        component: () => import('../views/capacityDeMng/volunteerActivities/formAdd/VolunteerActivitiesForm.vue'),
      },
      {
        path: SCREEN.volunteerActivitesUserRegist.path,
        name: SCREEN.volunteerActivitesUserRegist.name,
        component: () => import('../views/capacityDeMng/volunteerActivities/selectUserRegist/UserRegistList.vue'),
      },
      {
        path: SCREEN.researchVolunteerActivites.path,
        name: SCREEN.researchVolunteerActivites.name,
        component: () => import('../views/capacityDeMng/researchVolunteerActivies/ResearchVolunteerActivies.vue'),
      },
      {
        path: SCREEN.volunteerIndividual.path,
        name: SCREEN.volunteerIndividual.name,
        component: () => import('../views/capacityDeMng/volunteerIndividual/VolunteerIndividual.vue'),
      },
      {
        path: SCREEN.learnAbility.path,
        name: SCREEN.learnAbility.name,
        component: () => import('@/views/learnAbility/learnAbilityCrud/LearnAbilityCrud.vue')
      },
      {
        path: SCREEN.learnComponent.path,
        name: SCREEN.learnComponent.name,
        component: () => import('@/views/learnAbility/learnAbilityElem/LearnComponent.vue')
      },
      {
        path: SCREEN.learnComponentCrud.path,
        name: SCREEN.learnComponentCrud.name,
        component: () => import('@/views/learnAbility/learnAbilityElem/LearnComponentCrud.vue')
      },
      /* Management role  start*/
      {
        path: SCREEN.roleCreate.path,
        name: SCREEN.roleCreate.name,
        component: () => import('../views/role/CreateRole.vue')
      },
      {
        path: SCREEN.roleList.path,
        name: SCREEN.roleList.name,
        component: () => import('../views/role/ListRole.vue')
      },
      {
        path: SCREEN.roleEdit.path,
        name: SCREEN.roleEdit.name,
        component: () => import('../views/role/EditRole.vue')
      },
      {
        path: SCREEN.roleDetail.path,
        name: SCREEN.roleDetail.name,
        component: () => import('../views/role/DetailRole.vue')
      },
      /* Management role  end*/
      /* Management talent and goal school start*/
      {
        path: SCREEN.talentEduUni.path,
        name: SCREEN.talentEduUni.name,
        component: () => import('../views/modelTalentUni/talentAndGoals/ListTalentEduUni.vue')
      },
      /* Management talent and goal school end*/

      /* Management core and child ability start*/
      {
        path: SCREEN.mainAbility.path,
        name: SCREEN.mainAbility.name,
        component: () => import('../views/modelTalentUni/mainAbility/CrudMainAbility.vue')

      },
      /* Management core and child ability end*/

      /* Management general factor start*/
      {
        path: SCREEN.generalFactor.path,
        name: SCREEN.generalFactor.name,
        component: () => import('../views/modelTalentUni/mainAbilityFactor/GeneralFactor.vue')
      },
      {
        path: SCREEN.generalFactorCrud.path,
        name: SCREEN.generalFactorCrud.name,
        component: () => import('../views/modelTalentUni/mainAbilityFactor/CrudGeneralFactor.vue')
      },
      /* Management general factor end*/

      /* Management standard action start*/
      {
        path: SCREEN.standardAction.path,
        name: SCREEN.standardAction.name,
        component: () => import('../views/modelTalentUni/standardAction/StandardAction.vue')
      },
      {
        path: SCREEN.standardActionCrud.path,
        name: SCREEN.standardActionCrud.name,
        component: () => import('../views/modelTalentUni/standardAction/CrudStandardAction.vue')
      },
      {
        path: SCREEN.eduScheduleCreative.path,
        name: SCREEN.eduScheduleCreative.name,
        component: () => import('@/views/eduScheduleCreative/modeling/NewEducationSchedule.vue')
      },
      {
        path: SCREEN.coreCompetencyDiagnosticSheet.path,
        name: SCREEN.coreCompetencyDiagnosticSheet.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet/CoreComDiagSheetList.vue'
          ),
      },
      {
        path: SCREEN.coreCompetencyDiagnosticSheetCrud.path,
        name: SCREEN.coreCompetencyDiagnosticSheetCrud.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet/CoreComDiagSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.coreCompetencyDiagnosis.path,
        name: SCREEN.coreCompetencyDiagnosis.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosis/CoreComDiagList.vue'
          ),
      },
      {
        path: SCREEN.coreCompetencyDiagnosisCrud.path,
        name: SCREEN.coreCompetencyDiagnosisCrud.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosis/CoreComDiagCrud.vue'
          ),
      },
      {
        path: SCREEN.coreCompetencyDiagnosisResultList.path,
        name: SCREEN.coreCompetencyDiagnosisResultList.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/CoreComDiagResultsList.vue'
          ),
      },
      {
        path: SCREEN.coreCompetencyDiagnosisResult.path,
        name: SCREEN.coreCompetencyDiagnosisResult.name,
        component: () =>
          import(
            '../views/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/CoreComDiagResultsDetail.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosisSheet.path,
        name: SCREEN.coreMajorCompDiagnosisSheet.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/CoreMajDiagSheetList.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosisSheetCrud.path,
        name: SCREEN.coreMajorCompDiagnosisSheetCrud.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/CoreMajDiagSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosis.path,
        name: SCREEN.coreMajorCompDiagnosis.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosis/CoreMajorCompDiagnosisList.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosisCrud.path,
        name: SCREEN.coreMajorCompDiagnosisCrud.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosis/CoreMajorCompDiagnosisCrud.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosisResultList.path,
        name: SCREEN.coreMajorCompDiagnosisResultList.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/CoreMajorCompDiagnosisResultsList.vue'
          ),
      },
      {
        path: SCREEN.coreMajorCompDiagnosisResult.path,
        name: SCREEN.coreMajorCompDiagnosisResult.name,
        component: () =>
          import(
            '../views/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/CoreMajorCompDiagnosisResults.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbilitySheet.path,
        name: SCREEN.diagnosisLearningAbilitySheet.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosisSheet/DiagnosisSheet.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbilitySheetCrud.path,
        name: SCREEN.diagnosisLearningAbilitySheetCrud.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosisSheet/DisgnosisSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbility.path,
        name: SCREEN.diagnosisLearningAbility.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosis/Diagnosis.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbilityCrud.path,
        name: SCREEN.diagnosisLearningAbilityCrud.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosis/DiagnosisCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbilityResults.path,
        name: SCREEN.diagnosisLearningAbilityResults.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosisResults/DiagnosisResults.vue'
          ),
      },
      {
        path: SCREEN.diagnosisLearningAbilityResultsCrud.path,
        name: SCREEN.diagnosisLearningAbilityResultsCrud.name,
        component: () =>
          import(
            '../views/diagnosisLearningAbility/diagnosisResults/DiagnosisResultsCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturerSheet.path,
        name: SCREEN.diagnosingLecturerSheet.name,
        component: () =>
          import(
            '../views/diagnosingLecturer/diagnosisLecturerSheet/DiagnosingLecturerSheet.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturerSheetCrud.path,
        name: SCREEN.diagnosingLecturerSheetCrud.name,
        component: () =>
          import(
            '../views/diagnosingLecturer/diagnosisLecturerSheet/DiagnosingLecturerSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturer.path,
        name: SCREEN.diagnosingLecturer.name,
        component: () =>
          import(
            '../views/diagnosingLecturer/diagnosisLecturer/DiagnosingLecturer.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturerCrud.path,
        name: SCREEN.diagnosingLecturerCrud.name,
        component: () =>
          import(
            '../views/diagnosingLecturer/diagnosisLecturer/DiagnosingLecturerCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturerResults.path,
        name: SCREEN.diagnosingLecturerResults.name,
        component: () =>
          import(
            '../views/diagnosingLecturer/diagnosisLecturerResults/DiagnosingLecturerResults.vue'
          ),
      },
      {
        path: SCREEN.diagnosingLecturerResultsCrud.path,
        name: SCREEN.diagnosingLecturerResultsCrud.name,
        component: () =>
          import(
            "../views/diagnosingLecturer/diagnosisLecturerResults/DiagnosingLecturerResultsCrud.vue"
          ),
      },
      {
        path: SCREEN.diagnosingLecturerResultsProfCrud.path,
        name: SCREEN.diagnosingLecturerResultsProfCrud.name,
        component: () =>
          import(
            "../views/diagnosingLecturer/diagnosisLecturerResults/DiagnosingLecturerProfDetail.vue"
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosisSheet.path,
        name: SCREEN.basicAcademicDiagnosisSheet.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/BasicAcademicDiagSheetList.vue'
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosisSheetCrud.path,
        name: SCREEN.basicAcademicDiagnosisSheetCrud.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/BasicAcademicDiagSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosis.path,
        name: SCREEN.basicAcademicDiagnosis.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosis/BasicAcademicDiagList.vue'
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosisCrud.path,
        name: SCREEN.basicAcademicDiagnosisCrud.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosis/BasicAcademicDiagCrud.vue'
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosisResult.path,
        name: SCREEN.basicAcademicDiagnosisResult.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosisResult/BasicAcademicDiagResultList.vue'
          ),
      },
      {
        path: SCREEN.basicAcademicDiagnosisResultCrud.path,
        name: SCREEN.basicAcademicDiagnosisResultCrud.name,
        component: () =>
          import(
            '../views/basicAcademicDiagnosis/basicAcademicDiagnosisResult/BasicAcademicDiagResultCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeSheet.path,
        name: SCREEN.diagnosingEmployeeSheet.name,
        component: () =>
          import(
            '../views/diagnosingEmployee/diagnosisEmployeeSheet/DiagnosingEmployeeSheet.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeSheetCrud.path,
        name: SCREEN.diagnosingEmployeeSheetCrud.name,
        component: () =>
          import(
            '../views/diagnosingEmployee/diagnosisEmployeeSheet/DiagnosingEmployeeSheetCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployee.path,
        name: SCREEN.diagnosingEmployee.name,
        component: () =>
          import(
            '../views/diagnosingEmployee/diagnosisEmployee/DiagnosingEmployee.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeCrud.path,
        name: SCREEN.diagnosingEmployeeCrud.name,
        component: () =>
          import(
            '../views/diagnosingEmployee/diagnosisEmployee/DiagnosingEmployeeCrud.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeResults.path,
        name: SCREEN.diagnosingEmployeeResults.name,
        component: () =>
          import(
            '../views/diagnosingEmployee/diagnosisEmployeeResults/DiagnosingEmployeeResults.vue'
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeResultsCrud.path,
        name: SCREEN.diagnosingEmployeeResultsCrud.name,
        component: () =>
          import(
            "../views/diagnosingEmployee/diagnosisEmployeeResults/DiagnosingEmployeeResultsCrud.vue"
          ),
      },
      {
        path: SCREEN.diagnosingEmployeeResultsEmpCrud.path,
        name: SCREEN.diagnosingEmployeeResultsEmpCrud.name,
        component: () =>
          import(
            "../views/diagnosingEmployee/diagnosisEmployeeResults/DiagnosingLecturerEmpDetail.vue"
          ),
      },
      {
        path: SCREEN.searchLevelCapacity.path,
        name: SCREEN.searchLevelCapacity.name,
        component: () =>
          import(
            '../views/searchLevelCoreCapacity/SearchLevelCoreCapacity.vue'
          ),
      },
      {
        path: SCREEN.searchLevelCapacityDetail.path,
        name: SCREEN.searchLevelCapacityDetail.name,
        component: () =>
          import(
            '../views/searchLevelCoreCapacity/SearchLevelCoreCapacityDetail.vue'
          ),
      },
      {
        path: SCREEN.searchLevelCapacityDetailResults.path,
        name: SCREEN.searchLevelCapacityDetailResults.name,
        component: () =>
          import(
            '../views/searchLevelCoreCapacity/SearchLevelCoreCapacityResults.vue'
          ),
      },
      {
        path: SCREEN.searchLevelSpecialized.path,
        name: SCREEN.searchLevelSpecialized.name,
        component: () =>
          import(
            '../views/searchLevelSpecialized/SearchLevelSpecialized.vue'
          ),
      },
      {
        path: SCREEN.searchLevelSpecializedDetail.path,
        name: SCREEN.searchLevelSpecializedDetail.name,
        component: () =>
          import(
            '../views/searchLevelSpecialized/SearchLevelSpecializedDetail.vue'
          ),
      },
      {
        path: SCREEN.searchLevelSpecializedResults.path,
        name: SCREEN.searchLevelSpecializedResults.name,
        component: () =>
          import(
            '../views/searchLevelSpecialized/SearchLevelCoreSpecializedResults.vue'
          ),
      },
      {
        path: SCREEN.searchLevelAbilityStudy.path,
        name: SCREEN.searchLevelAbilityStudy.name,
        component: () =>
          import(
            '../views/searchLevelAbilityStudy/SearchLevelAbilityStudy.vue'
          ),
      },
      {
        path: SCREEN.searchLevelAbilityStudyDetail.path,
        name: SCREEN.searchLevelAbilityStudyDetail.name,
        component: () =>
          import(
            '../views/searchLevelAbilityStudy/SearchLevelAbilityStudyDetail.vue'
          ),
      },
      {
        path: SCREEN.searchLevelAbilityStudyResults.path,
        name: SCREEN.searchLevelAbilityStudyResults.name,
        component: () =>
          import(
            '../views/searchLevelAbilityStudy/SearchLevelAbilityStudyResults.vue'
          ),
      },
      {
        path: SCREEN.searchLevelAcademicSpe.path,
        name: SCREEN.searchLevelAcademicSpe.name,
        component: () =>
          import(
            '../views/searchLevelAcademicSpe/SearchLevelAcademicSpe.vue'
          ),
      },
      {
        path: SCREEN.searchLevelAcademicSpeDetail.path,
        name: SCREEN.searchLevelAcademicSpeDetail.name,
        component: () =>
          import(
            '../views/searchLevelAcademicSpe/SearchLevelAcademicSpeDetail.vue'
          ),
      },
      {
        path: SCREEN.searchLevelOutlineSpe.path,
        name: SCREEN.searchLevelOutlineSpe.name,
        component: () =>
          import(
            '../views/searchLevelOutlineSpe/SearchLevelOutlineSpe.vue'
          ),
      },
      {
        path: SCREEN.searchLevelOutlineSpeDetail.path,
        name: SCREEN.searchLevelOutlineSpeDetail.name,
        component: () =>
          import(
            '../views/searchLevelOutlineSpe/SearchLevelOutlineDetail.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfiedList.path,
        name: SCREEN.surveySatisfiedList.name,
        component: () =>
          import(
            '../views/surveySatisfied/SurveySatisfiedList.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfiedFom.path,
        name: SCREEN.surveySatisfiedFom.name,
        component: () =>
          import(
            '../views/surveySatisfied/formAdd/SurveySatisfiedForm.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfiedResult.path,
        name: SCREEN.surveySatisfiedResult.name,
        component: () =>
          import(
            '../views/surveySatisfied/SurveyStatisFieldResult.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfactionOffCampus.path,
        name: SCREEN.surveySatisfactionOffCampus.name,
        component: () =>
          import(
            '../views/surveySatisfactionOffCampus/SurveyOffCampusList.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfactionOffCampusCrud.path,
        name: SCREEN.surveySatisfactionOffCampusCrud.name,
        component: () =>
          import(
            '../views/surveySatisfactionOffCampus/SurveyOffCampusCrud.vue'
          ),
      },
      {
        path: SCREEN.surveySatisfactionOffCampusResult.path,
        name: SCREEN.surveySatisfactionOffCampusResult.name,
        component: () =>
          import(
            '../views/surveySatisfactionOffCampus/SurveyOffCampusResult.vue'
          ),
      },
      {
        path: SCREEN.manageApprovedSubjects.path,
        name: SCREEN.manageApprovedSubjects.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/ManageApprovedSubjects.vue'),
      },
      {
        path: SCREEN.capstoneDesign.path,
        name: SCREEN.capstoneDesign.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/CapstoneDesign.vue'),
      },
      {
        path: SCREEN.hyflexAL.path,
        name: SCREEN.hyflexAL.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/HyflexAL.vue'),
      },
      {
        path: SCREEN.approveSubjectStaff.path,
        name: SCREEN.approveSubjectStaff.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/SubjectApproveStaff.vue'),
      },
      {
        path: SCREEN.capstoneDesignStaff.path,
        name: SCREEN.capstoneDesignStaff.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/CapstoneRegisterStaff.vue'),
      },
      {
        path: SCREEN.hyflexALStaff.path,
        name: SCREEN.hyflexALStaff.name,
        component: () => import('@/views/certificationReport/manageApprovedSubjects/RegisterHyflexAlStaff.vue'),
      },
      {
        path: SCREEN.diagEmployeeAbilityStaff.path,
        name: SCREEN.diagEmployeeAbilityStaff.name,
        component: () =>
          import('../views/diagEmployeeAbilityStaff/DiagEmployeeAbilityList.vue'),
      },
      {
        path: SCREEN.detailDiagEmployeeAbilityStaff.path,
        name: SCREEN.detailDiagEmployeeAbilityStaff.name,
        component: () =>
          import('../views/diagEmployeeAbilityStaff/DiagEmployeeAbilityDetail.vue'),
      },
      {
        path: SCREEN.resultDiagEmployeeAbilityStaff.path,
        name: SCREEN.resultDiagEmployeeAbilityStaff.name,
        component: () =>
          import('../views/diagEmployeeAbilityStaff/DiagEmployeeAbilityResult.vue'),
      },
      {
        path: SCREEN.diagProfessorAbilityStaff.path,
        name: SCREEN.diagProfessorAbilityStaff.name,
        component: () =>
          import('../views/diagProfessorAbilityStaff/DiagProfessorAbilityList.vue'),
      },
      {
        path: SCREEN.detailDiagProfessorAbilityStaff.path,
        name: SCREEN.detailDiagProfessorAbilityStaff.name,
        component: () =>
          import('../views/diagProfessorAbilityStaff/DiagProfessorAbilityDetail.vue'),
      },
      {
        path: SCREEN.resultDiagProfessorAbilityStaff.path,
        name: SCREEN.resultDiagProfessorAbilityStaff.name,
        component: () =>
          import('../views/diagProfessorAbilityStaff/DiagProfessorAbilityResult.vue'),
      },
      {
        path: SCREEN.notificationCategory.path,
        name: SCREEN.notificationCategory.name,
        component: () =>
          import(
            '../views/notificationCategory/NotificationCategory.vue'
          ),
      },
      {
        path: SCREEN.crudNotificationCategory.path,
        name: SCREEN.crudNotificationCategory.name,
        component: () =>
          import(
            '../views/notificationCategory/CrudNotificationCategory.vue'
          ),
      },
      {
        path: SCREEN.notificationMessage.path,
        name: SCREEN.notificationMessage.name,
        component: () => import('@/views/notificationMessage/NotificationMessage.vue')
      },
      {
        path: SCREEN.crudNotificationMessage.path,
        name: SCREEN.crudNotificationMessage.name,
        component: () => import('@/views/notificationMessage/CrudNotificationMessage.vue')
      },
      // {
      //   path: SCREEN.schTeachPlan.path,
      //   name: SCREEN.schTeachPlan.name,
      //   component: () => import('@/views/eduScheduleCreative/EduScheduleCreativeMng.vue')
      // },
      // {
      //   path: SCREEN.schCqi.path,
      //   name: SCREEN.schCqi.name,
      //   component: () => import('@/views/eduScheduleCreative/EduScheduleCreativeMng.vue')
      // },
      {
        path: SCREEN.eduProcessCreation.path,
        name: SCREEN.eduProcessCreation.name,
        component: () => import('../views/eduProcessCreation/EduProcessCreationList.vue')
      },
      {
        path: SCREEN.eduProcessCreationMng.path,
        name: SCREEN.eduProcessCreationMng.name,
        component: () => import('../views/eduProcessCreation/EduProcessCreationMng.vue')
      },
      {
        path: SCREEN.eduProcessApprovement.path,
        name: SCREEN.eduProcessApprovement.name,
        component: () => import('../views/eduProcessCreation/EduProcessApprovement.vue')
      },
      {
          path: SCREEN.eduSubjectProfileDetail.path,
          name: SCREEN.eduSubjectProfileDetail.name,
          component: () => import('@/views/eduProcessCreation/subjectProfile/SubjectProfileEdit.vue')
      },
      {
        path: SCREEN.manageAssessmentReports.path,
        name: SCREEN.manageAssessmentReports.name,
        component: () => import('@/views/certificationReport/manageAssessmentReports/ManageAssessmentReports.vue'),
      },
      {
        path: SCREEN.manageAssessmentDetailReport.path,
        name: SCREEN.manageAssessmentDetailReport.name,
        component: () => import('@/views/certificationReport/manageAssessmentReports/DetailReport.vue'),
      },
      {
        path: SCREEN.registerCheckEduProcess.path,
        name: SCREEN.registerCheckEduProcess.name,
        component: () => import(`@/views/certificationReport/manageAssessmentReports/ManageAssessmentAppr.vue`),
      },
      {
        path: SCREEN.evalCourseReport.path,
        name: SCREEN.evalCourseReport.name,
        component: () => import(`@/views/certificationReport/registerCheckEduProcess/EvalCourseReport.vue`),
      },
      {
        path: SCREEN.evalCourseReportApprove.path,
        name: SCREEN.evalCourseReportApprove.name,
        component: () => import(`@/views/certificationReport/registerCheckEduProcess/EvalCourseReportApprove.vue`),
      },
      {
        path: SCREEN.evalCourseReportApproveDetail.path,
        name: SCREEN.evalCourseReportApproveDetail.name,
        component: () => import(`@/views/certificationReport/registerCheckEduProcess/EvalCourseReportApproveDetail.vue`),
      },
      {
        path: SCREEN.evalCourseReportDetail.path,
        name: SCREEN.evalCourseReportDetail.name,
        component: () => import(`@/views/certificationReport/registerCheckEduProcess/EvalCourseReportDetail.vue`),
      },
      {
        path: SCREEN.userManagement.path,
        name: SCREEN.userManagement.name,
        component: () => import(`@/views/userManagement/UserManagementList.vue`),
      },
      {
        path: SCREEN.userManagementCrud.path,
        name: SCREEN.userManagementCrud.name,
        component: () => import(`@/views/userManagement/UserManagementCrud.vue`),
      },
      {
        path: SCREEN.qnaStaff.path,
        name: SCREEN.qnaStaff.name,
        component: () => import(`@/views/schoolStaff/qna/ListQnaStaff.vue`),
      },
      {
        path: SCREEN.qnaStaffDetail.path,
        name: SCREEN.qnaStaffDetail.name,
        component: () => import(`@/views/schoolStaff/qna/DetailQnaStaff.vue`),
      },
      {
        path: SCREEN.infoUniversity.path,
        name: SCREEN.infoUniversity.name,
        component: () => import(`@/views/infoUniversity/ListInfoUni.vue`),
      },
      {
        path: SCREEN.infoUniversityAction.path,
        name: SCREEN.infoUniversityAction.name,
        component: () => import(`@/views/infoUniversity/CrudInfoUni.vue`),
      },
      {
        path: SCREEN.jobManagement.path,
        name: SCREEN.jobManagement.name,
        component: () => import(`@/views/jobManagement/JobManagement.vue`),
      },
      {
        path: SCREEN.learningModule.path,
        name: SCREEN.learningModule.name,
        component: () => import(`@/views/informationManagement/LearningModule.vue`),
      },
      {
        path: SCREEN.CQITrainingProcess.path,
        name: SCREEN.CQITrainingProcess.name,
        children: [
          {
            path: '',
            name: '',
            component: () => import(`@/views/CQItrainingProcess/TrainingProcess.vue`),
          },
          {
            path: SCREEN.createTrainingProcess.path,
            name: SCREEN.createTrainingProcess.name,
            component: () => import(`@/views/CQItrainingProcess/CreateTrainingProcess.vue`),
          }
        ]
      },
      {
        path: SCREEN.coreAbilityJob.path,
        name: SCREEN.coreAbilityJob.name,
        component: () => import(`@/views/coreAbilityJob/CoreAbilityJobList.vue`),
      },
      {
        path: SCREEN.coreAbilityJobDetail.path,
        name: SCREEN.coreAbilityJobDetail.name,
        component: () => import(`@/views/coreAbilityJob/CoreAbilityJobDetail.vue`),
      },
      {
        path: SCREEN.eduProcessMeetingMinutes.path,
        name: SCREEN.eduProcessMeetingMinutes.name,
        component: () => import(`@/views/eduProcessMeetingMinutes/EduProcessMeetingMinutesMng.vue`),
      },
      {
        path: SCREEN.eduProcessMeetingMinutesCrud.path,
        name: SCREEN.eduProcessMeetingMinutesCrud.name,
        component: () => import(`@/views/eduProcessMeetingMinutes/EduProcessMeetingMinutesCrud.vue`),
      },
      {
        path: SCREEN.jobAbilityManagement.path,
        name: SCREEN.jobAbilityManagement.name,
        component: () => import(`@/views/jobAbilityManagement/List.vue`),
      },
      {
        path: SCREEN.jobAbilityManagementCrud.path,
        name: SCREEN.jobAbilityManagementCrud.name,
        component: () => import(`@/views/jobAbilityManagement/Crud.vue`),
      },
      {
        path: SCREEN.lookupReport.path,
        name: SCREEN.lookupReport.name,
        component: () => import(`@/views/lookupTrainingResult/LookupReport.vue`)
      },
      {
        path: SCREEN.lookupTechPlan.path,
        name: SCREEN.lookupTechPlan.name,
        component: () => import(`@/views/lookupTrainingResult/LookupTechPlan.vue`)
      },
      {
        path: SCREEN.lookupAssessmentPlan.path,
        name: SCREEN.lookupAssessmentPlan.name,
        component: () => import(`@/views/lookupTrainingResult/LookupAssessmentPlan.vue`)
      },
      {
        path: SCREEN.lookupSubjectCqi.path,
        name: SCREEN.lookupSubjectCqi.name,
        component: () => import(`@/views/lookupTrainingResult/LookupSubjectCqi.vue`)
      },
      {
        path: SCREEN.lookupAchievement.path,
        name: SCREEN.lookupAchievement.name,
        component: () => import(`@/views/lookupTrainingResult/LookupAchievement.vue`)
      },
      {
        path: SCREEN.lectureDesignSchedule.path,
        name: SCREEN.lectureDesignSchedule.name,
        component: () => import('@/views/eduScheduleCreative/modeling/LectureDesignSchedule.vue')

      },
      {
        path: SCREEN.finalGradeManagement.path,
        name: SCREEN.finalGradeManagement.name,
        component: () => import('@/views/finalGradeManagement/FinalGradeManagementList.vue')
      },
      {
        path: SCREEN.studentPerformanceAssessment.path,
        name: SCREEN.studentPerformanceAssessment.name,
        component: () => import('@/views/finalGradeManagement/StudentPerformanceAssessment.vue')
      },
      {
        path: SCREEN.jobCompetencyStudent.path,
        name: SCREEN.jobCompetencyStudent.name,
        component: () => import('@/views/qualityManagement/JobCompetencyStudent.vue')
      },
      {
        path: SCREEN.jobCompetency.path,
        name: SCREEN.jobCompetency.name,
        component: () => import('@/views/qualityManagement/JobCompetency.vue')
      },
      {
        path: SCREEN.jobCompetencyDepartment.path,
        name: SCREEN.jobCompetencyDepartment.name,
        component: () => import('@/views/qualityManagement/JobCompetencyDepartment.vue')
      },
      {
        path: SCREEN.jobCompetencyUniversity.path,
        name: SCREEN.jobCompetencyUniversity.name,
        component: () => import('@/views/qualityManagement/JobCompetencyUniversity.vue')
      },
      {
        path: SCREEN.studentPerformanceAssessmentDetail.path,
        name: SCREEN.studentPerformanceAssessmentDetail.name,
        component: () => import('@/views/finalGradeManagement/StudentPerformanceAssessmentDetail.vue')
      },
      {
        path: SCREEN.curriculumManagement.path,
        name: SCREEN.curriculumManagement.name,
        component: () => import(`@/views/curriculumManagement/CurriculumManagement.vue`),
      },
      {
        path: SCREEN.eduCourseRp.path,
        name: SCREEN.eduCourseRp.name,
        component: () => import('@/views/eduCourseReport/EduCourseReportList.vue')
      },
      {
        path: SCREEN.eduCourseCqiApprove.path,
        name: SCREEN.eduCourseCqiApprove.name,
        component: () => import('@/views/eduCourseCqi/eduCourseCqiApprove/EduCourseCqiApprove.vue')
      },
      {
        path: SCREEN.eduCourseCqiApproveMng.path,
        name: SCREEN.eduCourseCqiApproveMng.name,
        component: () => import('@/views/eduCourseCqi/eduCourseCqiApprove/EduCourseDetailIndex.vue')
      },
      {
        path: SCREEN.levelAchivmentStudent.path,
        name: SCREEN.levelAchivmentStudent.name,
        component: () => import('@/views/eduCourseCqi/levelAchStudent/LevelAchStudent.vue')
      },
      {
        path: SCREEN.lookupEvaluationPlan.path,
        name: SCREEN.lookupEvaluationPlan.name,
        component: () => import('@/views/lookupEvaluationPlan/index.vue')
      }
    ],
  },
  {
    path: '/template',
    name: 'template',
    meta: { title: 'TemplateUi Yeongsang' },
    component: getView('TemplateUiYeongsang'),
  },
  {
    path: SCREEN.login.path,
    name: SCREEN.login.name,
    meta: {
      middleware: [authMiddleware],
    },
    component: getView('LoginView'),
  },
  {
    path: SCREEN.internalError.path,
    name: SCREEN.internalError.name,
    component: getView('InternalError'),
  },
  {
    path: SCREEN.notFound.path,
    name: SCREEN.notFound.name,
    meta: { title: 'Not Found' },
    component: getView('NotFound'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: SCREEN.notFound.path,
    component: getView('NotFound'),
  },
  {
    /** 접근권한 없음 */
    path: SCREEN.unauthorized.path,
    name: SCREEN.unauthorized.name,
    component: () => import("@/views/UnauthorizedPage.vue"),
    meta: {
      title: "계원예술대학교",
      auth: false,
    },
  },
];
