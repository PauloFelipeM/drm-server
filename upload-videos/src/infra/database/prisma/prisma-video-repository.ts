import { VideoRepository } from '@application/repositories/video-repository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Video } from '@application/entities/video';
import { PrismaVideoMapper } from '@infra/database/prisma/mappers/prisma-video-mapper';

@Injectable()
export class PrismaVideoRepository implements VideoRepository {
  constructor(private prismaService: PrismaService) {}

  async create(video: Video): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(video);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.prismaService.videos.create({
      data: raw,
    });
  }

  async save(video: Video): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(video);

    await this.prismaService.videos.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findById(videoId: string): Promise<Video | null> {
    const video = await this.prismaService.videos.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      return null;
    }

    return PrismaVideoMapper.toDomain(video);
  }
}
