import {
  MaticModuleOptions,
  MaticClients,
  MaticNetworks,
  MaticVersions,
} from '../../src/matic.interface';

export const TEST_ADDRESS = '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef';
export const TEST_TOKEN = '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
export const INFURA_MUMBAI_RPC =
  'https://polygon-mumbai.infura.io/v3/29de55fdba2c43aba41eaec8100275d3';
export const TEST_API_KEY =
  'https://apis-sj.ankr.com/b47484ff27664a47a02909c948cea37a/50c087ae47433c183ad577dd0b2dff69/polygon/full/main';
export const parentProvider = 'https://rpc.goerli.mudit.blog';
export const childProvider = 'https://rpc-mumbai.matic.today';
export const defaultOptions = {
  from: TEST_ADDRESS,
};
export const OPTIONS_PLASMA: MaticModuleOptions = {
  network: MaticNetworks.Testnet,
  version: MaticVersions.Mumbai,
  maticProvider: childProvider,
  parentProvider: parentProvider,
  parentDefaultOptions: defaultOptions,
  maticDefaultOptions: defaultOptions,
  maticClient: MaticClients.Plasma,
};
export const OPTIONS_POS: MaticModuleOptions = {
  network: MaticNetworks.Testnet,
  version: MaticVersions.Mumbai,
  maticProvider: childProvider,
  parentProvider: parentProvider,
  parentDefaultOptions: defaultOptions,
  maticDefaultOptions: defaultOptions,
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
