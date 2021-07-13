import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class MaticCoreModule {
  static forRoot(): DynamicModule {
    return {
      module: MaticCoreModule,
      providers: [],
      exports: [],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: MaticCoreModule,
      imports: [],
      providers: [],
      exports: [],
    };
  }
}
