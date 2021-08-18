import { DynamicModule, Global, Module } from '@nestjs/common';
import { MaticModuleOptions, MaticModuleAsyncOptions } from './matic.interface';
import {
  createMaticProvider,
  createMaticAsyncProvider,
  createProviderName,
  createAsyncOptionsProvider,
} from './matic.provider';

@Global()
@Module({
  providers: [],
})
export class MaticCoreModule {
  static forRoot(options: MaticModuleOptions): DynamicModule {
    const maticProvider = createMaticProvider(options);
    return {
      module: MaticCoreModule,
      providers: [maticProvider, createProviderName()],
      exports: [maticProvider],
    };
  }

  static forRootAsync(options: MaticModuleAsyncOptions): DynamicModule {
    const maticProvider = createMaticAsyncProvider();
    const asyncOptionsPrivader = createAsyncOptionsProvider(options);
    return {
      module: MaticCoreModule,
      imports: [],
      providers: [asyncOptionsPrivader, maticProvider, createProviderName()],
      exports: [],
    };
  }
}
