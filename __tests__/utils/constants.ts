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
export const INFURA_MUMBAI_RPC =
  'https://polygon-mumbai.infura.io/v3/29de55fdba2c43aba41eaec8100275d3';
export const TEST_API_KEY =
  'https://apis-sj.ankr.com/b47484ff27664a47a02909c948cea37a/50c087ae47433c183ad577dd0b2dff69/polygon/full/main';
// '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
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

export const INFURA_BODY = {
  projectId: '29de55fdba2c43aba41eaec8100275d3',
  projectSecret: 'e1eb072de3524fa58f67df196c6570d3',
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_blockNumber',
  params: [],
};

export const INFURA_RESPONSE = {
  jsonrpc: '2.0',
  result: '0x657abc',
  id: 1,
};
