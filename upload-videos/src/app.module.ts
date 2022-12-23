import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ProvidersModule } from '@infra/providers/providers.module';
import { ProcessorsModule } from '@infra/processors/processors.module';

@Module({
  imports: [DatabaseModule, HttpModule, ProvidersModule, ProcessorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
