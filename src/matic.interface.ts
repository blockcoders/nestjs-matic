import { HttpProvider } from 'web3-core';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import {
  MaticClientInitializationOptions,
  SendOptions,
} from '@maticnetwork/maticjs/dist/ts/types/Common';

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

/**
 * Matic SDK Client options
 * @see {@link https://github.com/maticnetwork/matic.js/blob/master/src/types/Common.ts#L25}
 */
export interface MaticModuleOptions
  extends Omit<
      MaticClientInitializationOptions,
      | 'network'
      | 'version'
      | 'maticProvider'
      | 'parentProvider'
      | 'parentDefaultOptions'
      | 'maticDefaultOptions'
    >,
    Record<string, any> {
  network?: MaticNetworks;
  version?: MaticVersions;
  maticProvider?: string | HttpProvider | WalletConnectProvider;
  parentProvider?: string | HttpProvider | WalletConnectProvider;
  parentDefaultOptions?: SendOptions;
  maticDefaultOptions?: SendOptions;
  maticClient?: MaticClients;
}

export interface MaticModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (
    ...args: any[]
  ) => MaticModuleOptions | Promise<MaticModuleOptions>;
  inject?: any[];
}
