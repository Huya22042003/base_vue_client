import http from "@/utils/http";
export const createFile = (data: any) => {
    return http.post(`/cmm/files/upload`, data, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}
export const getFile = (data: any) => {
    return http.post(`/cmm/files/download`, data,{
        responseType: 'blob'

    })
}

export const getFileUploaded = (data: any) => {
    return http.post(`/cmm/files/fileUploadedInfo`, {
            fimFileCategory: data.fimFileCategory,
            fimReferKeyId: data.fimReferKeyId,
    })
}
export const uploadFileEditor = (data: any) => {
    return http.post(`/cmm/files/uploadEditer`, data, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}
export const deleteFile = (encodedFileName: number) => {
    return http.put(`/cmm/files/fileMng/${encodedFileName}`)
}
