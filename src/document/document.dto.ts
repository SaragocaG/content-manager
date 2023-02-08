export enum DocumentFormatEnum {
    pdf = 'pdf',
    video = 'video',
    image = 'image'
}

export interface IUpdateDocumentDTO {
    type?: DocumentFormatEnum,
    name?: string,
    description?: string,
}

export interface ICreateDocumentDTO {
    type: DocumentFormatEnum,
    name: string,
    description: string,
}
