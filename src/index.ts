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
export { default as BN } from 'bn.js';
export { default as MaticBaseClient } from '@maticnetwork/maticjs/dist/ts/common/SDKClient';
export { Utils } from '@maticnetwork/maticjs/dist/ts/common/Utils';
export { default as DepositManager } from '@maticnetwork/maticjs/dist/ts/root/DepositManager';
export { default as Registry } from '@maticnetwork/maticjs/dist/ts/root/Registry';
export { default as RootChain } from '@maticnetwork/maticjs/dist/ts/root/RootChain';
export { default as WithdrawManager } from '@maticnetwork/maticjs/dist/ts/root/WithdrawManager';
export {
  address,
  MaticClientInitializationOptions,
  order,
  SendOptions,
} from '@maticnetwork/maticjs/dist/ts/types/Common';
export { mapPromise } from '@maticnetwork/maticjs/dist/ts/common/MapPromise';
export { HttpProvider as Web3HttpProvider } from 'web3-core';
export { default as WalletConnectProvider } from '@walletconnect/ethereum-provider';
