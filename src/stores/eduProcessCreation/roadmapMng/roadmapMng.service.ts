import http from "@/utils/http";

import { SITE_ADMIN } from "@/constants/common.const";
import type { OverviewRoadMapFilterDTO, RoadMapEduProcessFilter, RoadMapFilterDTO } from "./roadmapMng.type";

const url = `${SITE_ADMIN}/edu-course/`;

export const getLinkRoadMap = (req: RoadMapFilterDTO) => {
  return http.post(url + "get-link-road-map", req);
};

export const getSyntheticRoadMap = (req: RoadMapFilterDTO) => {
  return http.post(url + "get-synthetic-road-map", req);
};

export const getRoadMapEduProcess = (req: RoadMapEduProcessFilter) => {
  return http.post(url + "get-road-map-edu-process", req);
};

export const getOverviewRoadMap = (req: OverviewRoadMapFilterDTO) => {
  return http.post(url + "get-overview-road-map", req);
};
