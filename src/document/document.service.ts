import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Document } from 'src/document/document.model';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateDocumentDTO, IUpdateDocumentDTO } from 'src/document/document.dto';

@Injectable()
export class DocumentService {
    constructor (@Inject(PrismaService) private prismaService: PrismaService) {}

    public async listDocuments (searchString?: string, skip?: number, take = 50): Promise<Document[]> {
        let where

        if (searchString) {
            where = {
                OR: [
                    { description: { contains: searchString } },
                    { name: { contains: searchString } }
                ]
            }
        }

        return await this.prismaService.document.findMany({
            where,
            take,
            skip
        })
    }

    public async getDocumentById (documentId: number) {
        return await this.prismaService.document.findFirst({ where: { id: documentId } })
    }

    public async createDocument (payload: ICreateDocumentDTO) {
        const { description, name, type } = payload

        return await this.prismaService.document.create({ data: { description, name, type } })
    }

    public async updateDocument (documentId: number, payload: IUpdateDocumentDTO) {
        const { type, name, description } = payload

        return await this.prismaService.document.update({
            where: { id: documentId },
            data: { type, name, description }
        })
    }

    public async deleteDocument (documentId: number) {
        return await this.prismaService.document.delete({ where: { id: documentId } })
    }
}
