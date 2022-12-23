export abstract class StorageProvider {
  abstract save(file: string, folder: string): Promise<string>;

  abstract delete(file: string, folder: string): Promise<void>;
}
