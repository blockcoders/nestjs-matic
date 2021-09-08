export { MaticModule } from './matic.module';
export { InjectMaticProvider } from './matic.decorator';
export {
  MaticModuleOptions,
  MaticModuleAsyncOptions,
  MaticClients,
  MaticNetworks,
  MaticVersions,
} from './matic.interface';
export { getMaticToken } from './matic.utils';
export {
  default as MaticPlasmaClient,
  MaticPOSClient,
} from '@maticnetwork/maticjs';
export { HttpProvider as Web3HttpProvider } from 'web3-core';
export { default as WalletConnectProvider } from '@walletconnect/ethereum-provider';
