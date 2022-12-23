import { Video } from '../entities/video';

export abstract class VideoRepository {
  abstract create(video: Video): Promise<void>;

  abstract save(video: Video): Promise<void>;

  abstract findById(notificationId: string): Promise<Video | null>;
}
