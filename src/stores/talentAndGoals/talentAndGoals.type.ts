export type SchEduGoal = {
  eduYear: string|  number;
  visionDept: EduPart[];
  modelDept: EduPart[];
  targetDept: EduPart[];
  planDept: EduPart[];
};

export type EduPart = {
  id: string;
  value: string;
};

export type EduSearch = {
  page: number;
  size: number;
  sort: string;

};
