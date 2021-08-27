import {
  MaticModuleOptions,
  MaticClients,
  MaticNetworks,
  MaticVersions,
} from '../../src/matic.interface';

export const TEST_ADDRESS = '0x97db0687B60f6B19253BCdAeA49288bd0e2842Ef';
export const TEST_TOKEN = '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
export const parentProvider = 'https://rpc.goerli.mudit.blog';
export const maticProvider = 'https://rpc-mumbai.matic.today';
export const defaultOptions = {};
export const OPTIONS_PLASMA: MaticModuleOptions = {
  network: MaticNetworks.Testnet,
  version: MaticVersions.Mumbai,
  maticProvider,
  parentProvider,
  parentDefaultOptions: defaultOptions,
  maticDefaultOptions: defaultOptions,
  maticClient: MaticClients.Plasma,
};
export const OPTIONS_POS: MaticModuleOptions = {
  network: MaticNetworks.Testnet,
  version: MaticVersions.Mumbai,
  maticProvider,
  parentProvider,
  parentDefaultOptions: defaultOptions,
  maticDefaultOptions: defaultOptions,
  maticClient: MaticClients.PoS,
};
