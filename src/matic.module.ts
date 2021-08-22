import { Module, DynamicModule } from '@nestjs/common';
import { MaticCoreModule } from './matic-core.module';
import { MaticModuleOptions, MaticModuleAsyncOptions } from './matic.interface';
@Module({})
export class MaticModule {
  static forRoot(options: MaticModuleOptions): DynamicModule {
    return {
      module: MaticModule,
      imports: [MaticCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: MaticModuleAsyncOptions): DynamicModule {
    return {
      module: MaticModule,
      imports: [MaticCoreModule.forRootAsync(options)],
    };
  }
}
