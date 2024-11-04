export type ExcelData = {
    sheetName : string,
    data : Array<Array<any>>,
    header : Array<string>,
}
export type MultiHeaderData = {
    sheetName: string,
    data : Array<Array<any>>,
    header : Array<Array<string>>,
    indexCheckMerge: number,
    indexNotMerge : Array<number>
}