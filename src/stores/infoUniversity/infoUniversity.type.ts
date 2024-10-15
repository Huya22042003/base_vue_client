export type infoUni = {
  eduYear: string | number;
  visionDept: infoUniPart[];
  modelDept: infoUniPart[];
  targetDept: infoUniPart[];
};

export type infoUniPart = {
  id: string;
  value: string;
};

export type infoUniSearch = {
  page: number;
  size: number;
  sort: string;
};
