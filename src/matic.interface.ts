import { HttpProvider } from 'web3-core';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SendOptions } from '@maticnetwork/maticjs/dist/ts/types/Common';

export enum MaticClients {
  Plasma = 'Plasma',
  PoS = 'PoS',
}

export enum MaticNetworks {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum MaticVersions {
  V1 = 'v1',
  Mumbai = 'mumbai',
}

export interface MaticModuleOptions extends Record<string, any> {
  network: MaticNetworks;
  version: MaticVersions;
  maticProvider: string | HttpProvider | WalletConnectProvider;
  parentProvider: string | HttpProvider | WalletConnectProvider;
  parentDefaultOptions: SendOptions;
  maticDefaultOptions: SendOptions;
  maticClient?: MaticClients;
}

export interface MaticModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (
    ...args: any[]
  ) => MaticModuleOptions | Promise<MaticModuleOptions>;
  inject?: any[];
}
