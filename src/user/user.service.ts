import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateUserDTO } from 'src/user/user.dto';

@Injectable()
export class UserService {
    constructor (@Inject(PrismaService) private prismaService: PrismaService) {}

    public async getUserByEmail (email: string) {
        return await this.prismaService.user.findFirst({ where: { email } })
    }

    public async createUser (payload: ICreateUserDTO) {
        return await this.prismaService.user.create({ data: payload })
    }

}
