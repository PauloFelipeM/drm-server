import { Module } from '@nestjs/common';
import { StorageProvider } from '@infra/providers/StorageProvider/StorageProvider';
import { LocalStorageProvider } from '@infra/providers/StorageProvider/LocalStorageProvider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: StorageProvider,
      useClass: LocalStorageProvider,
    },
  ],
  exports: [StorageProvider],
})
export class ProvidersModule {}
