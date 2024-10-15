import http from "@/utils/http";
import type { SearchTrack, TrackIdModel } from "./trackingProcess.type";

import {SITE_ADMIN} from '@/constants/common.const'

const url = `/${SITE_ADMIN}/trackingProcess`

export const getListTrack = (data : SearchTrack) => {
    return http.post(`${url}/list`, data);
} 

export const getListTrackInfo = () => {
    return http.get(`${url}/listTrack`);
} 

export const getDetailTrack = (data : TrackIdModel) => {
    return http.post(`${url}/detail`, data);
} 

export const getDetailSubject = (data : TrackIdModel) => {
    return http.post(`${url}/detailSubject`, data);
} 