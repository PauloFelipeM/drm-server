import { Video } from '@application/entities/video';
import { videos as RawVideo } from '@prisma/client';

export class PrismaVideoMapper {
  static toPrisma(video: Video) {
    return {
      id: video.id,
      clientId: video.clientId,
      title: video.title,
      originalName: video.originalName,
      storageName: video.storageName,
      disk: video.disk,
      streamStorageName: video.streamStorageName,
      processedAt: video.processedAt,
      createdAt: video.createdAt,
    };
  }

  static toDomain(raw: RawVideo) {
    return new Video(
      {
        clientId: raw.clientId,
        title: raw.title,
        originalName: raw.originalName,
        storageName: raw.storageName,
        disk: raw.disk,
        streamStorageName: raw.streamStorageName,
        processedAt: raw.processedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
