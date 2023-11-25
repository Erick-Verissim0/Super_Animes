import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TerminusModule } from '@nestjs/terminus';

import { JwtAuthGuard } from '../common/guards';
import { JwtConfigModule } from '../config/jwt';
import { JwtStrategy } from '../common/strategies';
import { MulterConfig } from '../config/multer';
import { EnvHealthIndicator } from '../common/health-check';

// CONTROLLERS
import { ProjectController } from './project/project.controller';
import { HealthController } from './health/health.controller';

// FACTORIES
import { ProjectFactoryModule } from '../factories/usecases/project.factory.module';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: MulterConfig }),
    PassportModule,
    JwtConfigModule,
    ProjectFactoryModule.register(),
    TerminusModule,
  ],
  controllers: [ProjectController, HealthController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, JwtStrategy, EnvHealthIndicator],
})
export class ControllerModule {}
