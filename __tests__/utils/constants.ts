import Web3HttpProvider from 'web3-providers-http';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { SendOptions } from '@maticnetwork/maticjs/dist/ts/types/Common';

export const MAINNET_NETWORK = 'https://rpc-mainnet.matic.network';
export const MATICVIGIL_NETWORK = 'https://rpc-mainnet.maticvigil.com';
export const QUIKNODE_NETWORK = 'https://rpc-mainnet.matic.quiknode.pro';
export const CHAINSTACKLABS_NETWORK =
  'https://matic-mainnet.chainstacklabs.com';
export const FULL_BWARELABS_NETWORK =
  'https://matic-mainnet-full-rpc.bwarelabs.com';
export const ARCHIVE_BWARELABS_NETWORK =
  'https://matic-mainnet-archive-rpc.bwarelabs.com';
export const TEST_ADDRESS = '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef';
export const TEST_TOKEN = '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
export const TEST_BALANCE = '1000000000000000000';
export const TEST_MATICVIGIL_API_KEY =
  '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
export const parentProvider = new Web3HttpProvider({
  providerUrl: 'https://rpc.goerli.mudit.blog/',
}).providerUrl;

export const childProvider = new Web3HttpProvider({
  providerUrl: 'https://rpc-mumbai.matic.today',
}).providerUrl;

export enum MaticClients {
  Plasma = 'Plasma',
  PoS = 'PoS',
}

export interface MaticModuleOptions extends Record<string, any> {
  network: string;
  version: string;
  maticProvider: string | Web3HttpProvider | WalletConnectProvider;
  parentProvider: string | Web3HttpProvider | WalletConnectProvider;
  parentDefaultOptions: SendOptions;
  maticDefaultOptions: SendOptions;
  maticClient: MaticClients;
}
export const OPTIONS_PLASMA: MaticModuleOptions = {
  network: 'testnet',
  version: 'mumbai',
  maticProvider: childProvider,
  parentProvider: parentProvider,
  parentDefaultOptions: { from: '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef' },
  maticDefaultOptions: { from: '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef' },
  maticClient: MaticClients.Plasma,
};

export const OPTIONS_POS: MaticModuleOptions = {
  network: 'testnet',
  version: 'mumbai',
  maticProvider: childProvider,
  parentProvider: parentProvider,
  parentDefaultOptions: { from: '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef' },
  maticDefaultOptions: { from: '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef' },
  maticClient: MaticClients.PoS,
};
