import type { EduCourseSelResDTO } from './../eduCourse/eduProcess.type';

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
