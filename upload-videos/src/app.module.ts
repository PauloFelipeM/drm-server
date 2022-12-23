import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ProvidersModule } from '@infra/providers/providers.module';

@Module({
  imports: [DatabaseModule, HttpModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
