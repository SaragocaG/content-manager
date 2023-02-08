import { Document } from 'src/document/document.model';
import { Inject, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, InputType, Field } from '@nestjs/graphql'
import { DocumentFormatEnum, ICreateDocumentDTO, IUpdateDocumentDTO } from 'src/document/document.dto';
import { Roles } from 'src/common/roles/roles.decorator';
import { UserRolesEnum } from 'src/user/user.dto';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'src/common/roles/roles.guard';

@InputType()
class CreateDocumentInput implements ICreateDocumentDTO {
    @Field()
    name: string

    @Field()
    type: DocumentFormatEnum

    @Field()
    description: string
}

@InputType()
class UpdateDocumentInput implements ICreateDocumentDTO {
    @Field()
    name: string

    @Field()
    type: DocumentFormatEnum

    @Field()
    description: string
}


@Resolver()
export class DocumentResolver {
    constructor (@Inject(DocumentService) private documentService: DocumentService) {}

    @Query(type => [Document])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRolesEnum.Student, UserRolesEnum.Teacher)
    public async listDocuments (
        @Args('searchString', { type: () => String, nullable: true }) searchString?: string,
        @Args('skip', { type: () => Int, nullable: true }) skip?: number,
        @Args('take', { type: () => Int, nullable: true }) take?: number
    ): Promise<Document[]> {
        return await this.documentService.listDocuments(searchString, skip, take)
    }


    @Query(type => Document)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRolesEnum.Student, UserRolesEnum.Teacher)
    public async getDocumentById (@Args('documentId', { type: () => Int }) documentId: number) {
        const document = await this.documentService.getDocumentById(documentId)
        if (!document) throw new NotFoundException()

        return document
    }


    @Mutation(type => Document)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRolesEnum.Teacher)
    public async createDocument (
        @Args('payload', { type: () => CreateDocumentInput }) payload: ICreateDocumentDTO
    ) {
        return this.documentService.createDocument(payload)
    }


    @Mutation(type => Document)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRolesEnum.Teacher)
    public async updateDocument (
        @Args('documentId', { type: () => Int }) documentId: number,
        @Args('payload', { type: () => UpdateDocumentInput }) payload: IUpdateDocumentDTO,
    ) {
        return await this.documentService.updateDocument(documentId, payload)
    }


    @Mutation(type => Document)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRolesEnum.Teacher)
    public async deleteDocument (@Args('documentId', { type: () => Int }) documentId: number) {
        const document = await this.documentService.getDocumentById(documentId)
        if (!document) throw new NotFoundException()

        return await this.documentService.deleteDocument(documentId)
    }
}
