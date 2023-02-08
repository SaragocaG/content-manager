import { Module } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { GraphQLModule } from '@nestjs/graphql';
import { DocumentModule } from './document/document.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/roles/roles.guard';

@Module({
  imports: [
    AuthModule,
    DocumentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
