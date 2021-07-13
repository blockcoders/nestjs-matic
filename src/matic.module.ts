import { Module, DynamicModule } from '@nestjs/common';
import { MaticCoreModule } from './matic-core.module';

@Module({})
export class MaticModule {
  static forRoot(): DynamicModule {
    return {
      module: MaticModule,
      imports: [MaticCoreModule.forRoot()],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: MaticModule,
      imports: [MaticCoreModule.forRootAsync()],
    };
  }
}
