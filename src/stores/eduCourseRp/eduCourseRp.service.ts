import http from '@/utils/http'
import type { EduCourseRpSearch } from './eduCourseRp.type'

const url = "/a/eduCourseReport"

export const fetchData = (data: EduCourseRpSearch) => {
    return http.post(`${url}/`, data)
}