import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { CryptoService } from 'src/common/crypto/crypto.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env['APP_KEY']}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy, AuthResolver, CryptoService],
  exports: [],
})

export class AuthModule {}