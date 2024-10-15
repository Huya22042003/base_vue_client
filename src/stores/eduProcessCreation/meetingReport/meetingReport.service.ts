import http from "@/utils/http";

import { SITE_ADMIN } from "@/constants/common.const";
import type { EduMeetingReportSearchModel } from "./meetingReport.type";

const url = `${SITE_ADMIN}/edu-course/`;

export const getPageMeetingReport = (req: EduMeetingReportSearchModel) => {
  return http.post(url + "get-page-meeting-report", req);
};
