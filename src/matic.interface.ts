import { HttpProvider } from 'web3-providers-http';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SendOptions } from '@maticnetwork/maticjs/dist/ts/types/Common';
export interface MaticModuleOptions extends Record<string, any> {
  network: string;
  version: string;
  maticProvider: string | HttpProvider | WalletConnectProvider;
  parentProvider: string | HttpProvider | WalletConnectProvider;
  parentDefaultOptions: SendOptions;
  maticDefaultOptions: SendOptions;
}
export interface MaticModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (
    ...args: any[]
  ) => MaticModuleOptions | Promise<MaticModuleOptions>;
  inject?: any[];
}

export enum MaticClients {
  Plasma = 'Plasma',
  PoS = 'PoS',
}
