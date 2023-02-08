import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'

@Injectable()
export class CryptoService {
    private readonly appKey: string

    public encryptPassword (clearPassword: string, saltRounds = 10): string {
        const salt = genSaltSync(saltRounds)
        return hashSync(clearPassword, salt)
    }

    public compareHashes (hash1: string, hash2: string): boolean {
        return compareSync(hash1, hash2)
    }

    public signPayload (payload: any): string {
        const data = {
            ...payload,
            iat: Math.floor(Date.now() / 1000) ,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1),
        };

        return sign(data, `${process.env['APP_KEY']}`)
    }
}
