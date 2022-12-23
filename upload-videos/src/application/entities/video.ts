import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export interface VideoProps {
  clientId: string;
  title: string;
  originalName: string;
  disk: string;
  storageName: string;
  streamStorageName?: string;
  streamConvertionProgress?: number;
  processedAt?: Date | null;
  createdAt: Date;
}

export class Video {
  private readonly _id: string;
  private props: VideoProps;

  constructor(props: Replace<VideoProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get clientId(): string {
    return this.props.clientId;
  }

  public set clientId(clientId: string) {
    this.props.clientId = clientId;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get disk(): string {
    return this.props.disk;
  }

  public set disk(disk: string) {
    this.props.disk = disk;
  }

  public get originalName(): string {
    return this.props.originalName;
  }

  public set originalName(originalName: string) {
    this.props.originalName = originalName;
  }

  public get storageName(): string {
    return this.props.storageName;
  }

  public set storageName(storageName: string) {
    this.props.storageName = storageName;
  }

  public get streamStorageName(): string | null | undefined {
    return this.props.streamStorageName;
  }

  public get streamConvertionProgress(): number | null | undefined {
    return this.props.streamConvertionProgress;
  }

  public get processedAt(): Date | null | undefined {
    return this.props.processedAt;
  }

  public process(streamStorageName: string) {
    this.props.processedAt = new Date();
    this.props.streamStorageName = streamStorageName;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
