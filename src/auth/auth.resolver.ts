import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { CryptoService } from 'src/common/crypto/crypto.service';
import { Inject, BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { UserRolesEnum } from 'src/user/user.dto';

@Resolver()
export class AuthResolver {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(CryptoService) private cryptoService: CryptoService
    ){}

    @Mutation(type => String)
    public async signin (
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const user = await this.userService.getUserByEmail(email)
        if (!user) throw new UnauthorizedException()

        const validPassword = this.cryptoService.compareHashes(password, user.password)
        if (!validPassword) throw new UnauthorizedException

        return await this.cryptoService.signPayload({
            id: user.id,
            type: user.type,
        })
    }


    @Mutation(type => User)
    public async signup (
        @Args('name', { type: () => String }) name: string,
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ) {
        const existingUser = await this.userService.getUserByEmail(email)
        if (existingUser) throw new BadRequestException(`email já está cadastrado`)

        const encryptedPassword = await this.cryptoService.encryptPassword(password)

        const createdUser = await this.userService.createUser({
            name,
            email,
            type: UserRolesEnum.Student,
            password: encryptedPassword
        })

        return createdUser
    }
}
