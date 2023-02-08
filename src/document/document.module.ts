import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { PrismaService } from '../common/prisma/prisma.service';
import { DocumentResolver } from './document.resolver';
import { DocumentService } from './document.service';

@Module({
  imports: [],
  providers: [
    DocumentResolver,
    PrismaService,
    DocumentService,
  ],
  exports: [ DocumentService ],
})
export class DocumentModule {}
