import { HttpProvider } from 'web3-providers-http';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export declare interface DefaultOptions {
  from?: string;
}

export interface MaticModuleOptions extends Record<string, any> {
  network: string;
  version: string;
  maticProvider: string | HttpProvider | WalletConnectProvider;
  parentProvider: string | HttpProvider | WalletConnectProvider;
  parentDefaultOptions: any | DefaultOptions;
  maticDefaultOptions: any | DefaultOptions;
}
export interface MaticModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (
    ...args: any[]
  ) => MaticModuleOptions | Promise<MaticModuleOptions>;
  inject?: any[];
}
