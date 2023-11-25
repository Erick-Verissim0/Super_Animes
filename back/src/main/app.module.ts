import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@/main/config/environment-config';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [EnvironmentConfigModule, ControllerModule],
})
export class AppModule {}
