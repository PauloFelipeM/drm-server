import { VideoRepository } from '@application/repositories/video-repository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Video } from '@application/entities/video';
import { PrismaVideoMapper } from '@infra/database/prisma/mappers/prisma-video-mapper';

@Injectable()
export class PrismaVideoRepository implements VideoRepository {
  constructor(private prismaService: PrismaService) {}

  async create(video: Video): Promise<Video> {
    const raw = PrismaVideoMapper.toPrisma(video);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.prismaService.videos.create({
      data: raw,
    });
  }
}
