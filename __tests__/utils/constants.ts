import {
  MaticModuleOptions,
  MaticClients,
  MaticNetworks,
  MaticVersions,
} from '../../src/matic.interface';

export const TEST_ADDRESS = '0x8620c1E7107780622F403A4f70a15d91f2E6Ba36';
export const TEST_TOKEN = '0x0000000000000000000000000000000000001010';
export const parentProvider = 'https://rpc.goerli.mudit.blog';
export const maticProvider = 'https://rpc-mumbai.matic.today';
export const defaultOptions = {
  from: TEST_ADDRESS,
};
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
export const JSON_BODY_1 = {
  jsonrpc: '2.0',
  method: 'eth_call',
  params: [
    { data: '0xb6864976', to: '0xee11713fe713b2bff2942452517483654078154d' },
    'latest',
  ],
};
export const JSON_RESPONSE_1 = {
  jsonrpc: '2.0',
  result: '0x00000000000000000000000039c1e715316a1acbce0e6438cf62edf83c111975',
};
export const JSON_BODY_2 = {
  jsonrpc: '2.0',
  method: 'eth_call',
  params: [
    { data: '0x648b8178', to: '0xee11713fe713b2bff2942452517483654078154d' },
    'latest',
  ],
};
export const JSON_RESPONSE_2 = {
  jsonrpc: '2.0',
  result:
    '0x0000000000000000000000001edd419627ef40736ec4f8ceffde671a30803c5e000000000000000000000000eaa852323826c71cd7920c3b4c007184234c3945',
};
export const JSON_BODY_3 = {
  jsonrpc: '2.0',
  method: 'eth_call',
  params: [
    { data: '0xc881560f', to: '0xee11713fe713b2bff2942452517483654078154d' },
    'latest',
  ],
};
export const JSON_RESPONSE_3 = {
  jsonrpc: '2.0',
  result: '0x000000000000000000000000473cb675c9214f79dee10948443509c441a678e7',
};
