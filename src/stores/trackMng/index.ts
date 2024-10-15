import { defineStore } from 'pinia'
import { ref } from 'vue'
import {insert, list, getById, edit, listSubject} from "./trackMng.service"
import type { TrackId,  TrackCre,  SearchSubject, 
  SubjectDetail, TrackListOutput, DetailOutput, PageableModel
} from "./trackMng.type"
import {MESSAGE_ERROR_API} from "../../constants/common.const"
export const trackStore = defineStore('track', () => {
    const listTrackOutput = ref<TrackListOutput[]>([])
    const detailOutput = ref<DetailOutput>()
    const listSubjectFind = ref<SubjectDetail>()
    const status = ref<number>();
    const statusIns = ref<number>();
    
    const insertTrack = async (params: TrackCre) => {
        try {
          const response = await insert(params)
          statusIns.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const listTrack = async (params: PageableModel) => {
        try {
          const response = await list(params)
          listTrackOutput.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const getTrackById = async (params: TrackId) => {
        try {
          const response = await getById(params)
          detailOutput.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const editTrack = async (params: TrackCre) => {
        try {
          const response = await edit(params)
          statusIns.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }

    const listSubjectfn = async (params: SearchSubject) => {
        try {
          const response = await listSubject(params)
          listSubjectFind.value = response.data
          status.value = response.status
        } catch (error) {
          throw new Error(MESSAGE_ERROR_API);
        }
    }
    return {
        listTrackOutput,
        detailOutput,
        listSubjectFind,
        status,
        insertTrack,
        listTrack,
        getTrackById,
        editTrack,
        listSubjectfn,
        statusIns
    }
})
