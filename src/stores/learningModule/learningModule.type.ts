export type LearningModuleRequest = {
  [key: string]: string | null;
}

export type LearningModuleResponse = {
  [key: string]: string;
}

export type LearningList = {
  "jobCapaStndSeq": string;
  "jobCapaStndNm": string;
  "upJobCapaStndSeq": string;
  "ordNo": number;
  "useYn": string;
  "level": string;
  "child": null | LearningList[];
}

export type ModuleList = {
  "jobAbilSeq": string;
  "learnModuleNm": string;
  "jobAbilNm": string;
}

export type ClassificationSystem = {
  id: string | number;
  module: string | number;
  child: LearningList[];
};