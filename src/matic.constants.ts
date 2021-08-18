import { randomBytes } from 'crypto';
import { MaticModuleOptions, MaticClients } from './matic.interface';
import { HttpProvider } from 'web3-providers-http';

export const DECORATED_PREFIX = 'MaticJS';
export const MATIC_PROVIDER_NAME = 'MaticProviderName';
export const MATIC_MODULE_OPTIONS = 'MaticModuleOptions';

export const MAINNET_NETWORK = 'https://rpc-mainnet.matic.network';
export const MATICVIGIL_NETWORK = 'https://rpc-mainnet.maticvigil.com';
export const QUIKNODE_NETWORK = 'https://rpc-mainnet.matic.quiknode.pro';
export const CHAINSTACKLABS_NETWORK =
  'https://matic-mainnet.chainstacklabs.com';
export const FULL_BWARELABS_NETWORK =
  'https://matic-mainnet-full-rpc.bwarelabs.com';
export const ARCHIVE_BWARELABS_NETWORK =
  'https://matic-mainnet-archive-rpc.bwarelabs.com';
export const TEST_ADDRESS = randomBytes(42).toString('hex');
export const TEST_TOKEN = randomBytes(42).toString('hex');
export const TEST_BALANCE = '1000000000000000000';
export const TEST_MATICVIGIL_API_KEY = randomBytes(40).toString('hex');
const httpProvider = new HttpProvider('http://localhost:3000', {});

export const OPTIONS_PLASMA: MaticModuleOptions = {
  network: 'testnet',
  version: 'mumbai',
  maticProvider: httpProvider,
  parentProvider: httpProvider,
  parentDefaultOptions: { from: '' },
  maticDefaultOptions: { from: '' },
  maticClient: MaticClients.Plasma,
};

export const OPTIONS_POS: MaticModuleOptions = {
  network: 'testnet',
  version: 'mumbai',
  maticProvider: httpProvider,
  parentProvider: httpProvider,
  parentDefaultOptions: { from: '' },
  maticDefaultOptions: { from: '' },
  maticClient: MaticClients.PoS,
};
