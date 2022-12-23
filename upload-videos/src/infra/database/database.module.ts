import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { VideoRepository } from '@application/repositories/video-repository';
import { PrismaVideoRepository } from './prisma/prisma-video-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: VideoRepository,
      useClass: PrismaVideoRepository,
    },
  ],
  exports: [VideoRepository],
})
export class DatabaseModule {}
