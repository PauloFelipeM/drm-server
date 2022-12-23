import { Video } from '@application/entities/video';

export class VideoViewModel {
  static toHTTP(video: Video) {
    return {
      id: video.id,
      title: video.title,
      storageName: video.storageName,
    };
  }
}
