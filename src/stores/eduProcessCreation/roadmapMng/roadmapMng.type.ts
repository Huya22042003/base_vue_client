import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import type { EduCourseSelResDTO } from "./../eduCourse/eduProcess.type";

export type LinkRoadMapResDTO = {
  sbjtCd: string;
  sbjtNm: string;
  gradeCd: string;
  gradeNm: string;
  termCd: string;
  termNm: string;
  capaUnitNm: string;
  capaUnitSeq: string;
  typeCd: string;
  jobAbilSeq: string;
  jobAbilNm: string;
};

export type RoadMapFilterDTO = {
  eduCourseSeq: string;
};

export type LinkRoadMapView = {
  yearSemester: string;
  listAbil: [
    {
      jobAbilSeq: string;
      jobAbilNm: string;
      capaUnit: [
        {
          capaUnitSeq: string;
          capaUnitNm: string;
          typeCd: boolean;
          sbjtNm: string;
        },
      ];
    },
  ];
};

export type SyntheticRoadmapResDTO = {
  deptNm: string;
  targetDept: EduCourseSelResDTO[];
  targetNm: string;
  typeDept: EduCourseSelResDTO[];
  typeDeptNm: string;
  typeTalentJob: TypeTalentJobResDTO[];
  coreCompetency: CoreCompetencyResDTO[];
  relatedCertificate: RelatedCertificateResDTO[];
  graduationRoadmap: GraduationRoadmapResDTO[];
  listCoreAbility: Array<RoadMapAbilityListModel>;
  listJobAbility: Array<RoadMapAbilityListModel>;
  listTaltNrtgSelc: Array<RoadmapTaltNrtgSelcModel>;
};

export type TypeTalentJobResDTO = {
  typeTalent: string;
  jobCont: string;
  vision: string;
};

export type CoreCompetencyResDTO = {
  typeTalent: string;
  jobAbil: string;
  jobCapa: string;
};

export type RelatedCertificateResDTO = {
  jobNm: string;
  cert: string;
};

export type GraduationRoadmapResDTO = {
  typeNm: string;
  career: string;
};

export type OverviewRoadMapDTO = {
  listCurriculum: CodeMngModel[];
  listOverview: OverviewSubjectDTO[];
};

export type OverviewSubjectDTO = {
  sbjtCd: string;
  sbjtNm: string;
  termCd: string;
  termNm: string;
  gradeCd: string;
  gradeNm: string;
  prflSeq: string;
  select: EduCourseSelResDTO[];
};

export type OverviewRoadMapFilterDTO = {
  eduCourseSeq: string;
};

export type RoadMapAbilityListModel = {
  abilitySeq: string;
  abilityNm: string;
  listChild: Array<RoadMapAbilityListModel>;
};

export type RoadmapTaltNrtgSelcModel = {
  taltNrtgTypeSeq: string;
  taltNrtgTypeNm: string;
  jobCont: string;
  vision: string;
};

export type RoadMapEduProcessFilter = {
  eduCourseSeq: string;
}

export type RoadMapEduProcessDTO = {
  eduCourseNm: string,
  taltNrtgType: RoadMapTaltNrtgDTO[]
}

export type RoadMapTaltNrtgDTO = {
  taltNrtgTypeSeq: string;
  name: string;
  job:RoadMapJobDTO[];
}

export type RoadMapJobDTO = {
  jobSeq: string;
  name: string;
  subject:RoadMapSubjectDTO[];
}

export type RoadMapSubjectDTO = {
  subjectCd: string;
  subjectNm: string;
  trackType: string;
  termCd: string;
  gradeCd: string;
}